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

export function motionMagnetic(node: HTMLElement) {
  if (prefersReducedMotion() || isTouchDevice()) return;

  let tx = 0;
  let ty = 0;
  let pressed = false;

  const apply = () => {
    node.style.transform = `translate(${tx}px, ${ty}px) scale(${pressed ? 0.97 : 1})`;
  };

  const onMove = (e: MouseEvent) => {
    const rect = node.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    tx = (e.clientX - cx) / 8;
    ty = (e.clientY - cy) / 8;
    apply();
  };

  const onLeave = () => {
    tx = 0;
    ty = 0;
    pressed = false;
    apply();
  };

  const onDown = () => {
    pressed = true;
    apply();
  };

  const onUp = () => {
    pressed = false;
    apply();
  };

  node.addEventListener('mousemove', onMove);
  node.addEventListener('mouseleave', onLeave);
  node.addEventListener('mousedown', onDown);
  node.addEventListener('mouseup', onUp);

  return {
    destroy() {
      node.removeEventListener('mousemove', onMove);
      node.removeEventListener('mouseleave', onLeave);
      node.removeEventListener('mousedown', onDown);
      node.removeEventListener('mouseup', onUp);
    },
  };
}

export { inView };
