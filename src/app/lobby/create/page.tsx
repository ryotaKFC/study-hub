import { LobbyCreationPage } from "@/_pages/lobby-creation/ui/lobby-creation-page";

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
	const { isPrivate = false } = await searchParams;

	return <LobbyCreationPage isPrivate={isPrivate === "true"} />;
}
