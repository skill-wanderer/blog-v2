import type { APIRoute } from 'astro';
import { addContact, getResendConfig, sendEmail } from '../../lib/resend';
import { welcomeHtml, welcomeSubject, welcomeText } from '../../lib/emails/welcome';

export const prerender = false;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/** Turns "Skill Wanderer <hello@example.com>" into "hello@example.com". */
function bareAddress(from: string): string {
  const match = from.match(/<([^>]+)>/);
  return (match ? match[1] : from).trim();
}

export const POST: APIRoute = async ({ request, locals }) => {
  const config = getResendConfig((locals as any)?.runtime?.env);

  if (!config) {
    console.error('Subscribe: Resend is not configured (RESEND_API_KEY / RESEND_FROM_EMAIL).');
    return json({ error: 'Subscriptions are temporarily unavailable. Please try again later.' }, 503);
  }

  let email = '';
  try {
    const body = await request.json();
    email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  } catch {
    return json({ error: 'Please enter a valid email address.' }, 400);
  }

  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return json({ error: 'Please enter a valid email address.' }, 400);
  }

  // The subscriber goes into the Resend audience right away. No confirmation email.
  const contact = await addContact(config, email);

  if (!contact.ok) {
    console.error('Subscribe: could not add contact to Resend:', contact.error);
    return json({ error: 'Something went wrong. Please try again later.' }, 502);
  }

  if (contact.alreadySubscribed) {
    return json({ message: 'You are already subscribed.', alreadySubscribed: true }, 200);
  }

  const unsubscribeEmail = bareAddress(config.from);
  const welcome = await sendEmail(config, {
    to: email,
    subject: welcomeSubject,
    html: welcomeHtml({ unsubscribeEmail }),
    text: welcomeText({ unsubscribeEmail }),
    headers: { 'List-Unsubscribe': `<mailto:${unsubscribeEmail}?subject=Unsubscribe>` },
  });

  // A failed welcome email does not undo the subscription, so the visitor still
  // gets a success answer. The failure is logged for us to look at.
  if (!welcome.ok) {
    console.error('Subscribe: welcome email failed for', email, welcome.error);
  }

  return json({ message: 'Subscribed.', alreadySubscribed: false }, 201);
};
