import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

interface PaymentInitRequest {
  amount: number;
  email: string;
  schoolName: string;
  registrationId: string;
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data: PaymentInitRequest = await request.json();

    if (!data.amount || !data.email || !data.schoolName || !data.registrationId) {
      return json(
        { message: 'Missing required payment fields' },
        { status: 400 }
      );
    }

    // In a real app, you would call Paystack API here
    // const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`
    //   },
    //   body: JSON.stringify({
    //     amount: data.amount * 100, // Convert to kobo
    //     email: data.email,
    //     metadata: {
    //       schoolName: data.schoolName,
    //       registrationId: data.registrationId
    //     }
    //   })
    // });

    const mockTransactionRef = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    console.log('[v0] Payment initialized:', {
      amount: data.amount,
      email: data.email,
      schoolName: data.schoolName,
      registrationId: data.registrationId,
      transactionRef: mockTransactionRef,
    });

    return json({
      success: true,
      transactionRef: mockTransactionRef,
      authorizationUrl: `https://checkout.paystack.com/${mockTransactionRef}`,
      accessCode: `access_code_${mockTransactionRef}`,
      message: 'Payment initialized. Redirecting to Paystack...',
    });
  } catch (error) {
    console.error('[v0] Payment initialization error:', error);
    return json(
      { message: 'Payment initialization failed. Please try again.' },
      { status: 500 }
    );
  }
};
