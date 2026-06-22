import { inView, scroll } from 'motion';

interface AxisScrollInfo {
  current: number;
  offset: number[];
  progress: number;
  scrollLength: number;
  velocity: number;
  targetOffset: number;
  targetLength: number;
  containerLength: number;
}
interface ScrollInfo {
  time: number;
  x: AxisScrollInfo;
  y: AxisScrollInfo;
}

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

export function motionSpring(node: HTMLElement, properties?: Partial<Record<string, string | number>> & MotionActionParams) {
  if (prefersReducedMotion() || isTouchDevice()) return;

  const { stiffness = 200, damping = 25, ...rest } = properties || {};
  const keyframes: Keyframe[] = [{}];
  for (const [key, val] of Object.entries(rest)) {
    if (Array.isArray(val)) {
      keyframes[0] = { ...keyframes[0], [key]: val[0] };
      keyframes[1] = { ...(keyframes[1] || {}), [key]: val[val.length - 1] };
    } else {
      keyframes[1] = { ...(keyframes[1] || {}), [key]: val };
    }
  }
  if (keyframes.length === 1) return;
  waapiAnim(node, keyframes, {
    duration: 600,
    easing: `cubic-bezier(${springToCubic(stiffness, damping)})`,
  });
}

function springToCubic(stiffness: number, damping: number): string {
  const s = Math.max(0, Math.min(1, stiffness / 400));
  const d = Math.max(0, Math.min(1, damping / 50));
  return `${0.33 + s * 0.33}, ${0.66 - d * 0.33}, ${0.66 + s * 0.17}, 1`;
}

export function motionMagnetic(node: HTMLElement) {
  if (prefersReducedMotion() || isTouchDevice()) return;

  const onMove = (e: MouseEvent) => {
    const rect = node.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / 8;
    const dy = (e.clientY - cy) / 8;
    node.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onLeave = () => {
    node.style.transform = 'translate(0, 0)';
  };

  node.addEventListener('mousemove', onMove);
  node.addEventListener('mouseleave', onLeave);

  return {
    destroy() {
      node.removeEventListener('mousemove', onMove);
      node.removeEventListener('mouseleave', onLeave);
    },
  };
}

type SlideDir = 'left' | 'right' | 'up' | 'down';
type SlideParams = { dir?: SlideDir; distance?: number; delay?: number; duration?: number };

export function motionSlideEnter(node: HTMLElement, params?: SlideParams) {
  if (prefersReducedMotion() || isTouchDevice()) return;
  const p = { dir: 'up' as SlideDir, distance: 30, delay: 0, duration: 600, ...params };
  const tx = p.dir === 'left' || p.dir === 'right'
    ? p.dir === 'left' ? `translateX(${p.distance}px)` : `translateX(${-p.distance}px)`
    : 'translateX(0)';
  const ty = p.dir === 'up' || p.dir === 'down'
    ? p.dir === 'up' ? `translateY(${p.distance}px)` : `translateY(${-p.distance}px)`
    : 'translateY(0)';

  inView(node, () => {
    waapiAnim(node, [
      { opacity: 0, transform: `${tx} ${ty}` },
      { opacity: 1, transform: 'translateX(0) translateY(0)' },
    ], { duration: p.duration, delay: p.delay * 1000, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
  });
}

type ParallaxParams = { speed?: number; offset?: number };

export function motionParallax(node: HTMLElement, params?: ParallaxParams) {
  if (prefersReducedMotion() || isTouchDevice()) return;
  const p = { speed: 0.3, offset: 0, ...params };

  const stop = scroll(
    (progress: number, info: ScrollInfo) => {
      const rect = node.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewCenter = window.innerHeight / 2;
      const dist = (center - viewCenter) / window.innerHeight;
      node.style.transform = `translateY(${dist * p.speed * 100}px)`;
    },
    { axis: 'y' }
  );

  return { destroy: () => stop() };
}

type RevealParams = { delay?: number; blur?: number };

export function motionReveal(node: HTMLElement, params?: RevealParams) {
  if (prefersReducedMotion() || isTouchDevice()) return;
  const p = { delay: 0, blur: 6, ...params };

  inView(node, () => {
    waapiAnim(node, [
      { opacity: 0, filter: `blur(${p.blur}px)` },
      { opacity: 1, filter: 'blur(0px)' },
    ], { duration: 800, delay: p.delay * 1000, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
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

export { inView, scroll };
