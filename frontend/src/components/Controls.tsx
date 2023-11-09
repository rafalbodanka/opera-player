import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Controls(
    { slideId, imageUrls, setCurrentTime, setIsPlaying, setAudioLength }:
        {
            slideId: number,
            imageUrls: string[],
            setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
            setAudioLength: React.Dispatch<React.SetStateAction<number>>;
            setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
        }
) {

    const navigate = useNavigate()

    const increment = () => {
        setCurrentTime(0)
        setAudioLength(1000)
        slideId !== imageUrls.length - 1 && navigate(`/${slideId + 1}`);
    };

    const decrement = () => {
        navigate(`/${slideId - 1}`);
        setCurrentTime(0)
        setAudioLength(1000)
    };

    return (
        <div className="w-full h-full absolute top-0 left-0 flex justify-between items-center font-bold text-white z-20">
            {slideId !== 0 ?
                <div className="duration-500 bg-gray-800 px-8 bg-opacity-0 hover:bg-opacity-30 h-screen flex items-center justify-center cursor-pointer"
                    onClick={decrement}>
                    <ChevronLeftCircle color='lightGray'>
                        LEFT
                    </ChevronLeftCircle>
                </div>
                :
                <div className='w-0 h-0'>
                </div>
            }
            {
                imageUrls.length - 1 !== slideId &&
                <div className="duration-500 bg-gray-800 px-8 bg-opacity-0 hover:bg-opacity-30 h-screen flex items-center justify-center cursor-pointer"
                    onClick={increment}>
                    <ChevronRightCircle color='lightGray'>
                        RIGHT
                    </ChevronRightCircle>
                </div>
            }
        </div>
    )
}