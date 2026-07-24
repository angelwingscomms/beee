// Particle targets shaped like the gioco chess knight (viewBox 0 0 50 50).
// Body + base are filled as one solid silhouette and rasterised in-canvas, so
// the shape is exact — no baked mask asset to keep in sync with the piece art.
export const KNIGHT_PATHS = [
	'm25.987 23.546-11.592 1.097-1.454-5.216 14.468-6.815 1.763-3.9 10.2 11.892-4.116 17.678H14.74c.245-11.292 9.64-8.1 11.247-14.736z',
	'M13.24 38.286c-1.437 0-2.627 1.216-2.627 2.685v.545l.013 2.684h28.748l.013-2.684v-.545c0-1.468-1.19-2.685-2.627-2.685H25z'
];

function mulberry32(seed: number) {
	let a = seed;
	return function () {
		a |= 0;
		a = (a + 0x6d2b79f5) | 0;
		let t = Math.imul(a ^ (a >>> 15), 1 | a);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

export async function loadKnightTargets(count: number): Promise<Float32Array> {
	const targets = new Float32Array(count * 2);
	if (typeof document === 'undefined') return targets;

	const size = 256;
	const canvas = document.createElement('canvas');
	canvas.width = size;
	canvas.height = size;
	const ctx = canvas.getContext('2d');
	if (!ctx) return targets;

	ctx.scale(size / 50, size / 50); // gioco piece viewBox is 50 x 50
	ctx.fillStyle = '#fff';
	for (const d of KNIGHT_PATHS) ctx.fill(new Path2D(d));
	const { data } = ctx.getImageData(0, 0, size, size);

	// Collect every filled pixel and its bounding box.
	const px: number[] = [];
	const py: number[] = [];
	let minX = size, minY = size, maxX = 0, maxY = 0;
	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			if (data[(y * size + x) * 4 + 3] > 128) {
				px.push(x);
				py.push(y);
				if (x < minX) minX = x;
				if (x > maxX) maxX = x;
				if (y < minY) minY = y;
				if (y > maxY) maxY = y;
			}
		}
	}
	if (px.length === 0) return targets;

	// Fit the silhouette into a 0.9-unit frame, preserving aspect, centred on 0.
	const cx = (minX + maxX) / 2;
	const cy = (minY + maxY) / 2;
	const scale = 0.9 / Math.max(maxX - minX, maxY - minY);

	const points: [number, number][] = px.map((x, i) => [
		(x - cx) * scale,
		-(py[i] - cy) * scale // flip Y: canvas is y-down, clip space is y-up
	]);

	// Deterministic shuffle so any subset of `count` points covers the shape evenly.
	const rand = mulberry32(42);
	for (let i = points.length - 1; i > 0; i--) {
		const j = Math.floor(rand() * (i + 1));
		[points[i], points[j]] = [points[j], points[i]];
	}

	for (let i = 0; i < count; i++) {
		const [x, y] = points[i % points.length];
		targets[i * 2] = x;
		targets[i * 2 + 1] = y;
	}
	return targets;
}
