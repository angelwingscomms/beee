type ObserveOpts = { threshold?: number; once?: boolean };

export function observe(
	el: Element,
	{ threshold = 0.15, once = true }: ObserveOpts = {},
) {
	const io = new IntersectionObserver(
		([e]) => {
			if (!e.isIntersecting) return;
			el.classList.add('in-view');
			if (once) io.disconnect();
		},
		{ threshold },
	);
	io.observe(el);
	return {
		destroy() { io.disconnect(); },
	};
}
