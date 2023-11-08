import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Controls(
    { slideId, imageUrls, setCurrentTime  }:
        {
            slideId: number,
            imageUrls: string[],
            setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
        }
) {

    const navigate = useNavigate()

    const increment = () => {
        setCurrentTime(0)
        slideId === imageUrls.length - 1 ? navigate('/0') : navigate(`/${slideId + 1}`);
      };
    
      const decrement = () => {
        slideId === 0 ? navigate(`/${imageUrls.length - 1}`) : navigate(`/${slideId - 1}`);
        setCurrentTime(0)
      };

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