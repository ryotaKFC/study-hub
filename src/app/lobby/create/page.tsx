import { Navigation } from "@/components/navigation";
import Card from "@/components/ui/card";
import Form from "./_components/Form";

type MainParams = {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Main({searchParams}: MainParams) {
    const isPrivate = searchParams.isPrivate === "true";
    return (
        <div>
            <Navigation />
            <main>
                <h1 className="font-bold text-3xl text-center m-5">ロビーの作成</h1>
                <Card>
                    <Form isPrivate={isPrivate} />
                </Card>
            </main>
        </div>
    )
}
