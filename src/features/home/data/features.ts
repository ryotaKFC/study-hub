import { Feature } from "../types";

export const features: Feature[] = [
	{
		featureName: "1. ポモドーロタイマー",
		title: "集中が続く効率のよい勉強サイクル",
		description:
			"25分勉強⇔5分休憩のサイクルで、効率よく学習を進められます。自分に合った時間にカスタマイズすることもできるので、無理なく継続できる学習習慣を身につけられます<br />また、授業の時間とタイマーを同期させることで、授業中の集中力をアップすることもできます",
		imagePath: "/preview-timer.png",
		altText: "ポモドーロタイマーのプレビュー画像",
	},
	{
		featureName: "2. ロビー機能",
		title: "仲間と一緒に学習",
		description:
			"1人では集中が続かないときも、ロビーに参加すれば仲間と一緒に学習できます。目標を共有しながら取り組むことで、モチベーションを高め合えます",
		imagePath: "/preview-member.png",
		altText: "ロビー機能のプレビュー画像",
	},
	{
		featureName: "3. チャット",
		title: "休憩中の過ごし方",
		description:
			"休憩時間にチャット機能を使って仲間とコミュニケーションを取ることで、リラックスしながら学習のモチベーションを維持できます。",
		imagePath: "/preview-chat.png",
		altText: "チャット機能のプレビュー画像",
	},
	{
		featureName: "実装予定の機能",
		title: "さらに便利に学習をサポート",
		description:
			"今後、SNSを実装して仲間とつながったり、今の勉強内容や進捗を共有したりできるようにする予定です<br />また、勉強の進捗を可視化するダッシュボード機能も追加予定で、自己管理をより効果的にサポートします",
		imagePath: "",
		altText: "",
	},
];
