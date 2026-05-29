import { randomUUID } from 'crypto';

export function new_id(): string {
	return randomUUID();
}
