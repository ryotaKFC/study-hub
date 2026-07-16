import { fetchLobbyById } from "@/_pages/lobby-detail/api/get-lobby-by-id";
import { LobbyDetailPage } from "@/_pages/lobby-detail/ui/lobby-detail-page";
import { createClient } from "@/shared/api/supabase/server";

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const supabase = await createClient();
	const lobbyPromise = fetchLobbyById(supabase, (await params).id);

	return <LobbyDetailPage lobbyPromise={lobbyPromise} previewMode={false} />;
}
