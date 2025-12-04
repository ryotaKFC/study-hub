import { getLobbies } from "@/features/lobby/actions/get-lobbies";
import LobbyList from "@/features/lobby/components/lobby-list";
import { NavigationBar } from "@/features/navigation-bar/components/navigation-bar";
import { createClient } from "@/lib/supabase/server";

type PageProps = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: PageProps) {
	const params = await searchParams;
	const inSchoolParam = params["inSchool"] === "true";

	const supabase = await createClient();
	const lobbiesPromise = getLobbies(supabase, inSchoolParam);

	return (
		<>
			<NavigationBar />
			<main>
				<div className="mx-auto my-8 text-center">
					<h1 className="font-bold m-4 text-center text-3xl sm:text-5xl">
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
