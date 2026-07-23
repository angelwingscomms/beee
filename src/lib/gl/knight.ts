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
	const img = new Image();
	img.src = '/gl/knight-mask.png';
	await new Promise<void>((resolve, reject) => {
		img.onload = () => resolve();
		img.onerror = reject;
	});

	const size = 160;
	const canvas = document.createElement('canvas');
	canvas.width = size;
	canvas.height = size;
	const ctx = canvas.getContext('2d')!;
	ctx.drawImage(img, 0, 0, size, size);
	const { data } = ctx.getImageData(0, 0, size, size);

	const points: [number, number][] = [];
	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			const i = (y * size + x) * 4;
			const alpha = data[i + 3];
			const luminance = (data[i] + data[i + 1] + data[i + 2]) / 3;
			if (alpha > 128 && luminance > 128) {
				const cx = (x / size) * 0.9 - 0.45;
				const cy = -((y / size) * 1.0 - 0.5);
				points.push([cx, cy]);
			}
		}
	}

	const rand = mulberry32(42);
	for (let i = points.length - 1; i > 0; i--) {
		const j = Math.floor(rand() * (i + 1));
		[points[i], points[j]] = [points[j], points[i]];
	}

	const targets = new Float32Array(count * 2);
	if (points.length === 0) return targets;
	for (let i = 0; i < count; i++) {
		const [x, y] = points[i % points.length];
		targets[i * 2] = x;
		targets[i * 2 + 1] = y;
	}
	return targets;
}
