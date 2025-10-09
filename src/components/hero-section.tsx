"use server"

import {StudyButton} from "./study-button";
import { Card, CardContent, CardHeader } from "./ui/card";
import Image from 'next/image';


export async function HeroSection() {
    return (
        <div>
            <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center text-center">
                <div>
                    <span className="leading-9 text-5xl sm:text-8xl">Let&apos;s study!!</span>
                </div>
                <div className="my-4 leading-4">
                    <p className="">
                        みんなで自習できる自習アプリ
                    </p>
                </div>
                <div className="flex space-x-6 justify-center text-center">
                    <StudyButton />
                </div>
                
                {/* <div className="text-center my-10">
                    <p>どういうアプリ？</p>
                </div> */}
            </section>
            <section className="space-y-7 px-4 sm:px-25 text-center">
                <h1 className="font-bold text-5xl">どういうアプリ？</h1>
                <Card>
                    <CardHeader>
                        <h2 className="font-bold text-3xl ">1. ポモドーロタイマー</h2>
                    </CardHeader>
                    <CardContent>
                        <div className="mx-30 my-4">
                            <Image className="shadow-xl w-full rounded-xl" src="/preview-timer.png" alt="preview timre" width={700} height={700} />
                        </div>
                        <span className="font-bold">25分勉強⇔5分休憩のサイクル</span>
                        <p>ポモドーロとは、こまめに休憩を挟むことで、時間の使い方を意識しつつ集中力を維持しながら生産性を上げる効果のある手法です</p>
                        <p>このサイトでは、従来の25分勉強⇔5分休憩だけでなく、好きな時間に設定することもできます</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <h2 className="font-bold text-3xl ">2. ロビー機能</h2>
                    </CardHeader>
                    <CardContent>
                        <div className="mx-30 my-4">
                            <Image className="shadow-xl w-full rounded-xl" src="/preview-timer.png" alt="preview timre" width={700} height={700} />
                        </div>
                        <span className="font-bold">25分勉強⇔5分休憩のサイクル</span>
                        <p>ポモドーロとは、こまめに休憩を挟むことで、時間の使い方を意識しつつ集中力を維持しながら生産性を上げる効果のある手法です</p>
                        <p>このサイトでは、従来の25分勉強⇔5分休憩だけでなく、好きな時間に設定することもできます</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <h2 className="font-bold text-3xl ">3. チャット機能</h2>
                    </CardHeader>
                    <CardContent>
                        <div className="mx-30 my-4">
                            <Image className="shadow-xl w-full rounded-xl" src="/preview-chat.png" alt="preview timre" width={700} height={700} />
                        </div>
                        <p>休憩時間中、周りの人</p>
                    </CardContent>
                </Card>
            </section>
        </div>
        
    )
}
