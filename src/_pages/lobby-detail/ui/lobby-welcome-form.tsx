"use client";

import {
	type Dispatch,
	type FormEvent,
	type SetStateAction,
	useState,
} from "react";
import { goalSchema } from "@/features/lobby/schemas";
import { Button } from "@/shared/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

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
