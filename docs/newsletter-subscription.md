# Newsletter Subscription (Resend)

How the email subscription form on the blog works, and what has to be configured
for it to run.

## The flow

1. A visitor enters an email in the form rendered by
   `src/components/EmailSubscription.astro`.
2. The browser posts `{ "email": "..." }` to `POST /api/subscribe`
   (`src/pages/api/subscribe.ts`), which runs server side on the Cloudflare
   Worker.
3. The route looks up the account's audience and adds the address to it
   straight away.
4. The route sends **one welcome email** through Resend.
5. The form shows a success message.

There is **no confirmation email and no double opt-in**. The subscription is
active the moment the form is submitted, and the only mail Resend sends from
this endpoint is the welcome note.

Resend is the single source of truth for subscribers. Nothing is written to
Firestore any more.

## Files

| File | Role |
|---|---|
| `src/components/EmailSubscription.astro` | The form and its client-side script |
| `src/pages/api/subscribe.ts` | Server route: validate, add contact, send welcome |
| `src/lib/resend.ts` | Thin Resend REST client (`resolveAudienceId`, `addContact`, `sendEmail`) |
| `src/lib/emails/welcome.ts` | HTML and plain-text welcome email |

No npm package is needed; the Resend HTTP API is called with `fetch`, which
works on the Cloudflare runtime.

## Configuration

Two variables, both required.

| Variable | Meaning |
|---|---|
| `RESEND_API_KEY` | API key from <https://resend.com/api-keys>, with access to Audiences and Emails |
| `RESEND_FROM_EMAIL` | Sender, e.g. `Skill Wanderer <hello@skill-wanderer.com>`. The domain must be verified in Resend, and replies and unsubscribe requests go to this address |

There is no audience id to configure. The route calls `GET /audiences` and uses
the account's oldest audience, which is the `General` one Resend creates with a
new account. The result is cached per worker isolate, so it costs one extra API
call after a cold start and nothing after that. If you keep several audiences in
this account and subscribers should land in a newer one, set the id explicitly in
`resolveAudienceId` in `src/lib/resend.ts`.

These are secrets, so they do **not** belong in a committed file, and ideally not
in `.env` either, whose values are inlined at build time.

**Local development:** copy `.dev.vars.example` to `.dev.vars` and fill it in.
`.dev.vars` is git-ignored, and the Cloudflare platform proxy exposes it to the
route through `locals.runtime.env`. Values in `.env` also work for `astro dev`.

**Production:** set them as Worker secrets.

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put RESEND_FROM_EMAIL
```

If either variable is missing the route answers `503` and the form tells the
visitor that subscriptions are temporarily unavailable.

## API reference

`POST /api/subscribe`

Request body:

```json
{ "email": "reader@example.com" }
```

Responses:

| Status | Body | When |
|---|---|---|
| `201` | `{ "message": "Subscribed.", "alreadySubscribed": false }` | New subscriber added, welcome email sent |
| `200` | `{ "message": "You are already subscribed.", "alreadySubscribed": true }` | Address was already in the audience, no second welcome email |
| `400` | `{ "error": "Please enter a valid email address." }` | Missing or malformed email |
| `502` | `{ "error": "Something went wrong. Please try again later." }` | Resend rejected the contact, or the account has no audience |
| `503` | `{ "error": "Subscriptions are temporarily unavailable. Please try again later." }` | Resend is not configured |

A welcome email that fails to send does **not** fail the request: the person is
already subscribed at that point, so the route returns `201` and logs the send
error.

## Sending the newsletter itself

The blog does not send campaign email. Write and send those as **broadcasts** in
the Resend dashboard against the same audience. Broadcasts get Resend's own
unsubscribe link automatically.

## Testing

```bash
npm run dev
```

Then either use the form on any page, or call the route directly:

```bash
curl -X POST http://localhost:4321/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com"}'
```

Check the audience at <https://resend.com/audiences> and the send at
<https://resend.com/emails>.

`npm run preview` runs the built worker under `wrangler dev`, which is the
closest match to production.

## Worth knowing

- The route has no rate limiting. If the form starts attracting abuse, put a
  Cloudflare rate-limiting rule in front of `/api/subscribe`.
- Unsubscribing from the welcome email is a `mailto:` link plus a
  `List-Unsubscribe` header pointing at the sender address. Broadcasts use
  Resend's hosted unsubscribe page instead.
