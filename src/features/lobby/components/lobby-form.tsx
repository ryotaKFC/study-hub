"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { createClient } from "@/lib/supabase/client";
import { createLobby } from "../actions/create-lobby";
import { creationLobySchema } from "../schemas";
import type { LobbyCreationDate } from "../types";

type Props = {
	isPrivateParam: boolean;
};

export default function LobbyForm({ isPrivateParam }: Props) {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitting },
		control,
		watch,
	} = useForm<LobbyCreationDate>({
		resolver: zodResolver(creationLobySchema),
		mode: "onChange",
		defaultValues: {
			lobbyName: "",
			startTime: "",
			studyMin: 25,
			breakMin: 5,
			isPrivate: isPrivateParam,
			isInSchool: false,
		},
	});

	const isInSchool = watch("isInSchool");
	const studyMin = watch("studyMin");
	const breakMin = watch("breakMin");

	async function onSubmit(data: LobbyCreationDate) {
		if (isSubmitting) return;

		const supabase = createClient();
		const newLobby = await createLobby(supabase, data);
		router.push(`/lobby/${newLobby?.lobbyId}`);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
			<label htmlFor="lobbyName" className="mx-auto">
				ロビー名
			</label>
			<Input className="text-center" {...register("lobbyName")} />
			{errors.lobbyName && (
				<p className="text-red-500 text-xs mx-auto">
					{errors.lobbyName.message}
				</p>
			)}

			<p className="mx-auto">
				勉強時間：
				{isInSchool ? "授業と同期されます" : `${studyMin}分`}
			</p>
			<Controller
				name="studyMin"
				control={control}
				render={({ field }) => (
					<Slider
						disabled={isInSchool}
						defaultValue={[25]}
						min={5}
						max={60}
						step={5}
						value={[field.value]}
						onValueChange={(vals) => field.onChange(Number(vals[0]))}
						className="mx-auto"
					/>
				)}
			/>

			<p className="mx-auto">
				休憩時間：
				{isInSchool ? "授業と同期されます" : `${breakMin}分`}
			</p>
			<Controller
				name="breakMin"
				control={control}
				render={({ field }) => (
					<Slider
						disabled={isInSchool}
						defaultValue={[25]}
						min={0}
						max={15}
						step={1}
						value={[field.value]}
						onValueChange={(vals) => field.onChange(Number(vals[0]))}
						className="mx-auto"
					/>
				)}
			/>

			<div className="flex justify-center space-x-2">
				<Controller
					name="isInSchool"
					control={control}
					render={({ field }) => (
						<Checkbox
							id="isInSchool"
							checked={field.value}
							onCheckedChange={field.onChange}
						/>
					)}
				/>
				<Label htmlFor="isInSchool">学校内のロビー</Label>
			</div>

			<div className="flex justify-center space-x-2">
				<Controller
					name="isPrivate"
					control={control}
					render={({ field }) => (
						<Checkbox
							id="isPrivate"
							checked={field.value}
							onCheckedChange={field.onChange}
						/>
					)}
				/>
				<Label htmlFor="isPrivate">ロビーの非公開</Label>
			</div>

			<Button type="submit" disabled={isSubmitting || !isValid}>
				作成
			</Button>
		</form>
	);
}
