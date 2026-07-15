import { fetchLobbyById } from "@/pages/lobby-detail/api/get-lobby-by-id";
import { LobbyProvider } from "@/pages/lobby-detail/model/lobby-provider";
import { LobbyDetail } from "@/pages/lobby-detail/ui/lobby-detail";
import { createClient } from "@/shared/api/supabase/server";
import { NavigationBar } from "@/widgets/navigation-bar/ui/navigation-bar";

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const supabase = await createClient();
	const lobbyPromise = fetchLobbyById(supabase, (await params).id);

	return (
		<div className="min-h-screen bg-emerald-50">
			<NavigationBar />
			<LobbyProvider lobbyPromise={lobbyPromise} previewMode={false}>
				<LobbyDetail />
			</LobbyProvider>
		</div>
	);
}
