import {StudyButton} from "./study-button";


export function HeroSection() {
    return (
        <div className="min-h-screen -translate-y-1/12 flex flex-col justify-center text-center">
            <div>
                <span className="leading-9 text-5xl sm:text-8xl">Let&apos;s study!!</span>
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
