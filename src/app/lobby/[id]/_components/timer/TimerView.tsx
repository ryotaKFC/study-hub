import useTimer from "../../_hooks/useTimer";

export default function TimerView() {
    const time = useTimer();
    return (
        <h1 className='p-7 text-center text-8xl bg-emerald-100 rounded-xl text-emerald-900'>
            {time}
        </h1 >
    )
}   
