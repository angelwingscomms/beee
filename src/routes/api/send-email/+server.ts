import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

interface Player {
	name: string;
	email: string;
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		// Validate request
		if (!data.to || !data.schoolName || !data.registrationId || !data.amount) {
			return json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		// In a real app, this would send an email via a service like Resend, SendGrid, etc.
		// For demo, we'll just log it
		const emailContent = {
			to: data.to,
			subject: `BEEE TEAMUP Chess Tournament - Registration Confirmation #${data.registrationId}`,
			schoolName: data.schoolName,
			registrationId: data.registrationId,
			amount: data.amount,
			players: data.players || [],
			timestamp: new Date().toISOString()
		};

		console.log('[v0] Confirmation email would be sent:', emailContent);

		// Mock email template
		const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
    .section { margin-bottom: 30px; }
    .section h2 { color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
    .details { background: white; padding: 15px; border-left: 4px solid #667eea; margin: 15px 0; }
    .player-list { list-style: none; padding: 0; }
    .player-list li { padding: 8px; background: white; margin: 8px 0; border-left: 3px solid #667eea; }
    .price { font-size: 28px; font-weight: bold; color: #667eea; }
    .footer { text-align: center; color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>BEEE TEAMUP Chess Tournament</h1>
      <p>Registration Confirmation</p>
    </div>
    <div class="content">
      <div class="section">
        <h2>Welcome to BEEE TEAMUP!</h2>
        <p>Thank you for registering your team for the BEEE TEAMUP Chess Tournament. Your registration has been successfully processed.</p>
      </div>

      <div class="section">
        <h2>Registration Details</h2>
        <div class="details">
          <p><strong>School:</strong> ${data.schoolName}</p>
          <p><strong>Registration ID:</strong> ${data.registrationId}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div class="section">
        <h2>Team Members</h2>
        <ul class="player-list">
          ${(data.players || []).map((p: Player, i: number) => `<li><strong>Player ${i + 1}:</strong> ${p.name} (${p.email})</li>`).join('')}
        </ul>
      </div>

      <div class="section">
        <h2>Payment Summary</h2>
        <div class="details">
          <p>Registration Fee: <span class="price">₦${data.amount.toLocaleString()}</span></p>
          <p><strong>Status:</strong> <span style="color: #28a745;">✓ Paid</span></p>
        </div>
      </div>

      <div class="section">
        <p>We&apos;re excited to have your team participate in the tournament. If you have any questions, please don&apos;t hesitate to contact us.</p>
      </div>

      <div class="footer">
        <p>&copy; 2024 BEEE TEAMUP Chess Tournament. All rights reserved.</p>
        <p>This is an automated message. Please do not reply to this email.</p>
      </div>
    </div>
  </div>
</body>
</html>
		`;

		console.log('[v0] Email HTML:', htmlContent.substring(0, 100) + '...');

		return json({
			success: true,
			message: 'Confirmation email sent successfully',
			email: data.to
		});
	} catch (error) {
		console.error('[v0] Email error:', error);
		return json(
			{ error: 'Failed to send confirmation email' },
			{ status: 500 }
		);
	}
};
