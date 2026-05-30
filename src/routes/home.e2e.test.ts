import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const page = readFileSync(resolve(process.cwd(), 'src/routes/+page.svelte'), 'utf8');
const form = readFileSync(resolve(process.cwd(), 'src/components/RegistrationForm.svelte'), 'utf8');

describe('homepage chess visuals', () => {
	it('keeps the chess motif inside the registration page instead of a detached bottom strip', () => {
		expect(page).not.toContain('ChessboardPulse');
		expect(form).toContain('chess_board_cells');
		expect(form).toContain('grid-cols-8');
		expect(form).toContain('aria-hidden="true"');
	});
});
