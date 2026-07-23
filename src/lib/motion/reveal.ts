import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import { EASE_OUT, DUR, STAGGER, REDUCED } from './constants';

gsap.registerPlugin(ScrollTrigger, SplitText);

/** Headline lines rise out of overflow-hidden slots. */
export function revealLines(node: HTMLElement, opts?: { delay?: number; start?: string }) {
	if (REDUCED()) return;
	const split = new SplitText(node, { type: 'lines', linesClass: 'rv-reveal-line-inner' });
	split.lines.forEach((l) => {
		const wrap = document.createElement('span');
		wrap.className = 'rv-reveal-line';
		l.parentNode?.insertBefore(wrap, l);
		wrap.appendChild(l);
	});
	const tween = gsap.from(split.lines, {
		yPercent: 110,
		duration: DUR.reveal,
		ease: EASE_OUT,
		stagger: STAGGER,
		delay: opts?.delay ?? 0,
		scrollTrigger: { trigger: node, start: opts?.start ?? 'top 85%', once: true }
	});
	return { destroy: () => { tween.scrollTrigger?.kill(); tween.kill(); split.revert(); } };
}

/** Block fades up 24px. */
export function revealFade(node: HTMLElement, opts?: { delay?: number; y?: number }) {
	if (REDUCED()) return;
	const tween = gsap.from(node, {
		y: opts?.y ?? 24,
		opacity: 0,
		duration: DUR.reveal * 0.8,
		ease: EASE_OUT,
		delay: opts?.delay ?? 0,
		scrollTrigger: { trigger: node, start: 'top 85%', once: true }
	});
	return { destroy: () => { tween.scrollTrigger?.kill(); tween.kill(); } };
}

/** Direct children cascade with the house stagger. */
export function revealChildren(node: HTMLElement, opts?: { y?: number }) {
	if (REDUCED()) return;
	const kids = Array.from(node.children);
	const tween = gsap.from(kids, {
		y: opts?.y ?? 24,
		opacity: 0,
		duration: DUR.reveal * 0.8,
		ease: EASE_OUT,
		stagger: STAGGER,
		scrollTrigger: { trigger: node, start: 'top 85%', once: true }
	});
	return { destroy: () => { tween.scrollTrigger?.kill(); tween.kill(); } };
}

/** Image settles from scale 1.12 inside an overflow-hidden .rv-frame. */
export function revealImage(node: HTMLElement) {
	if (REDUCED()) return;
	const img = node.querySelector('img');
	if (!img) return;
	const tween = gsap.from(img, {
		scale: 1.12,
		duration: DUR.reveal * 1.2,
		ease: EASE_OUT,
		scrollTrigger: { trigger: node, start: 'top 85%', once: true }
	});
	return { destroy: () => { tween.scrollTrigger?.kill(); tween.kill(); } };
}
