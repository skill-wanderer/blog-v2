// The single transactional email the blog sends: a welcome note that goes out
// the moment someone subscribes. No confirmation link, nothing to click to
// activate the subscription.

const SITE_URL = 'https://wanderings.skill-wanderer.com';
const BLOG_URL = `${SITE_URL}/blog`;
const HUB_URL = 'https://skill-wanderer.com/';
const DOJO_URL = 'https://dojo.skill-wanderer.com/';
const HELP_THE_MISSION_URL = 'https://skill-wanderer.com/help-the-mission';

export interface WelcomeEmailOptions {
  /** Address a reader can write to in order to be removed from the list. */
  unsubscribeEmail: string;
}

export const welcomeSubject = 'Welcome to the Skill Wanderer journey';

export function welcomeHtml({ unsubscribeEmail }: WelcomeEmailOptions): string {
  const unsubscribeLink = `mailto:${unsubscribeEmail}?subject=Unsubscribe`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${welcomeSubject}</title>
</head>
<body style="margin:0;padding:0;background-color:#0d1117;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0d1117;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:#161b22;border:1px solid rgba(255,217,61,0.12);border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background-color:#FF6B35;background:linear-gradient(135deg,#FF6B35 0%,#E85D25 100%);padding:28px 32px;">
              <h1 style="margin:0;font-size:24px;line-height:1.3;color:#ffffff;font-weight:700;">You are on the list</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;color:#e0e0e0;font-size:16px;line-height:1.7;">
              <p style="margin:0 0 20px;">Thanks for subscribing to Skill Wanderer Wanderings.</p>
              <p style="margin:0 0 20px;">You will get new posts from my tech journey straight in your inbox: practical lessons, honest reviews, and the tools worth your time. No spam, no filler.</p>
              <p style="margin:0 0 28px;">Nothing else is needed from you. Your subscription is already active.</p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
                <tr>
                  <td style="border-radius:10px;background-color:#FF6B35;">
                    <a href="${BLOG_URL}" style="display:inline-block;padding:14px 28px;font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:10px;">Start reading the blog</a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 8px;color:#a0a0a0;font-size:14px;">While you wait for the next post:</p>
              <ul style="margin:0 0 28px;padding-left:20px;color:#e0e0e0;font-size:14px;line-height:1.8;">
                <li><a href="${HUB_URL}" style="color:#FFD93D;text-decoration:none;">The Skill Wanderer hub</a></li>
                <li><a href="${DOJO_URL}" style="color:#FFD93D;text-decoration:none;">The Dojo, where the learning happens</a></li>
              </ul>
              <p style="margin:0 0 12px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.08);color:#a0a0a0;font-size:15px;">And if you ever feel like lending a hand to keep education free, there are a few ways to do it. No pressure at all.</p>
              <p style="margin:0;font-size:15px;"><a href="${HELP_THE_MISSION_URL}" style="color:#FF6B35;font-weight:700;text-decoration:none;">See how you can help &rarr;</a></p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 28px;border-top:1px solid rgba(255,255,255,0.08);color:#8b949e;font-size:12px;line-height:1.6;">
              <p style="margin:0 0 6px;">You are getting this because you subscribed at <a href="${SITE_URL}" style="color:#8b949e;">wanderings.skill-wanderer.com</a>.</p>
              <p style="margin:0;"><a href="${unsubscribeLink}" style="color:#8b949e;text-decoration:underline;">Unsubscribe</a> at any time.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function welcomeText({ unsubscribeEmail }: WelcomeEmailOptions): string {
  return `You are on the list

Thanks for subscribing to Skill Wanderer Wanderings.

You will get new posts from my tech journey straight in your inbox: practical
lessons, honest reviews, and the tools worth your time. No spam, no filler.

Nothing else is needed from you. Your subscription is already active.

Start reading the blog: ${BLOG_URL}

While you wait for the next post:
- The Skill Wanderer hub: ${HUB_URL}
- The Dojo, where the learning happens: ${DOJO_URL}

And if you ever feel like lending a hand to keep education free, there are a
few ways to do it. No pressure at all.

See how you can help: ${HELP_THE_MISSION_URL}

You are getting this because you subscribed at ${SITE_URL}.
To unsubscribe, reply to this message or write to ${unsubscribeEmail} with the
subject "Unsubscribe".`;
}
