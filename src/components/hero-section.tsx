"use server"

import {StudyButton} from "./study-button";
import { Card, CardContent, CardHeader } from "./ui/card";
import Image from 'next/image';


export async function HeroSection() {
    return (
        <div className="space-y-24">
            <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center text-center">
                <div>
                    <span className="leading-9 text-5xl sm:text-8xl">Let&apos;s study!!</span>
                </div>
                <div className="my-4 leading-4">
                    <p>みんなで自習できる自習アプリ</p>
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
                        <span className="font-bold text-xl">みんなで自習できる自習アプリ！</span>
                    </CardHeader>
                    <CardContent className="">
                        <p>このアプリは、1人でも仲間と一緒でも使えるオンライン自習スペースです</p>
                        <p>ポモドーロタイマーやロビー機能、チャットを活用して、集中と休憩のメリハリをつけながら楽しく学習を続けられます</p>
                    </CardContent>
                </Card>

            </section>
            <section className="space-y-7 px-4 sm:px-25 text-center">
                <h1 className="font-bold text-5xl">機能の紹介</h1>
                <Card>
                    <CardHeader>
                        <h2 className="font-bold text-3xl ">1. ポモドーロタイマー</h2>
                    </CardHeader>
                    <CardContent>
                        <div className="m-4 lg:mx-30">
                            <Image className="shadow-xl w-full rounded-xl" src="/preview-timer.png" alt="preview timre" width={700} height={700} />
                        </div>
                        <span className="font-bold">集中が続く効率のよい勉強サイクル</span>
                        <p>
                            25分勉強⇔5分休憩のサイクルで、効率よく学習を進められます。自分に合った時間にカスタマイズすることもできるので、無理なく継続できる学習習慣を身につけられます
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <h2 className="font-bold text-3xl ">2. ロビー機能</h2>
                    </CardHeader>
                    <CardContent>
                        <div className=" m-4 lg:mx-30">
                            <Image className="shadow-xl w-full rounded-xl" src="/preview-member.png" alt="preview timre" width={700} height={700} />
                        </div>
                        <span className="font-bold">仲間と一緒に学習</span>
                        <p>
                            1人では集中が続かないときも、ロビーに参加すれば仲間と一緒に学習できます。目標を共有しながら取り組むことで、モチベーションを高め合えます
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <h2 className="font-bold text-3xl ">3. チャット</h2>
                    </CardHeader>
                    <CardContent>
                        <div className="m-4 lg:mx-30">
                            <Image className="shadow-xl w-full rounded-xl" src="/preview-chat.png" alt="preview timre" width={700} height={700} />
                        </div>
                        <span className="font-bold">休憩中の過ごし方</span>
                        <p>
                            勉強の合間にはリフレッシュも大切。休憩時間だけ解放されるチャットで、仲間と気軽に雑談したり励まし合ったりできます。
                        </p>
                    </CardContent>
                </Card>
            </section>
        </div>
        
    )
}
