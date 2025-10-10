import Image from 'next/image';
import LoginButton from './login-button';
import Link from 'next/link';
import { Button } from './ui/button';
import { BookOpen } from 'lucide-react';


export function Navigation() {
    return (
        <nav className="flex justify-between items-center px-4 py-2 bg-background shadow-md border-b border-black sticky top-0 z-50">
            {/* logo */}
            <div className="flex items-center space-x-4">
                <Link href="/">
                    <Image src="../book.svg" alt="site icon" width={50} height={50} />
                </Link>
                <Link href="/">
                    <span className="text-xl flex">Study Hub</span>
                </Link>
            </div>

            <nav className='list-none hidden sm:flex'>
                <Link href={"/lobby/create"}>
                    <Button variant={"link"}>ロビーを作る</Button>
                </Link>
                <Link href={"/lobby/"}>
                    <Button variant={"link"}>ロビーを探す</Button>
                </Link>
            </nav>

            {/* ログイン */}
            <div className="w-40 text-center">
                <LoginButton />
            </div>
        </nav>
    )
}


