"use server";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import type { Feature } from "../types";
import { features } from "./features";
import { StudyButton } from "./study-button";

export async function HeroSection() {
	return (
		<div className="space-y-24">
			<section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center text-center">
				<div>
					<span className="leading-9 text-5xl sm:text-8xl">
						Let&apos;s study!!
					</span>
				</div>
				<div className="my-4 leading-4">
					<p>みんなで自習できる自習アプリ</p>
				</div>
				<div className="flex space-x-6 justify-center text-center">
					<StudyButton />
				</div>
			</section>
			<section className="space-y-7 px-4 sm:px-25 text-center">
				<h1 className="font-bold text-5xl">どういうアプリ？</h1>
				<Card>
					<CardHeader>
						<span className="font-bold text-xl">
							みんなで自習できる自習アプリ！
						</span>
					</CardHeader>
					<CardContent className="">
						<p>
							このアプリは、1人でも仲間と一緒でも使えるオンライン自習スペースです
						</p>
						<p>
							ポモドーロタイマーやロビー機能、チャットを活用して、集中と休憩のメリハリをつけながら楽しく学習を続けられます
						</p>
					</CardContent>
				</Card>
			</section>
			<section className="space-y-7 px-4 sm:px-25 text-center">
				<h1 className="font-bold text-5xl">機能の紹介</h1>
				{features.map((feature) => (
					<FeaturesSection key={feature.featureName} feature={feature} />
				))}
			</section>
		</div>
	);
}

function FeaturesSection({ feature }: { feature: Feature }) {
	return (
		<Card>
			<CardHeader>
				<h2 className="font-bold text-3xl ">{feature.featureName}</h2>
			</CardHeader>
			<CardContent>
				<div className=" m-4 lg:mx-30">
					{feature.imagePath && (
						<Image
							className="shadow-xl w-full rounded-xl"
							src={feature.imagePath}
							alt={feature.altText}
							width={700}
							height={200}
						/>
					)}
				</div>
				<span className="font-bold">{feature.title}</span>
				<p>{feature.description}</p>
			</CardContent>
		</Card>
	);
}
