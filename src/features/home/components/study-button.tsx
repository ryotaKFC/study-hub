"use client";

import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { type MouseEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

// const CONFIRMATION_MESSAGE = "ログインせずに勉強しますか？\n(ログインすることで、みんなで勉強することができます)";

export function StudyButton() {
	const [user, setUser] = useState<User | null>(null);
	const supabaseClient = createClient();

	useEffect(() => {
		const getUser = async () => {
			const {
				data: { user },
			} = await supabaseClient.auth.getUser();
			setUser(user);
		};
		getUser();
	}, [supabaseClient.auth]);

	function handleClick(_e: MouseEvent<HTMLButtonElement>) {
		if (user) return;
		// if (!window.confirm(CONFIRMATION_MESSAGE)) {
		//     e.preventDefault()
		// }
	}

	return (
		<>
			<Link href="/lobby/create">
				<Button variant="outline" onClick={handleClick}>
					ロビーを作る
				</Button>
			</Link>
			<Link href="/lobby">
				<Button variant="default" onClick={handleClick}>
					ロビーを探す
				</Button>
			</Link>
		</>
	);
}
