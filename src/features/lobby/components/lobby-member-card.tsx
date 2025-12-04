"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/features/auth/auth-provider";
import { useLobby } from "../providers/lobby-provider";

export default function LobbyMemberCard() {
	const { user } = useAuth();
	const { previewMode, members } = useLobby();

	if (!user && !previewMode) return null;

	return (
		<Card className="sm:px-10">
			<CardHeader>
				<h1 className="text-xl font-bold bg-emerald-800 bg-clip-text text-transparent">
					👥参加者
				</h1>
			</CardHeader>
			<CardContent>
				<ul className="px-7">
					{members.map((member) => (
						<li
							key={member.userId}
							className="text-emerald-900 list-none flex flex-row text-xl"
						>
							<p>
								{member.displayName}：{member.userGoal}
							</p>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
}
