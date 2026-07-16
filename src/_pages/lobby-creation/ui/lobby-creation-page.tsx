import { Card } from "@/shared/ui/card";
import { NavigationBar } from "@/widgets/navigation-bar/ui/navigation-bar";
import LobbyForm from "./lobby-form";

type LobbyCreationPageProps = {
	isPrivate: boolean;
};

export function LobbyCreationPage({ isPrivate }: LobbyCreationPageProps) {
	return (
		<div>
			<NavigationBar />
			<main>
				<h1 className="font-bold text-3xl text-center mt-24 mb-4">
					ロビーの作成
				</h1>
				<Card className="mx-[3%] px-4 sm:mx-[20%] sm:px-10">
					<LobbyForm isPrivateParam={isPrivate} />
				</Card>
			</main>
		</div>
	);
}
