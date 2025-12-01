import { Navigation } from "@/components/navigation";
import { getLobbies } from "@/features/lobby/actions/get-lobbies";
import LobbyList from "@/features/lobby/components/lobby-list";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
	const supabase = await createClient();
	const lobbiies = await getLobbies(supabase, false);
	return (
		<>
			<Navigation />
			<main>
				<div className="mx-auto my-8 text-center">
					<h1 className="font-bold m-4 text-center text-3xl sm:text-5xl">
						みんなで自習
					</h1>
					<p>仲間と一緒に勉強しましょう！</p>
				</div>
				<LobbyList lobbiesInitial={lobbiies} />
			</main>
		</>
	);
}
