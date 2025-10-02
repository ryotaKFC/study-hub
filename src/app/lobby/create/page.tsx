import { Navigation } from "@/components/navigation";
import Card from "@/components/ui/card";
import LobbyForm from "@/features/lobby/create/lobby-form";
import MapProvider from "@/features/maps/MapProvider";


export default async function Page( {searchParams}: { searchParams: Promise<{[key: string]: string | undefined}>}) {
    const { isPrivate = "false"} = await searchParams;
    return (
        <div>
            <Navigation />
            <main>
                <h1 className="font-bold text-3xl text-center m-5">ロビーの作成</h1>
                <Card variant="background" className="mx-[3%] px-4 sm:mx-[20%] sm:px-10">
                    <MapProvider>
                        <LobbyForm isPrivateParam={isPrivate === "true"} />
                    </MapProvider>
                </Card>

                {/* <Card variant="background" className="mx-[3%] px-4 sm:mx-[10%] sm:px-10">
                    <h2 className="font-bold text-xl text-center">ロケーションの選択</h2>
                    <MapContent />
                </Card> */}
            </main>
        </div>
    )
}
