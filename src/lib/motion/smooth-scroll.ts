import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { REDUCED } from './constants';

let lenis: Lenis | null = null;

export function initSmoothScroll(): () => void {
	if (REDUCED()) return () => {};
	gsap.registerPlugin(ScrollTrigger);
	lenis = new Lenis({ lerp: 0.09, smoothWheel: true, syncTouch: false, touchMultiplier: 1.5 });
	lenis.on('scroll', ScrollTrigger.update);
	const raf = (time: number) => lenis?.raf(time * 1000);
	gsap.ticker.add(raf);
	gsap.ticker.lagSmoothing(0);
	return () => {
		gsap.ticker.remove(raf);
		lenis?.destroy();
		lenis = null;
	};
}

export const getLenis = () => lenis;
export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();
