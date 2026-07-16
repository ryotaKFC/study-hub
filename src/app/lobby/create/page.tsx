import { LobbyCreationPage } from "@/_pages/lobby-creation/ui/lobby-creation-page";

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
	const { isPrivateParam } = await searchParams;

	return <LobbyCreationPage isPrivate={isPrivateParam === "true"} />;
}
