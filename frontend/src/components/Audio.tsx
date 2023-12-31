import { useEffect, useRef } from "react"
import { Play } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { Slide } from "../types/Slide";

export default function Audio({
  slideId,
  setAudioLength,
  setCurrentTime,
  imageUrls,
  isPlaying,
  setIsPlaying,
  isMuted,
  audioUrls,
  slideData,
  isStartVisible,
  setIsStartVisible
}: {
  slideId: number,
  setAudioLength: React.Dispatch<React.SetStateAction<number>>;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  imageUrls: string[];
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isMuted: boolean;
  audioUrls: string[];
  slideData: Slide[];
  isStartVisible: boolean;
  setIsStartVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const playRef = useRef<HTMLDivElement | null>(null)
  const audioVolume = useRef(1);
  const animationFrameRef = useRef(0);

  useEffect(() => {
    if (!audioRef.current || !slideData) return;
    setAudioVolumeSmoothly(1, 0, 1000, () => {
      if (audioRef.current) {
        audioRef.current.src = audioUrls[slideId];
        audioRef.current.addEventListener('loadedmetadata', () => {
          audioRef.current && setAudioLength(audioRef.current?.duration);
        });
      }
      setAudioVolumeSmoothly(0, 1, 1000, () => { });
    });
  }, [audioRef, slideId, slideData, audioUrls, setAudioLength]);

  useEffect(() => {
    audioRef.current && setCurrentTime(audioRef.current?.currentTime);
  }, [setCurrentTime])

  useEffect(() => {
    const currentAudioRef = audioRef.current;
    const updateCurrentTime = () => {
      if (currentAudioRef) {
        setCurrentTime(currentAudioRef.currentTime);
        requestAnimationFrame(updateCurrentTime);
      }
    };

    const animationFrameRefCurrent = animationFrameRef.current

    if (currentAudioRef) {
      currentAudioRef.addEventListener("play", updateCurrentTime);
      currentAudioRef.addEventListener("pause", () => {
        cancelAnimationFrame(animationFrameRefCurrent);
      });
    }

    return () => {
      if (currentAudioRef) {
        currentAudioRef.removeEventListener("play", updateCurrentTime);
        currentAudioRef.removeEventListener("pause", () => {
          cancelAnimationFrame(animationFrameRefCurrent);
        });
      }
    };
  }, [audioRef.current?.src, setCurrentTime]);

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

  const start = async () => {
    setIsPlaying(true)
    if (audioRef.current?.oncanplay) audioRef.current.play()
    setIsStartVisible(false)
  }

  const navigate = useNavigate()

  const increment = () => {
    setCurrentTime(0)
    slideId !== imageUrls.length - 1 && navigate(`/${slideId + 1}`);
  };

  useEffect(() => {
    if (!audioRef.current) return
    if (!isMuted) audioRef.current.muted = false
    if (isMuted) audioRef.current.muted = true
  }, [isMuted])

  useEffect(() => {
    const handleAction = async () => {
      try {
        if (!isPlaying) audioRef.current?.pause()
        if (isPlaying) await audioRef.current?.play()
      } catch (err) { }
    }
    handleAction()
  }, [isPlaying])

  return (
    <>
      <div
        data-testid='start-button'
        className={`w-screen fixed top-0 left-0 h-screen bg-black bg-opacity-70 flex justify-center items-center duration-500 z-50 ${!isStartVisible ? "fade-out" : "fade-in"}`}
        ref={playRef}
        onClick={start}>
        {isStartVisible && <Play size={96} color="white" className="cursor-pointer" />}
      </div>
      <div className="fixed bottom-0 flex justify-center w-screen z-20">
        <audio data-testid='audio-component' onEnded={increment} onEndedCapture={() => setIsPlaying(false)} autoPlay={!isStartVisible} onPlay={() => setIsPlaying(true)} ref={audioRef} muted={false}>
        </audio>
      </div>
    </>
  )
}