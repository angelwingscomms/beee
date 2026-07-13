import { dev } from '$app/environment';

function fmt_kobo(k: number): string {
  return '₦' + (k / 100).toLocaleString('en-NG', { minimumFractionDigits: 2 });
}

export async function send_partner_notification(
  platform: App.Platform | undefined,
  to_email: string,
  recipient_name: string,
  commission_kobo: number,
  total_kobo: number,
  player_name: string
): Promise<void> {
  const subject = 'You received a commission payout — BEEE Partner Program';
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Inter, Arial, sans-serif; line-height: 1.6; color: #3d3d3a; background: #faf9f5; margin: 0; padding: 0; }
    .container { max-width: 560px; margin: 0 auto; padding: 32px 24px; }
    .logo { font-size: 24px; font-weight: 700; color: #F27830; margin-bottom: 24px; }
    .card { background: #fff; border-radius: 12px; padding: 32px; border: 1px solid #e6dfd8; }
    .amt { font-size: 36px; font-weight: 700; color: #181715; margin: 16px 0; }
    .label { font-size: 13px; color: #6c6a64; text-transform: uppercase; letter-spacing: 0.04em; }
    .detail { margin: 4px 0 16px; font-size: 15px; color: #181715; }
    .footer { margin-top: 24px; font-size: 12px; color: #6c6a64; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">BEEE</div>
    <div class="card">
      <p>Hi ${recipient_name},</p>
      <p>A registration was completed using your partner code. You've earned a commission!</p>
      <div class="amt">${fmt_kobo(commission_kobo)}</div>
      <div class="label">Player</div>
      <div class="detail">${player_name}</div>
      <div class="label">Amount Paid</div>
      <div class="detail">${fmt_kobo(total_kobo)}</div>
      <p style="margin-top:24px;font-size:13px;color:#6c6a64;">The commission has been sent to your registered bank account. It may take 1–2 business days to reflect.</p>
    </div>
    <div class="footer">BEEE — Building Exceptional Experiences Through Education</div>
  </div>
</body>
</html>`;

  const binding = (platform as any)?.SEND_EMAIL;

  if (!binding) {
    console.log('[email] SEND_EMAIL binding not available (dev). Would send:', { to: to_email, subject });
    console.log('[email] HTML body:', html.substring(0, 200) + '...');
    return;
  }

  await binding.send({
    from: { name: 'BEEE', email: 'noreply@beeeproject.com' },
    to: [{ name: recipient_name, email: to_email }],
    subject,
    html
  });
}
