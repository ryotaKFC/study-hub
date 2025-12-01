"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

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
