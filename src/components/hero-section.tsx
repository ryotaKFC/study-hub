'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button"
import type { MouseEvent } from "react";

const confirmationMessage = "ログインせずに勉強しますか？\n(ログインすることで、あなたの自習の記録が残ります)";

export function HeroSection() {

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        const isConfirmed = window.confirm(confirmationMessage);
        if (!isConfirmed) {
            e.preventDefault();
        }
    }
    return (
        <div className="min-h-screen -translate-y-1/12 flex flex-col justify-center text-center bg-background">
            <div>
                <span className="leading-9 text-8xl">aaaa<br />aaaaaa</span>
            </div>
            <div className="my-4 leading-7">
                <p className="">
                    ここに説明文ああああああああああああああああああああああああああああああああ<br />
                    ああああああああああああああああああああああああ。
                </p>
            </div>
            <div className="flex space-x-6 justify-center text-center">
                <Link href="/home">
                    <Button variant="default" onClick={handleClick}>
                        一人で勉強！
                    </Button>
                </Link>
                <Link href="/home">
                    <Button variant="outline" onClick={handleClick}>みんなで勉強！</Button>
                </Link>
            </div>
        </div>
    )
}
