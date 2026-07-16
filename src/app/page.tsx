import { HomePage } from "@/_pages/home/ui/home-page";
import { NavigationBar } from "@/widgets/navigation-bar/ui/navigation-bar";

export default function Page() {
	return (
		<div className="relative min-h-screen">
			<NavigationBar />
			<HomePage />
		</div>
	);
}
