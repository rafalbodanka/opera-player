import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { Slide } from "../types/Slide";

export default function Nav({
    slideData,
    imageUrls,
    slideId,
    imgHeight,
    imgWidth,
    audioLength,
    currentTime,
    setCurrentTime,
    isPlaying,
    setIsPlaying,
    isMuted,
    setIsMuted,
}: {
    slideData: Slide[],
    imageUrls: string[],
    slideId: number,
    imgHeight: number,
    imgWidth: number,
    audioLength: number,
    currentTime: number,
    setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
    isPlaying: boolean;
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    isMuted: boolean;
    setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
}) {

    const [playedDistance, setPlayedDistance] = useState(currentTime / audioLength)

    useEffect(() => {
        setPlayedDistance(currentTime/audioLength)
    }, [currentTime, audioLength])

    return (
        <div data-testid='nav' className="z-30 w-screen fixed left-0" style={{ top: imgHeight }}>
            <div className="flex justify-center duration-500">
                <div className={`mt-4 h-[20px] flex justify-between`} style={{ width: imgWidth - 24 }}>
                    {imageUrls.map((img, id) => {
                        return (
                            <div data-testid='bar' key={id} className="relative w-24">
                                <div className={`flex-1 h-[2px] ${id < slideId ? 'bg-white' : 'bg-gray-400'} mr-[2px]`}>
                                </div>
                                {id === slideId && <div className="absolute top-0 left-0 bg-white h-[2px] mr-[2px]" style={{ width: `${playedDistance * 100}%` }}>
                                </div>}
                            </div>
                        )
                    })}
                </div>
                <div>
                </div>
            </div>
            <div className="flex w-full justify-center">
                <div className="flex justify-end gap-2 mr-6" style={{ width: imgWidth - 24 }}>
                    <div className="p-1 cursor-pointer" onClick={() => setIsPlaying(prev => !prev)}>
                        {!isPlaying ? <Play color="#fdfdfd" /> : <Pause color="#fdfdfd" />}
                    </div>
                    <div className="p-1 cursor-pointer" onClick={() => setIsMuted(prev => !prev)}>
                        {!isMuted ? <Volume2 color="#fdfdfd" /> : <VolumeX color="#fdfdfd"/>}
                    </div>
                </div>
            </div>
        </div>
    )
}