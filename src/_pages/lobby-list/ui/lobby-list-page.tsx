import type { Lobby } from "@/entities/lobby/types";
import { NavigationBar } from "@/widgets/navigation-bar/ui/navigation-bar";
import LobbyList from "./lobby-list";

type LobbyListPageProps = {
	lobbiesPromise: Promise<Lobby[]>;
	isInSchoolParam: boolean;
};

export async function LobbyListPage({
	lobbiesPromise,
	isInSchoolParam,
}: LobbyListPageProps) {
	return (
		<>
			<NavigationBar />
			<main>
				<div className="mx-auto my-8 text-center">
					<h1 className="font-bold mt-24 text-center text-3xl sm:text-5xl">
						みんなで自習
					</h1>
					<p>仲間と一緒に勉強しましょう！</p>
				</div>
				<LobbyList
					lobbiesPromise={lobbiesPromise}
					isInSchoolFilter={isInSchoolParam}
				/>
			</main>
		</>
	);
}
