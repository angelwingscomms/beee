import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

interface RegistrationData {
  schoolName: string;
  schoolEmail: string;
  schoolPhone: string;
  location: { lat: number; lng: number; address: string };
  players: Array<{ name: string; email: string; chessRating: string }>;
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data: RegistrationData = await request.json();

    // Validate required fields
    if (!data.schoolName || !data.schoolEmail || !data.schoolPhone || !data.location || !data.players) {
      return json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (data.players.length !== 4) {
      return json(
        { message: 'Exactly 4 players are required' },
        { status: 400 }
      );
    }

    // Generate registration ID (mock)
    const registrationId = `REG-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    console.log('[v0] Registration received:', {
      registrationId,
      schoolName: data.schoolName,
      schoolEmail: data.schoolEmail,
      playersCount: data.players.length,
      location: data.location.address,
    });

    // In a real app, you would save this to a database
    // For now, we'll just return success

    return json({
      success: true,
      registrationId,
      message: 'Registration successful. Proceed to payment.',
    });
  } catch (error) {
    console.error('[v0] Registration error:', error);
    return json(
      { message: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
};
