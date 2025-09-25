import { Navigation } from "@/components/navigation";
import Card from "@/components/ui/card";
import Form from "./_components/Form";
import MapContent from "@/lib/google/MapContent";


export default async function Page( {searchParams}: { searchParams: Promise<{[key: string]: string | undefined}>}) {
    const { isPrivate = "false"} = await searchParams;
    return (
        <div>
            <Navigation />
            <main>
                <h1 className="font-bold text-3xl text-center m-5">ロビーの作成</h1>
                <Card variant="background" className="mx-[3%] px-10 sm:mx-[10%]">
                    <Form isPrivateParam={isPrivate === "true"} />
                </Card>

                <Card variant="background" className="mx-[3%] px-10 sm:mx-[10%]">
                    <h2 className="font-bold text-xl text-center">ロケーションの選択</h2>
                    <MapContent />
                </Card>

            </main>
        </div>
    )
}
