import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
	return createBrowserClient(
		// biome-ignore lint/style/noNonNullAssertion: env vars are required at runtime
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		// biome-ignore lint/style/noNonNullAssertion: env vars are required at runtime
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
	);
}
