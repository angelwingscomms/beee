import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

interface ConfirmEmailRequest {
  email: string;
  schoolName: string;
  registrationId: string;
  amount: number;
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data: ConfirmEmailRequest = await request.json();

    if (!data.email || !data.schoolName || !data.registrationId) {
      return json(
        { message: 'Missing required email fields' },
        { status: 400 }
      );
    }

    // In a real app, you would send an email using a service like SendGrid, Mailgun, etc.
    // const emailResult = await sendEmail({
    //   to: data.email,
    //   subject: 'BEEE T.E.A.M.U.P. Chess Tournament - Registration Confirmed',
    //   html: generateConfirmationEmail({
    //     schoolName: data.schoolName,
    //     registrationId: data.registrationId,
    //     amount: data.amount
    //   })
    // });

    console.log('[v0] Confirmation email would be sent to:', {
      email: data.email,
      schoolName: data.schoolName,
      registrationId: data.registrationId,
      amount: data.amount,
    });

    // Mock email send
    console.log('[v0] Email content:');
    console.log(`
      ═══════════════════════════════════════════
      BEEE T.E.A.M.U.P. Chess Tournament
      Registration Confirmation
      ═══════════════════════════════════════════
      
      Dear ${data.schoolName},
      
      Thank you for registering for BEEE T.E.A.M.U.P. Chess Tournament!
      
      Registration Details:
      - Registration ID: ${data.registrationId}
      - Amount Paid: ₦${data.amount.toLocaleString()}
      - Team Size: 4 Players
      - Confirmation Email: ${data.email}
      
      Your registration is now complete. You will receive further
      instructions via email regarding tournament dates and rules.
      
      Best regards,
      BEEE T.E.A.M.U.P. Organization
      ═══════════════════════════════════════════
    `);

    return json({
      success: true,
      message: 'Confirmation email sent successfully',
      emailSent: true,
    });
  } catch (error) {
    console.error('[v0] Email send error:', error);
    // Don't fail the payment if email fails
    return json({
      success: true,
      message: 'Registration confirmed (email could not be sent)',
      emailSent: false,
    });
  }
};
