import {StudyButton} from "./study-button";


export function HeroSection() {
    return (
        <div>
            <div className="min-h-[calc(100vh-5rem)] flex flex-col justify-center text-center">
                <div>
                    <span className="leading-9 text-5xl sm:text-8xl">Let&apos;s study!!</span>
                </div>
                <div className="my-4 leading-4">
                    <p className="">
                        みんなで自習できる自習アプリ
                    </p>
                </div>
                <div className="flex space-x-6 justify-center text-center">
                    <StudyButton />
                </div>
                
                {/* <div className="text-center my-10">
                    <p>どういうアプリ？</p>
                </div> */}
            </div>
        </div>
        
    )
}
