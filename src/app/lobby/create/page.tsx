import { Navigation } from "@/components/navigation";
import Card from "@/components/ui/card";
import Form from "./_components/Form";
import GoogleMapAPIProvider from "@/lib/GoogleMaps/GoogleMapAPIProvider";


export default async function Page( {searchParams}: { searchParams: Promise<{[key: string]: string | undefined}>}) {
    const { isPrivate = "false"} = await searchParams;
    return (
        <div>
            <Navigation />
            <main>
                <h1 className="font-bold text-3xl text-center m-5">ロビーの作成</h1>
                <Card variant="background" className="mx-[3%] px-4 sm:mx-[20%] sm:px-10">
                    <GoogleMapAPIProvider>
                        <Form isPrivateParam={isPrivate === "true"} />
                    </GoogleMapAPIProvider>
                </Card>

                {/* <Card variant="background" className="mx-[3%] px-4 sm:mx-[10%] sm:px-10">
                    <h2 className="font-bold text-xl text-center">ロケーションの選択</h2>
                    <MapContent />
                </Card> */}
            </main>
        </div>
    )
}
