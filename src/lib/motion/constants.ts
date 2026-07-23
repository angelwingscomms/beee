export const EASE_OUT = 'expo.out';
export const EASE_INOUT = 'power4.inOut';
export const DUR = { micro: 0.3, reveal: 1.0, page: 1.3 } as const;
export const STAGGER = 0.07;
export const REDUCED = () =>
	typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
