import {StudyButton} from "./study-button";


export function HeroSection() {
    return (
        <div className="min-h-screen -translate-y-1/12 flex flex-col justify-center text-center bg-background">
            <div>
                <span className="leading-9 text-8xl text-">Let&apos;s study!!</span>
            </div>
            <div className="my-4 leading-4">
                <p className="">
                    みんなでも、ひとりでも
                </p>
            </div>
            <div className="flex space-x-6 justify-center text-center">
                <StudyButton />
            </div>
        </div>
    )
}
