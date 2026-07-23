import { writable } from 'svelte/store';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export type GlState = { section: 'hero'|'manifesto'|'journey'|'interlude'|'split'|'ambient'|'finale'; progress: number };
export const glState = writable<GlState>({ section: 'hero', progress: 0 });
export const glActive = writable(false);

gsap.registerPlugin(ScrollTrigger);

/** Registers a section as a driver of the shared GL uniforms while it's in view. */
export function glSection(node: HTMLElement, section: GlState['section']) {
	const trigger = ScrollTrigger.create({
		trigger: node,
		start: 'top bottom',
		end: 'bottom top',
		onUpdate: (self) => glState.set({ section, progress: self.progress })
	});
	return { destroy: () => trigger.kill() };
}
