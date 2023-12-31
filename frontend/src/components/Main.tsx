import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "./Slider";
import useGetSlidesData from "../hooks/useGetSlidesData";

export default function Main() {

    const [slideId, setSlideId] = useState<number | null>(null)
    const [imageUrls, setImageUrls] = useState<string[]>([])
    const [audioUrls, setAudioUrls] = useState<string[]>([])

    const params = useParams()
    const paramId = Number(params.slideId)

    const slideData = useGetSlidesData()

    useEffect(() => {
        if (!slideData || slideData.length === 0) return
        if (isNaN(paramId) || paramId > slideData.length - 1) {
            window.location.replace('/0')
        }
        setSlideId(paramId)
        if (imageUrls.length < 1) {
            setImageUrls(Array.from({ length: slideData.length }, () => ''))
            setAudioUrls(Array.from({ length: slideData.length }, () => ''))
        }
    }, [paramId, slideData, imageUrls])

    useEffect(() => {
        if (!slideData || slideId === null) return
        const img: string[] = imageUrls
        const audio: string[] = audioUrls
        slideData.forEach((slide, id) => {
            if (id === slideId) {
                if (!img.includes(slide.imageURL)) {
                    img[slideId] = slide.imageURL
                }
                if (!audio.includes(slide.audioURL)) {
                    audio[slideId] = slide.audioURL
                }
                const prevImg = id === 0 ? null : slideData[id - 1].imageURL
                const prevAudio = id === 0 ? null : slideData[id - 1].audioURL
                if (prevImg && !img.includes(prevImg)) {
                    id === 0 ? img[slideData.length - 1] = prevImg : img[slideId - 1] = prevImg
                }
                if (prevAudio && !audio.includes(prevAudio)) {
                    id === 0 ? audio[slideData.length - 1] = prevAudio : audio[slideId - 1] = prevAudio
                }
                const nextImg = slideData.length - 1 === id ? null : slideData[id + 1].imageURL
                const nextAudio = slideData.length - 1 === id ? null : slideData[id + 1].audioURL
                if (nextImg && !img.includes(nextImg)) {
                    id === slideData.length - 1 ? img[0] = nextImg : img[slideId + 1] = nextImg
                }
                if (nextAudio && !audio.includes(nextAudio)) {
                    id === slideData.length - 1 ? audio[0] = nextAudio : audio[slideId + 1] = nextAudio
                }
            }
        })
        setImageUrls(img)
        setAudioUrls(audio)
    }, [slideId, slideData, audioUrls, imageUrls])

    if (slideId === null) {
        return (
            <div data-testid="main-component" className="w-screen h-screen flex justify-center items-center">
                <img src='/favicon-32x32.png' alt='opera player logo'/>
            </div>
        )
    }

    return <Slider slideData={slideData} slideId={slideId} imageUrls={imageUrls} setImageUrls={setImageUrls} audioUrls={audioUrls} setAudioUrls={setAudioUrls} />

}