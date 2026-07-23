import { REDUCED } from '$lib/motion/constants';
import type { GlState } from './store';

function smoothstep(edge0: number, edge1: number, x: number) {
	const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
	return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number) {
	return a + (b - a) * t;
}

const LERP_FACTOR = 0.06;

type BeamTarget = { x: number; angle: number; width: number; intensity: number };

function beamATarget(section: GlState['section'], progress: number): BeamTarget {
	switch (section) {
		case 'hero':
			return { x: 0.25, angle: 0.32, width: 0.3, intensity: 0.9 * (1 - 0.33 * progress) };
		case 'manifesto':
			return { x: -0.3, angle: 0.2, width: 0.12, intensity: 0.5 };
		case 'journey':
			return { x: -0.6 + 1.2 * progress, angle: 0.1, width: 0.1, intensity: 0.55 };
		case 'interlude':
			return { x: 0, angle: 0, width: 0.34, intensity: 0.8 };
		case 'finale':
			return { x: 0, angle: 0, width: 0.16, intensity: 1.0 };
		case 'split':
			return { x: 0, angle: 0, width: 0.3, intensity: 0 };
		case 'ambient':
		default:
			return { x: 0.4, angle: 0.26, width: 0.22, intensity: 0.15 };
	}
}

function dustMorphTarget(section: GlState['section'], progress: number): number {
	if (section !== 'interlude') return 0;
	return smoothstep(0.25, 0.45, progress) - smoothstep(0.75, 0.95, progress);
}

export async function createGl(canvas: HTMLCanvasElement) {
	if (typeof window === 'undefined') return null;
	if (REDUCED()) return null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	if ((navigator as any).connection?.saveData === true) return null;

	try {
		const testCtx = canvas.getContext('webgl2') || canvas.getContext('webgl');
		if (!testCtx) return null;
	} catch {
		return null;
	}

	const THREE = await import('three');
	const { createDust } = await import('./dust');
	const { createBeams, BEAM_ORANGE, BEAM_HONEY } = await import('./beams');
	const { loadKnightTargets } = await import('./knight');

	const isMobile = matchMedia('(max-width: 767px)').matches;
	const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

	let renderer: InstanceType<typeof THREE.WebGLRenderer> | null = new THREE.WebGLRenderer({
		canvas,
		alpha: true,
		antialias: false,
		powerPreference: 'high-performance'
	});
	renderer.setPixelRatio(dpr);

	const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
	camera.position.z = 1;
	const scene = new THREE.Scene();

	const { points: dustPoints, material: dustMaterial, geometry: dustGeometry, targets: dustTargets } =
		createDust(isMobile);
	scene.add(dustPoints);

	const { geometry: beamGeometry, meshA, meshB, beamA, beamB, splitMeshes } = createBeams();
	scene.add(meshA, meshB, ...splitMeshes);

	let width = canvas.clientWidth || window.innerWidth;
	let height = canvas.clientHeight || window.innerHeight;

	function applyAspect() {
		const aspect = width / Math.max(1, height);
		dustMaterial.uniforms.uAspect.value = aspect;
		beamA.uniforms.uAspect.value = aspect;
		beamB.uniforms.uAspect.value = aspect;
		for (const m of splitMeshes) (m.material as InstanceType<typeof THREE.ShaderMaterial>).uniforms.uAspect.value = aspect;
	}

	function resize() {
		width = canvas.clientWidth || window.innerWidth;
		height = canvas.clientHeight || window.innerHeight;
		renderer?.setSize(width, height, false);
		applyAspect();
	}
	resize();

	const resizeObserver = new ResizeObserver(() => resize());
	resizeObserver.observe(canvas);

	let currentSection: GlState['section'] = 'hero';
	let currentProgress = 0;
	let prevProgress = 0;
	let flashStart: number | null = null;

	function setState(section: GlState['section'], progress: number) {
		if (section === 'split' && currentSection !== 'split') {
			prevProgress = 0;
		}
		if (section === 'split' && prevProgress < 0.35 && progress >= 0.35) {
			flashStart = performance.now();
		}
		prevProgress = progress;
		currentSection = section;
		currentProgress = progress;
	}

	// current smoothed values
	const curA: BeamTarget = { x: 0.25, angle: 0.32, width: 0.3, intensity: 0 };
	const curSplit = [0, 0, 0, 0, 0];
	let curMorph = 0;
	const beamBColor = BEAM_HONEY.clone();

	// fire-and-forget: knight targets load once, applied when ready
	loadKnightTargets(dustGeometry.attributes.aSeed.count).then((targets) => {
		dustTargets.set(targets);
		dustGeometry.attributes.aTarget.needsUpdate = true;
	});

	let rafId = 0;
	let startTime = performance.now();
	let paused = false;

	function onVisibility() {
		paused = document.hidden;
	}
	document.addEventListener('visibilitychange', onVisibility);

	function tick() {
		rafId = requestAnimationFrame(tick);
		if (paused || !renderer) return;
		const t = (performance.now() - startTime) / 1000;
		dustMaterial.uniforms.uTime.value = t;
		beamA.uniforms.uTime.value = t;
		beamB.uniforms.uTime.value = t;
		for (const m of splitMeshes) (m.material as InstanceType<typeof THREE.ShaderMaterial>).uniforms.uTime.value = t;

		const targetA =
			currentSection === 'split'
				? { x: 0, angle: 0, width: 0.3, intensity: 0 }
				: beamATarget(currentSection, currentProgress);

		curA.x = lerp(curA.x, targetA.x, LERP_FACTOR);
		curA.angle = lerp(curA.angle, targetA.angle, LERP_FACTOR);
		curA.width = lerp(curA.width, targetA.width, LERP_FACTOR);

		let targetIntensityA = targetA.intensity;
		if (currentSection === 'split' && flashStart !== null) {
			const elapsed = performance.now() - flashStart;
			targetIntensityA = elapsed < 300 ? 1.2 * (1 - elapsed / 300) : 0;
		}
		curA.intensity = lerp(curA.intensity, targetIntensityA, LERP_FACTOR);

		beamA.uniforms.uX.value = curA.x;
		beamA.uniforms.uAngle.value = curA.angle;
		beamA.uniforms.uWidth.value = curA.width;
		beamA.uniforms.uIntensity.value = curA.intensity;

		beamB.uniforms.uX.value = curA.x + 0.08;
		beamB.uniforms.uAngle.value = curA.angle + 0.06;
		beamB.uniforms.uWidth.value = curA.width;
		beamB.uniforms.uIntensity.value = curA.intensity * 0.5;

		const targetBeamBColor = currentSection === 'finale' ? BEAM_ORANGE : BEAM_HONEY;
		beamBColor.lerp(targetBeamBColor, LERP_FACTOR);
		(beamB.uniforms.uColor.value as InstanceType<typeof THREE.Vector3>).copy(beamBColor);

		for (let i = 0; i < 5; i++) {
			const target =
				currentSection === 'split'
					? Math.min(1, Math.max(0, (currentProgress - 0.35 - i * 0.06) / 0.2))
					: 0;
			curSplit[i] = lerp(curSplit[i], target, LERP_FACTOR);
			(splitMeshes[i].material as InstanceType<typeof THREE.ShaderMaterial>).uniforms.uIntensity.value =
				curSplit[i];
		}

		const morphTarget = dustMorphTarget(currentSection, currentProgress);
		curMorph = lerp(curMorph, morphTarget, LERP_FACTOR);
		dustMaterial.uniforms.uMorph.value = curMorph;
		dustMaterial.uniforms.uBeamX.value = curA.x;
		dustMaterial.uniforms.uBeamAngle.value = curA.angle;
		dustMaterial.uniforms.uBeamWidth.value = curA.width;
		dustMaterial.uniforms.uIntensity.value = curA.intensity;

		renderer.render(scene, camera);
	}
	rafId = requestAnimationFrame(tick);

	function dispose() {
		cancelAnimationFrame(rafId);
		document.removeEventListener('visibilitychange', onVisibility);
		resizeObserver.disconnect();
		dustGeometry.dispose();
		dustMaterial.dispose();
		beamGeometry.dispose();
		beamA.dispose();
		beamB.dispose();
		for (const m of splitMeshes) (m.material as InstanceType<typeof THREE.ShaderMaterial>).dispose();
		renderer?.dispose();
		renderer = null;
	}

	return { setState, resize, dispose };
}

export type GlHandle = Awaited<ReturnType<typeof createGl>>;
