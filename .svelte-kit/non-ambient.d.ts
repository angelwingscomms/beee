
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/api" | "/api/email" | "/api/email/confirm" | "/api/payment" | "/api/payment/initialize" | "/api/register" | "/api/registration" | "/api/send-email" | "/api/verify-payment" | "/api/webhooks" | "/api/webhooks/paystack" | "/payment" | "/payment/callback" | "/resource";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/api": Record<string, never>;
			"/api/email": Record<string, never>;
			"/api/email/confirm": Record<string, never>;
			"/api/payment": Record<string, never>;
			"/api/payment/initialize": Record<string, never>;
			"/api/register": Record<string, never>;
			"/api/registration": Record<string, never>;
			"/api/send-email": Record<string, never>;
			"/api/verify-payment": Record<string, never>;
			"/api/webhooks": Record<string, never>;
			"/api/webhooks/paystack": Record<string, never>;
			"/payment": Record<string, never>;
			"/payment/callback": Record<string, never>;
			"/resource": Record<string, never>
		};
		Pathname(): "/" | "/api/email/confirm" | "/api/payment" | "/api/payment/initialize" | "/api/register" | "/api/registration" | "/api/send-email" | "/api/verify-payment" | "/api/webhooks/paystack" | "/payment/callback";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}