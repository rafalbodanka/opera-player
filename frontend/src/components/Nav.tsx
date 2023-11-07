import { Dot, ChevronDown, Minus } from "lucide-react";
import { useState } from "react";

export default function Nav({
    imageUrls,
    slideId,
}: {
    imageUrls: string[],
    slideId: number,
}) {

    return (
        <div className="z-30 w-screen fixed top-0 left-0 flex justify-center duration-500">
            <div className="mt-8 h-[20px] flex w-full justify-between mx-16">
                {imageUrls.map((img, id) => {
                    return (
                        <div key={img} className={`flex-1 h-[2px] ${id <= slideId ? 'bg-white' : 'bg-gray-400'} mr-[2px]`}>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}