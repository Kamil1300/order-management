"use client"

interface ButtonPropsTypes {
    name: string,
    isLoading?: boolean,
    onClick: React.MouseEventHandler<HTMLButtonElement>
    bgColor?: string,
    hover?: string
}

export const Btn = ({name, isLoading, onClick, bgColor, hover}:ButtonPropsTypes) => {
    return(
        <button disabled={isLoading} className={`${bgColor ? bgColor : "bg-[#FF6A3D]"} ${hover ? hover : "hover:bg-orange-400"} px-3 mt-4 rounded text-white ${isLoading &&"bg-orange-400"}`} onClick={onClick}>{isLoading ? "..." : name}</button>
    )
}