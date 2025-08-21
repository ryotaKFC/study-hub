import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { Link } from 'next/link';

export function Navigation() {
    return (
        <nav className=" flex justify-between items-center px-4 py-2 bg-background border-b border-black sticky top-0 z-50">
            {/* logo */}
            <div className="flex items-center space-x-4">
                <Image src="book.svg" alt="site icon" width={50} height={50} />
                <span className="text-xl hidden sm:inline">Study Hub</span>
            </div>
            {/* リンク */}
            <div className="hidden sm:inline">
                <Button variant="link">ホーム</Button>
                <Button variant="link">ホーム</Button>
                <Button variant="link">ホーム</Button>
            </div>

            {/* ログイン */}
            <div className="w-40 text-center">
                <a href="">Google ログイン</a>
            </div>
        </nav>
    )
}


