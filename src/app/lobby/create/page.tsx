import { Navigation } from "@/components/navigation";
import { Card } from "@/components/ui/card";
import LobbyForm from "@/features/lobby/components/lobby-form";

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
	const { isPrivate = "false" } = await searchParams;
	return (
		<div>
			<Navigation />
			<main>
				<h1 className="font-bold text-3xl text-center m-5">ロビーの作成</h1>
				<Card className="mx-[3%] px-4 sm:mx-[20%] sm:px-10">
					<LobbyForm isPrivateParam={isPrivate === "true"} />
				</Card>
			</main>
		</div>
	);
}
