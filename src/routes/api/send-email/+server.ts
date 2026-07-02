import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

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
			timestamp: new Date().toISOString()
		};

		console.log('[v0] Confirmation email would be sent:', emailContent);

		// Mock email template
		const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Inter, Arial, sans-serif; line-height: 1.6; color: #3d3d3a; background: #faf9f5; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #181715; color: #faf9f5; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #faf9f5; padding: 30px; border: 1px solid #e6dfd8; border-top: 0; border-radius: 0 0 8px 8px; }
    .section { margin-bottom: 30px; }
    .section h2 { color: #141413; border-bottom: 2px solid #F27830; padding-bottom: 10px; }
    .details { background: #efe9de; padding: 15px; border-left: 4px solid #F27830; margin: 15px 0; }
    .price { font-size: 28px; font-weight: bold; color: #F27830; }
    .footer { text-align: center; color: #6c6a64; font-size: 12px; margin-top: 30px; border-top: 1px solid #e6dfd8; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>BEEE TEAMUP Chess Championship</h1>
      <p>registration confirmation</p>
    </div>
    <div class="content">
      <div class="section">
        <h2>welcome to BEEE TEAMUP</h2>
        <p>thank you for registering for the BEEE TEAMUP Chess Championship. your registration has been successfully processed.</p>
      </div>

      <div class="section">
        <h2>registration details</h2>
        <div class="details">
          <p><strong>school:</strong> ${data.schoolName}</p>
          <p><strong>registration id:</strong> ${data.registrationId}</p>
          <p><strong>date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div class="section">
        <h2>payment summary</h2>
        <div class="details">
          <p>registration fee: <span class="price">ngn ${data.amount.toLocaleString()}</span></p>
          <p><strong>status:</strong> <span style="color: #5db872;">paid</span></p>
        </div>
      </div>

      <div class="section">
        <p>we&apos;re excited to have you participate in the tournament. if you have any questions, please contact us.</p>
      </div>

      <div class="footer">
        <p>&copy; 2024 beee TEAMUP Chess Championship. all rights reserved.</p>
        <p>this is an automated message. please do not reply to this email.</p>
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
