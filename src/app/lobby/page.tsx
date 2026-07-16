import { getLobbies } from "@/_pages/lobby-list/api/get-lobbies";
import { LobbyListPage } from "@/_pages/lobby-list/ui/lobby-list-page";
import { createClient } from "@/shared/api/supabase/server";

type PageProps = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: PageProps) {
	const params = await searchParams;
	const isInSchoolParam = params.inSchool === "true";

	const supabase = await createClient();
	const lobbiesPromise = getLobbies(supabase, isInSchoolParam);

	return (
		<LobbyListPage
			lobbiesPromise={lobbiesPromise}
			isInSchoolParam={isInSchoolParam}
		/>
	);
}
