// Resend integration for the newsletter.
//
// Resend is used for two things only:
//   1. Storing subscribers (a Resend Audience is the source of truth).
//   2. Sending the one-off welcome email.
//
// There is no confirmation / double opt-in step: a subscriber is added to the
// audience straight away and the welcome email goes out immediately.
//
// The only configuration is an API key, a sender address and an optional
// reply-to address. The audience is looked up from the account at runtime, so
// there is no id to keep in sync.

import { RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_REPLY_TO } from 'astro:env/server';

const RESEND_API = 'https://api.resend.com';

export interface ResendConfig {
  apiKey: string;
  from: string;
  /** Where replies go. Unset means replies go to `from`. */
  replyTo?: string;
}

/**
 * Returns the Resend configuration. All values are inlined at build time
 * (see `env.schema` in astro.config.mjs), so nothing is read from the Worker
 * bindings at runtime.
 */
export function getResendConfig(): ResendConfig | null {
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL) return null;

  return {
    apiKey: RESEND_API_KEY,
    from: RESEND_FROM_EMAIL,
    replyTo: RESEND_REPLY_TO?.trim() || undefined,
  };
}

async function resendFetch(config: ResendConfig, path: string, body?: unknown) {
  const response = await fetch(`${RESEND_API}${path}`, {
    method: body === undefined ? 'GET' : 'POST',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });

  let payload: any = null;
  try {
    payload = await response.json();
  } catch {
    // Resend always answers with JSON; an empty body means something upstream broke.
  }

  return { ok: response.ok, status: response.status, payload };
}

function errorMessage(payload: any, status: number): string {
  return payload?.message ?? `Resend returned ${status}`;
}

// The audience id does not change, so one lookup per worker isolate is enough.
let cachedAudienceId: string | null = null;

/**
 * Finds the audience to put subscribers in. Uses the account's only audience;
 * if there are several, the oldest one wins, which is the "General" audience
 * Resend creates with a new account.
 */
export async function resolveAudienceId(config: ResendConfig): Promise<string> {
  if (cachedAudienceId) return cachedAudienceId;

  const { ok, status, payload } = await resendFetch(config, '/audiences');

  if (!ok) throw new Error(`Could not list audiences: ${errorMessage(payload, status)}`);

  const audiences: Array<{ id: string; created_at?: string }> = payload?.data ?? [];

  if (audiences.length === 0) {
    throw new Error('No audience exists in this Resend account. Create one at https://resend.com/audiences.');
  }

  const oldest = [...audiences].sort((a, b) =>
    (a.created_at ?? '').localeCompare(b.created_at ?? '')
  )[0];

  cachedAudienceId = oldest.id;
  return cachedAudienceId;
}

export interface AddContactResult {
  ok: boolean;
  /** True when the address was already in the audience, so no welcome mail is needed. */
  alreadySubscribed: boolean;
  error?: string;
}

/** Adds the address to the Resend audience immediately, no confirmation step. */
export async function addContact(config: ResendConfig, email: string): Promise<AddContactResult> {
  let audienceId: string;
  try {
    audienceId = await resolveAudienceId(config);
  } catch (error) {
    return { ok: false, alreadySubscribed: false, error: (error as Error).message };
  }

  const { ok, status, payload } = await resendFetch(config, `/audiences/${audienceId}/contacts`, {
    email,
    unsubscribed: false,
  });

  if (ok) {
    return { ok: true, alreadySubscribed: false };
  }

  const message = errorMessage(payload, status);

  // Resend answers 409 (or a "already exists" message) when the contact is there
  // already. That is a success from the visitor's point of view.
  if (status === 409 || /already/i.test(message)) {
    return { ok: true, alreadySubscribed: true };
  }

  return { ok: false, alreadySubscribed: false, error: message };
}

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
  headers?: Record<string, string>;
}

export async function sendEmail(config: ResendConfig, options: SendEmailOptions) {
  const { ok, status, payload } = await resendFetch(config, '/emails', {
    from: config.from,
    to: [options.to],
    reply_to: config.replyTo,
    subject: options.subject,
    html: options.html,
    text: options.text,
    headers: options.headers,
  });

  return { ok, error: ok ? undefined : errorMessage(payload, status) };
}
