"use client";

import {
	Clock as LastActivityAtIcon,
	Earth as OnlineLobbyIcon,
	School as SchoolLobbyIcon,
	Users as UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Lobby } from "@/features/lobby/types";
import { useTimer } from "@/features/timer/hooks/use-timer";
import { GetRelativeTime } from "@/lib/get-relative-time";

type Props = {
	lobby: Lobby;
};

export function LobbyCard({ lobby }: Props) {
	return (
		<Card key={lobby.lobbyId} className="mx-5 p-5">
			<CardHeader className="text-xl sm:text-2xl">
				<div className="flex justify-between">
					<h1>{lobby.lobbyName}</h1>
					<NowModeBadge lobby={lobby} />
				</div>
				<div className="flex space-x-2">
					{lobby.isInSchool ? (
						<SchoolLobbyIcon className="h-5 w-4" />
					) : (
						<OnlineLobbyIcon className="h-5 w-4" />
					)}
					<p className="text-sm font-bold text-gray-600">
						{lobby.isInSchool ? "学校ロビー" : "オンラインロビー"}
					</p>
				</div>
			</CardHeader>

			<CardContent>
				<div className="flex flex-col">
					<div className="flex justify-between mb-1">
						<div className="flex space-x-2">
							<UsersIcon className="h-7 w-4" />
							<p>{lobby.memberCount} 人</p>
						</div>
						<div className="flex space-x-2">
							<LastActivityAtIcon className="h-7 w-4" />
							<p>{GetRelativeTime(new Date(lobby.lastActivityAt))}</p>
						</div>
					</div>
					<div className="flex justify-between">
						<p>自習時間:</p>
						<p>{lobby.isInSchool ? "授業と同期" : lobby.studyMin + " 分"}</p>
					</div>
					<div className="flex justify-between">
						<p>休み時間:</p>
						<p>{lobby.isInSchool ? "授業と同期" : lobby.breakMin + " 分"}</p>
					</div>
					<div className="flex justify-between">
						<p>開始時間:</p>
						<p>{GetRelativeTime(new Date(lobby.startTime))}</p>
					</div>
				</div>
			</CardContent>

			<CardFooter>
				<Link href={`/lobby/${lobby.lobbyId}`} className="w-full">
					<Button className="w-full">参加</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}

function NowModeBadge({ lobby }: { lobby: Lobby }) {
	const { isStudyTime } = useTimer(lobby);
	return (
		<Card
			className={`text-sm font-bold p-1 rounded-sm ${isStudyTime ? "bg-red-100/50" : "bg-lime-100/50"}`}
		>
			{isStudyTime ? "勉強中" : "休憩中"}
		</Card>
	);
}
