import { Dot, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Nav({
    imageUrls,
    slideId,
    setSlideId
}: {
    imageUrls: string[],
    slideId: number,
    setSlideId: React.Dispatch<React.SetStateAction<number>>;
}) {

    const [navExpanded, setNavExpanded] = useState(false)
    console.log(navExpanded)
    return (
        <div className="z-30 w-full fixed top-0 left-0 flex justify-center duration-500">
            <div className="h-[100px]"
            onMouseEnter={() => setNavExpanded(true)} onMouseLeave={()=> setNavExpanded(false)}>
                <div className={`${!navExpanded && '-translate-y-28'} duration-500  items-center justify-center`}>
                    <div className="flex gap-x-4">
                        {imageUrls.map((url, id) => {
                            return (
                                <div key={url} className={`mt-4 relative cursor-pointer hover:scale-105 duration-500`}
                                    onClick={() => setSlideId(id)}
                                >
                                    <img className="h-[100px] rounded-lg" src={url}
                                    />
                                    <div className="absolute bottom-0 w-full flex justify-center text-white">
                                        <Dot className="svg-shadow" size={32} color={slideId === id ? 'white' : 'gray'} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex justify-center items-center">
                        <ChevronDown width={24} className={`${navExpanded && '-rotate-180'} duration-500`}/>
                    </div>
                </div>
            </div>
        </div>
    )
}