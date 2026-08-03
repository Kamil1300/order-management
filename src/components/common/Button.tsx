"use client"

interface ButtonPropsTypes {
    name: string,
    isLoading: boolean,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

export const Btn = ({name, isLoading, onClick}:ButtonPropsTypes) => {
    return(
        <button disabled={isLoading} className={`bg-[#FF6A3D] px-3 mt-4 rounded hover:bg-orange-400 text-white ${isLoading &&"bg-orange-400"}`} onClick={onClick}>{isLoading ? "..." : name}</button>
    )
}