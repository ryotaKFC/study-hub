import { Home } from "@/_pages/home/ui/home";
import { NavigationBar } from "@/widgets/navigation-bar/ui/navigation-bar";

export default function Page() {
	return (
		<div className="relative min-h-screen">
			<NavigationBar />
			<Home />
		</div>
	);
}
