import { getLobbies } from "@/_pages/lobby-list/api/get-lobbies";
import LobbyList from "@/_pages/lobby-list/ui/lobby-list";
import { createClient } from "@/shared/api/supabase/server";
import { NavigationBar } from "@/widgets/navigation-bar/ui/navigation-bar";

type PageProps = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: PageProps) {
	const params = await searchParams;
	const inSchoolParam = params.inSchool === "true";

	const supabase = await createClient();
	const lobbiesPromise = getLobbies(supabase, inSchoolParam);

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
					isInSchoolFilter={inSchoolParam}
				/>
			</main>
		</>
	);
}
