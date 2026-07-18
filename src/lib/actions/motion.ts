import { inView } from 'motion';

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

type MotionActionParams = {
  stiffness?: number;
  damping?: number;
  delay?: number;
  mass?: number;
};

function waapiAnim(node: HTMLElement, keyframes: Keyframe[], options?: KeyframeAnimationOptions) {
  return node.animate(keyframes, { fill: 'both', ...options });
}

export function motionFadeUp(node: HTMLElement, params?: MotionActionParams) {
  if (prefersReducedMotion() || isTouchDevice()) return;

  const p = { stiffness: 200, damping: 25, ...params };
  inView(node, () => {
    waapiAnim(node, [
      { opacity: 0, transform: 'translateY(26px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ], { duration: 600, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
  });
}

export function motionScaleIn(node: HTMLElement, params?: MotionActionParams) {
  if (prefersReducedMotion() || isTouchDevice()) return;

  inView(node, () => {
    waapiAnim(node, [
      { opacity: 0, transform: 'scale(0.95)' },
      { opacity: 1, transform: 'scale(1)' },
    ], { duration: 500, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
  });
}

export function motionStagger(node: HTMLElement, params?: MotionActionParams) {
  if (prefersReducedMotion() || isTouchDevice()) return;

  const p = { delay: 0.1, ...params };
  const children = Array.from(node.children) as HTMLElement[];
  children.forEach((child, i) => {
    inView(child, () => {
      waapiAnim(child, [
        { opacity: 0, transform: 'translateY(20px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ], { duration: 500, delay: p.delay! * i, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
    });
  });
}

type StaggeredParams = { delay?: number; stagger?: number; y?: number };

export function motionStaggered(node: HTMLElement, params?: StaggeredParams) {
  if (prefersReducedMotion() || isTouchDevice()) return;
  const p = { delay: 0, stagger: 0.08, y: 20, ...params };
  const children = Array.from(node.children) as HTMLElement[];

  children.forEach((child, i) => {
    inView(child, () => {
      waapiAnim(child, [
        { opacity: 0, transform: `translateY(${p.y}px)` },
        { opacity: 1, transform: 'translateY(0)' },
      ], { duration: 500, delay: (p.delay + p.stagger * i) * 1000, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
    });
  });
}

export { inView };
