import { useAuth } from "@/entities/user/model/auth-provider";

export default function LobbyTips() {
	const { user } = useAuth();

	if (!user) {
		return (
			<div className="m-6 text-center">
				Tips:ログインすることで、みんなと交流することができます！
			</div>
		);
	}
}
