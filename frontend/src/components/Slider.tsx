import { useEffect, useRef, useState } from "react";
import Controls from "./Controls";
import Nav from "./Nav";
import Audio from "./Audio";
import { Slide } from "../types/Slide";

export default function Slider({
    slideData,
    slideId,
    imageUrls,
    setImageUrls,
    audioUrls,
    setAudioUrls,
}: {
    slideData: Slide[],
    slideId: number,
    imageUrls: string[],
    setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
    audioUrls: string[],
    setAudioUrls: React.Dispatch<React.SetStateAction<string[]>>;
}) {

    const imgRef = useRef<HTMLImageElement | null>(null)
    const [imgWidth, setImgWidth] = useState(0);
    const [imgHeight, setImgHeight] = useState(0);
    const [audioLength, setAudioLength] = useState<number>(0)
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [isMuted, setIsMuted] = useState<boolean>(false)
    const [isStartVisible, setIsStartVisible] = useState(true)

    useEffect(() => {
        // Function to handle window resize
        const handleResize = () => {
            if (imgRef.current) {
                imgRef.current.onload = () => {
                    if (imgRef.current) {
                        const width = imgRef.current.offsetWidth;
                        const height = imgRef.current.y;
                        setImgWidth(width);
                        setImgHeight(height);
                    }
                };
                const width = imgRef.current.offsetWidth;
                const height = imgRef.current.y;
                setImgWidth(width);
                setImgHeight(height);
            }
        };

        handleResize()
        // Add event listener for window resize
        window.addEventListener("resize", handleResize);
        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [imgRef, imgHeight, slideId]);

    return (
        <div className="h-screen overflow-hidden select-none">
            <Nav
                slideData={slideData}
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
                    <div key={index} className="relative w-screen h-screen overflow-hidden flex-shrink-0 duration-1000" style={{ translate: `${-100 * slideId}%` }}>
                        <img className="w-screen h-screen object-cover blur-md scale-105" src={imgUrl} alt={`Background Image ${index}`} />
                        <div className="absolute top-0 left-0 w-screen flex h-screen justify-center items-center">
                            <div className="relative">
                                {
                                    slideId === index ?
                                    <img data-testid='image' ref={imgRef} className="max-h-screen" src={imgUrl} alt={`Image ${index}`}/>
                                    :
                                    <img className="max-h-screen" src={imgUrl} alt={`Image ${index}`}/>
                                }
                                {
                                !isStartVisible &&
                                <div className="fade-in fade-out absolute bottom-0 left-0 text-white px-4 text-sm sm:text-2xl lg:text-3xl mb-2 md:mb-8 lg:mb-16 text-center pt-2 pb-4 bg-black bg-opacity-40 filter blur-t-md font-bold">
                                    <p>{slideData[index].text}</p>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Controls slideId={slideId} imageUrls={imageUrls} setCurrentTime={setCurrentTime} setIsPlaying={setIsPlaying} setAudioLength={setAudioLength}/>
            <Audio slideId={slideId} setAudioLength={setAudioLength} setCurrentTime={setCurrentTime} imageUrls={imageUrls}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                isMuted={isMuted}
                audioUrls={audioUrls}
                slideData={slideData}
                isStartVisible={isStartVisible}
                setIsStartVisible={setIsStartVisible}
            />
        </div>
    );
}