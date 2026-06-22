type ObserveOpts = { threshold?: number; once?: boolean; exit?: boolean; className?: string };

export function observe(
	el: Element,
	{ threshold = 0.15, once = true, exit = false, className = 'in-view' }: ObserveOpts = {},
) {
	const exitClass = `${className}-exit`;
	const io = new IntersectionObserver(
		([e]) => {
			if (e.isIntersecting) {
				el.classList.add(className);
				el.classList.remove(exitClass);
				if (once) io.disconnect();
			} else if (exit) {
				if (!once) {
					el.classList.remove(className);
					el.classList.add(exitClass);
				}
			}
		},
		{ threshold },
	);
	io.observe(el);
	return {
		destroy() { io.disconnect(); },
	};
}
