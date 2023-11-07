import { useEffect, useRef, useState } from "react";
import Controls from "./Controls";
import Nav from "./Nav";
import Audio from "./Audio";

export default function Slider({
    slideId,
    imageUrls,
}:{
    slideId: number,
    imageUrls: string[]
}) {

    const imgRef = useRef<HTMLImageElement | null>(null)
    const [imgWidth, setImgWidth] = useState(0);
    const [imgHeight, setImgHeight] = useState(0);
    const [audioLength, setAudioLength] = useState<number>(0)
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [isMuted, setIsMuted] = useState<boolean>(false)

    useEffect(() => {
        // Function to handle window resize
        const handleResize = () => {
            if (imgRef.current) {
                const width = imgRef.current.offsetWidth;
                const height = imgRef.current.y;
                setImgWidth(width);
                setImgHeight(height);
            }
        };

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);
        window.addEventListener("load", handleResize)

        // Initial width calculation
        if (imgRef.current) {
            const width = imgRef.current.offsetWidth;
            const height = imgRef.current.y;

            setImgWidth(width);
            setImgHeight(height);
        }

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("load", handleResize);
        };
    }, [imgHeight]);
    
    return (
        <div className="h-screen overflow-hidden select-none">
            <Nav
                imageUrls={imageUrls}
                slideId={slideId}
                imgWidth={imgWidth}
                imgHeight={imgHeight}
                audioLength={audioLength}
                currentTime={currentTime}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                setCurrentTime={setCurrentTime}
                isMuted={isMuted}
                setIsMuted={setIsMuted}
                />
            <div className="flex">
                {imageUrls.map((imgUrl, index) => (
                    <div key={imgUrl} className="relative w-screen h-screen overflow-hidden flex-shrink-0 duration-1000" style={{ translate: `${-100 * slideId}%` }}>
                        <img className="w-screen h-screen object-cover blur-md scale-105" src={imgUrl} alt={`Background Image ${index}`} />
                        <div className="absolute top-0 left-0 w-screen flex h-screen justify-center items-center">
                            <img ref={imgRef} className="max-h-screen" src={imgUrl} alt={`Image ${index}`} />
                        </div>
                    </div>
                ))}
            </div>
            <Controls slideId={slideId} imageUrls={imageUrls} />
            <Audio slideId={slideId} setAudioLength={setAudioLength} setCurrentTime={setCurrentTime} imageUrls={imageUrls}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying} 
                isMuted={isMuted}/>
        </div>
    );
}