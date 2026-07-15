import { NavigationBar } from "@/features/navigation-bar/components/navigation-bar";
import { Home } from "@/pages/home/ui/home";

export default function Page() {
	return (
		<div className="relative min-h-screen">
			<NavigationBar />
			<Home />
		</div>
	);
}
