import { Pause, Play, Volume2, VolumeX } from "lucide-react";

export default function Nav({
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

    const playedDistance = currentTime / audioLength

    return (
        <div className="z-30 w-screen fixed left-0" style={{ top: imgHeight }}>
            <div className="flex justify-center duration-500">
                <div className={`mt-4 h-[20px] flex justify-between`} style={{ width: imgWidth - 24 }}>
                    {imageUrls.map((img, id) => {
                        return (
                            <div key={img} className="relative w-24">
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