import { animate, inView, scroll } from 'motion';

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

export function motionFadeUp(node: HTMLElement, params?: MotionActionParams) {
  if (prefersReducedMotion() || isTouchDevice()) return;

  const p = { stiffness: 200, damping: 25, ...params };
  inView(node, () => {
    animate(
      node,
      { opacity: [0, 1], transform: ['translateY(26px)', 'translateY(0)'] },
      { type: 'spring', stiffness: p.stiffness, damping: p.damping, duration: 0.6 }
    );
  });
}

export function motionScaleIn(node: HTMLElement, params?: MotionActionParams) {
  if (prefersReducedMotion() || isTouchDevice()) return;

  const p = { stiffness: 200, damping: 25, ...params };
  inView(node, () => {
    animate(
      node,
      { opacity: [0, 1], transform: ['scale(0.95)', 'scale(1)'] },
      { type: 'spring', stiffness: p.stiffness, damping: p.damping, duration: 0.5 }
    );
  });
}

export function motionStagger(node: HTMLElement, params?: MotionActionParams) {
  if (prefersReducedMotion() || isTouchDevice()) return;

  const p = { delay: 0.1, ...params };
  const children = Array.from(node.children) as HTMLElement[];
  children.forEach((child, i) => {
    inView(child, () => {
      animate(
        child,
        { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0)'] },
        { type: 'spring', stiffness: 200, damping: 25, delay: p.delay! * i }
      );
    });
  });
}

export function motionSpring(node: HTMLElement, properties?: Partial<Record<string, string | number>> & MotionActionParams) {
  if (prefersReducedMotion() || isTouchDevice()) return;

  const { stiffness = 200, damping = 25, ...rest } = properties || {};
  animate(node, rest as Record<string, string | number>, {
    type: 'spring',
    stiffness,
    damping,
  });
}

export { animate, inView, scroll };
