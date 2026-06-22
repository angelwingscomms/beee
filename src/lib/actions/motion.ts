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
  const p = { dir: 'up' as SlideDir, distance: 30, delay: 0, duration: 0.6, ...params };
  const dirMap: Record<SlideDir, Record<string, [number, number]>> = {
    left: { x: [-p.distance, 0] },
    right: { x: [p.distance, 0] },
    up: { y: [p.distance, 0] },
    down: { y: [-p.distance, 0] },
  };
  const offset = dirMap[p.dir];
  inView(node, () => {
    animate(
      node,
      {
        opacity: [0, 1],
        transform: p.dir === 'left' || p.dir === 'right'
          ? [`translateX(${offset.x![0]}px)`, 'translateX(0)']
          : [`translateY(${offset.y![0]}px)`, 'translateY(0)'],
      },
      { duration: p.duration, delay: p.delay, easing: [0.16, 1, 0.3, 1] }
    );
  });
}

type ParallaxParams = { speed?: number; offset?: number };

export function motionParallax(node: HTMLElement, params?: ParallaxParams) {
  if (prefersReducedMotion() || isTouchDevice()) return;
  const p = { speed: 0.3, offset: 0, ...params };

  const stop = scroll(
    ({ y }: { y: number }) => {
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
    animate(
      node,
      {
        opacity: [0, 1],
        filter: [`blur(${p.blur}px)`, 'blur(0px)'],
      },
      { duration: 0.8, delay: p.delay, easing: [0.16, 1, 0.3, 1] }
    );
  });
}

type StaggeredParams = { delay?: number; stagger?: number; y?: number };

export function motionStaggered(node: HTMLElement, params?: StaggeredParams) {
  if (prefersReducedMotion() || isTouchDevice()) return;
  const p = { delay: 0, stagger: 0.08, y: 20, ...params };
  const children = Array.from(node.children) as HTMLElement[];

  children.forEach((child, i) => {
    inView(child, () => {
      animate(
        child,
        { opacity: [0, 1], transform: [`translateY(${p.y}px)`, 'translateY(0)'] },
        { duration: 0.5, delay: p.delay + p.stagger * i, easing: [0.16, 1, 0.3, 1] }
      );
    });
  });
}

export { animate, inView, scroll };
