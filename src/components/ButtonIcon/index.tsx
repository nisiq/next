import { ReactNode } from 'react'

interface IButtonIcon {
    title: string
    color: string
    onClick: () => void
    icon: ReactNode
    colorHover: string
}

export default function ButtonIcon({ title, color, onClick, icon, colorHover }: IButtonIcon) {

    return (
        <button className="flex flex-row w-auto h-auto font-medium my-2" onClick={onClick}>
            <div className={`${color} flex items-center justify-center p-2 px-3 gap-1 content-center rounded ${colorHover}`}>
                {icon}
                <h1 className='text-center text-white font-inter '>
                    {title}
                </h1>
            </div>
        </button >
    )
}
