"use client";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { useLobbyList } from "@/_pages/lobby-list/api/use-lobby-list";
import { LobbyCard } from "@/_pages/lobby-list/ui/lobby-card";
import type { Lobby } from "@/features/lobby/types";
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";

type LobbyListProps = {
	lobbiesPromise: Promise<Lobby[]>;
	isInSchoolFilter: boolean;
};

export default function LobbyList({
	lobbiesPromise,
	isInSchoolFilter,
}: LobbyListProps) {
	const lobbies = use(lobbiesPromise);
	const { handleSchoolFilterChange } = useLobbyList(isInSchoolFilter);

	return (
		<>
			<LobbyListController
				isInSchoolFilter={isInSchoolFilter}
				handleSchoolFilterChange={handleSchoolFilterChange}
			/>
			<div className="px-4 grid grid-cols-1 sm:px-8 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{lobbies?.map((lobby) => (
					<LobbyCard key={lobby.lobbyId} lobby={lobby} />
				))}
			</div>
		</>
	);
}

type LobbyListControllerProps = {
	isInSchoolFilter: boolean;
	handleSchoolFilterChange: () => void;
};

export function LobbyListController({
	isInSchoolFilter,
	handleSchoolFilterChange,
}: LobbyListControllerProps) {
	return (
		<div className="flex flex-col justify-center items-center my-5 space-y-4">
			<div className="space-x-4 ">
				<Link href="/lobby/create">
					<Button className="inline-block align-middle hover:cursor-pointer">
						ロビーの作成
					</Button>
				</Link>
				<Button
					onClick={() => location.reload()}
					variant={"outline"}
					className="inline-block align-middle hover:cursor-pointer"
				>
					<Image src="/reload.svg" alt="reload icon" width={20} height={20} />
				</Button>
			</div>
			<div className="flex space-x-2">
				<Label htmlFor="school-filter-switch">学校内のロビーのみ表示</Label>
				<Switch
					id="school-filter-switch"
					checked={isInSchoolFilter}
					onCheckedChange={handleSchoolFilterChange}
				/>
			</div>
		</div>
	);
}
