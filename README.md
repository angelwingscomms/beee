# BEEE TEAMUP Chess Tournament - Registration Page

A professional SvelteKit registration system for the BEEE TEAMUP Chess Tournament.

## Features

### Registration Form
- **School Information**: Collect school name, email, and phone number
- **4-Player Team Registration**: Dedicated slots for team member details with chess rating levels
- **Location Selection**: Three methods for selecting tournament location:
  1. **Search**: Search by school name (with mock results)
  2. **Interactive Map**: Adjust coordinates with cardinal direction buttons
  3. **Paste Link**: Paste Google Maps links or coordinates directly

### Pricing Display
- Prominently displays **₦50,000** total registration fee for 4-player team
- Shows breakdown: **₦12,500 per player**
- Clear pricing summary section in the form

### Payment Integration
- **Paystack Payment Integration** (configured for future implementation)
- Confirmation modal showing registration details before payment
- Mock email confirmation on successful payment
- Demo API endpoints for:
  - Registration (`/api/register`)
  - Payment initialization (`/api/payment/initialize`)
  - Email confirmation (`/api/email/confirm`)

### Design
- Dark theme (professional, modern appearance)
- Cyan primary color (#06b6d4) with accent gold color (#f59e0b)
- Responsive layout supporting mobile and desktop
- Tailwind CSS for styling
- Smooth interactions and tab switching

## Project Structure

```
src/
├── App.svelte                 # Main app component
├── main.ts                    # Entry point
├── app.css                    # Global styles
├── components/
│   ├── RegistrationForm.svelte
│   ├── LocationSelector.svelte
│   ├── PlayerForm.svelte
│   └── ConfirmationModal.svelte
└── routes/
    └── api/
        ├── register/+server.ts
        ├── payment/initialize/+server.ts
        └── email/confirm/+server.ts
```

## Getting Started

### Install Dependencies
```bash
pnpm install
```

### Development Server
```bash
pnpm dev
```

Visit `http://localhost:5173` in your browser.

### Build
```bash
pnpm build
```

### Preview Production Build
```bash
pnpm preview
```

## Environment Variables

For production use, configure:
```env
PAYSTACK_PUBLIC_KEY=pk_live_xxxxx
PAYSTACK_SECRET_KEY=sk_live_xxxxx
EMAIL_SERVICE_API_KEY=xxxxx
```

## Configuration

### Tailwind CSS
The project uses Tailwind CSS v3 with custom color tokens:
- `background`: rgb(15, 23, 42)
- `foreground`: rgb(241, 245, 249)
- `primary`: rgb(6, 182, 212)
- `secondary`: rgb(30, 41, 59)
- `accent`: rgb(245, 158, 11)

### Vite Configuration
- Configured for SvelteKit development
- Hot Module Replacement (HMR) enabled
- TypeScript support

## API Endpoints (Mock/Demo)

### POST /api/register
Register a school for the tournament.

**Request:**
```json
{
  "schoolName": "University of Lagos",
  "schoolEmail": "registration@unilag.edu.ng",
  "schoolPhone": "+234 XXX XXX XXXX",
  "location": {
    "lat": 6.5244,
    "lng": 3.3792,
    "address": "University of Lagos, Akoka"
  },
  "players": [
    { "name": "Player Name", "email": "player@example.com", "chessRating": "Advanced" }
  ]
}
```

### POST /api/payment/initialize
Initialize Paystack payment.

### POST /api/email/confirm
Send confirmation email to registered school.

## Form Validation

The registration form uses Zod for schema validation:
- School name: minimum 2 characters
- Email: valid email format
- Phone: valid phone number format
- Players: exactly 4 players required, each with valid details
- Location: must be selected

## Browser Support

- Chrome/Edge: Latest versions
- Firefox: Latest versions
- Safari: Latest versions
- Mobile browsers supported with responsive design

## Technologies Used

- **SvelteKit**: Modern web framework
- **Svelte 5**: Reactive UI components
- **Tailwind CSS**: Utility-first CSS framework
- **Zod**: TypeScript-first schema validation
- **TypeScript**: Type-safe development

## Notes

- This is a demo version with mock API endpoints
- Location search uses mock results (can be connected to Google Places API)
- Payment processing requires Paystack account setup
- Email service requires configuration with actual email provider
- Form data is not persisted to database in demo version

## License

Proprietary - BEEE TEAMUP Chess Tournament 2026
