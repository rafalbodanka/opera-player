import { ChevronLeftCircle } from "lucide-react";
import { ChevronRightCircle } from "lucide-react";

export default function Controls(
    { slideId, setSlideId }:
        {
            slideId: number,
            setSlideId: React.Dispatch<React.SetStateAction<number>>
        }
) {

    const increment = () => {
        slideId === 3 ? setSlideId(0) : setSlideId(prev => prev + 1)
    }

    const decrement = () => {
        slideId === 0 ? setSlideId(3) : setSlideId(prev => prev - 1)
    }

    return (
        <div className="w-full h-full absolute top-0 left-0 flex justify-between items-center font-bold text-white z-20">
            <div className="duration-500 bg-gray-800 px-8 bg-opacity-0 hover:bg-opacity-30 h-screen flex items-center justify-center cursor-pointer"
             onClick={decrement}>
                <ChevronLeftCircle color='lightGray'>
                    LEFT
                </ChevronLeftCircle>
            </div>
            <div className="duration-500 bg-gray-800 px-8 bg-opacity-0 hover:bg-opacity-30 h-screen flex items-center justify-center cursor-pointer"
             onClick={increment}>
                <ChevronRightCircle color='lightGray'>
                    RIGHT
                </ChevronRightCircle>
            </div>
        </div>
    )
}