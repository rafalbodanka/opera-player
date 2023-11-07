import { Dot } from "lucide-react";

export default function Nav({
    imageUrls,
    slideId,
    setSlideId
}: {
    imageUrls: string[],
    slideId: number,
    setSlideId: React.Dispatch<React.SetStateAction<number>>;
}) {

    console.log(slideId)

    return (
        <div className="z-30 w-full fixed top-0 left-0 flex justify-center duration-500">
            <div className="flex gap-x-4 items-center justify-center">
                {imageUrls.map((url, id) => {
                    return (
                        <div key={url} className={`mt-4 relative cursor-pointer hover:scale-105 ${slideId === id && 'scale-105'} duration-100`}
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
        </div>
    )
}