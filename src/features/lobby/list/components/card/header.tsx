
type Props = {
    children: React.ReactNode;
}

export default function CardHeader({children}: Props) {
    return (
        <div className="flex justify-between">
            {children}
        </div>
    )
}
