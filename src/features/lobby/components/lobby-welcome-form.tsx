"use client";

import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { goalSchema } from "../schemas";

type WelcomeFormProps = {
	setGoal: Dispatch<SetStateAction<string | null>>;
};

export function WelcomeForm({ setGoal }: WelcomeFormProps) {
	const [newGoal, setNewGoal] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		goalSchema.parse(newGoal);
		setGoal(newGoal);
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const validGoal = goalSchema.safeParse(e.target.value);

		if (validGoal.success) {
			setError(null);
			setNewGoal(validGoal.data);
		} else {
			setError(validGoal.error.issues[0].message);
		}
		setNewGoal(e.target.value);
	}

	return (
		<Dialog open={true}>
			<DialogContent
				onInteractOutside={(e) => {
					e.preventDefault();
				}}
				onEscapeKeyDown={(e) => {
					e.preventDefault();
				}}
				showCloseButton={false}
			>
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>自習部屋へようこそ！</DialogTitle>
						<DialogDescription>
							入る前に、あなたの作業内容を教えてください
						</DialogDescription>
						<div>
							<Label>作業内容</Label>
							<Input
								id="goal"
								value={newGoal}
								onChange={(e) => handleChange(e)}
								required
							/>
							{error && <p className="text-red-500 text-sm">{error}</p>}
						</div>
						<DialogFooter>
							<Button disabled={!!error || !newGoal.trim()} type="submit">
								送信する
							</Button>
						</DialogFooter>
					</DialogHeader>
				</form>
			</DialogContent>
		</Dialog>
	);
}
