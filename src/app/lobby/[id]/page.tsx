import { Navigation } from "@/components/navigation";
import { fetchLobbyById } from "@/features/lobby/actions/get-lobby-by-id";
import { LobbyDetail } from "@/features/lobby/components/lobby-detail";
import { LobbyProvider } from "@/features/lobby/providers/lobby-provider";
import { createClient } from "@/lib/supabase/server";

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const supabase = await createClient();
	const lobbyPromise = fetchLobbyById(supabase, (await params).id);

	return (
		<div className="min-h-screen bg-emerald-50">
			<Navigation />
			<LobbyProvider lobbyPromise={lobbyPromise} previewMode={false}>
				<LobbyDetail />
			</LobbyProvider>
		</div>
	);
}
