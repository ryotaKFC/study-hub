import { Home } from "@/features/home/components/home";
import { NavigationBar } from "@/features/navigation-bar/components/navigation-bar";

export default function Page() {
	return (
		<div className="relative min-h-screen">
			<NavigationBar />
			<Home />
		</div>
	);
}
