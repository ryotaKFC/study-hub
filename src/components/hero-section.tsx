import Link from "next/link";
import { Button } from "@/components/ui/button"
import {StudyButton} from "./study-button";


export function HeroSection() {
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
                <StudyButton />
            </div>
        </div>
    )
}
