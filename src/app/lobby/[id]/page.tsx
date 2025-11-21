import { Navigation } from "@/components/navigation";
import { fetchLobbyById } from "@/features/lobby/actions/get-lobby-by-id";
import LobbyChat from "@/features/lobby/components/lobby-detail/lobby-chat";
import LobbyMember from "@/features/lobby/components/lobby-detail/lobby-member";
import LobbyTimer from "@/features/lobby/components/lobby-detail/lobby-timer";
import Tips from "@/features/lobby/components/lobby-detail/lobby-tips";
import LobbyTitle from "@/features/lobby/components/lobby-detail/lobby-title";
import { WelcomeForm } from "@/features/lobby/components/lobby-detail/lobby-welcome-form";
import { LobbyProvider } from "@/features/lobby/providers/lobby-provider";
import { createClient } from "@/lib/supabase/server";

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const supabase = await createClient();
	const lobby = await fetchLobbyById(supabase, (await params).id);

	return (
		<LobbyProvider lobby={lobby} previewMode={false}>
			<WelcomeForm />
			<div className="min-h-screen bg-emerald-50">
				<Navigation />
				<main className="mx-5 sm:mx-14 my-7 space-y-5">
					<LobbyTitle />
					<LobbyTimer />
					<LobbyChat />
					<LobbyMember />
					<Tips />
				</main>
			</div>
		</LobbyProvider>
	);
}
