import { useEffect, useRef, useState } from "react"
import { Play } from "lucide-react"
import { useNavigate } from "react-router-dom";

export default function ({
    slideId,
    setAudioLength,
    setCurrentTime,
    imageUrls,
}: {
    slideId: number,
    setAudioLength: React.Dispatch<React.SetStateAction<number>>;
    setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
    imageUrls: string[];
}) {
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const playRef = useRef<HTMLDivElement | null>(null)
    const audioVolume = useRef(1); // Using a ref to store volume
    const animationFrameRef = useRef(0);

    useEffect(() => {
      if (!audioRef.current) return;
  
      setAudioVolumeSmoothly(1, 0, 1000, () => {
        if(audioRef.current)
        {
            audioRef.current.src = `./audio/${slideId}.mp3`;
            audioRef.current.addEventListener('loadedmetadata', () => {
                audioRef.current && setAudioLength(audioRef.current?.duration);
            });
        }
        setAudioVolumeSmoothly(0, 1, 1000, () => {});
        });
    }, [slideId]);

    useEffect(() => {
        audioRef.current && setCurrentTime(audioRef.current?.currentTime);
    }, [])

    useEffect(() => {
        const updateCurrentTime = () => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            requestAnimationFrame(updateCurrentTime);
          }
        };
    
        if (audioRef.current) {
          audioRef.current.addEventListener("play", updateCurrentTime);
          audioRef.current.addEventListener("pause", () => {
            cancelAnimationFrame(animationFrameRef.current);
        });
        }
    
        return () => {
          if (audioRef.current) {
            audioRef.current.removeEventListener("play", updateCurrentTime);
            audioRef.current.removeEventListener("pause", () => {
            cancelAnimationFrame(animationFrameRef.current);
            });
          }
        };
      }, [audioRef.current?.src]);

  const setAudioVolumeSmoothly = (
    fromVolume: number,
    toVolume: number,
    duration: number,
    onComplete: () => void
  ) => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) {
        startTimestamp = timestamp;
      }
      const timeElapsed = timestamp - startTimestamp;
      if (timeElapsed < duration) {
        const newVolume =
          fromVolume +
          (toVolume - fromVolume) * (timeElapsed / duration);
        audioVolume.current = newVolume;
        audioRef.current!.volume = newVolume;
        requestAnimationFrame(step);
      } else {
        audioVolume.current = toVolume;
        audioRef.current!.volume = toVolume;
        onComplete();
      }
    };
    requestAnimationFrame(step);
  };

    const start = () => {
        setIsPlaying(true)
        audioRef.current?.play()
    }

    const navigate = useNavigate()

    const increment = () => {
        slideId === imageUrls.length - 1 ? navigate('/0') : navigate(`/${slideId + 1}`);
      };

    return (
        <>
            <div
            className={`w-screen fixed top-0 left-0 h-screen bg-black bg-opacity-70 flex justify-center items-center duration-500 z-50 ${
            isPlaying ? "fade-out" : "fade-in"}`}
            ref={playRef}
            onClick={start}>
                <Play size={96} color="white" className="cursor-pointer" />
            </div>
            <div className="fixed bottom-0 flex justify-center w-screen z-20">
                <audio onEnded={increment} controls autoPlay ref={audioRef} muted={false}>
                    <source src={`./audio/0.mp3`} />
                </audio>
            </div>
        </>
    )
}