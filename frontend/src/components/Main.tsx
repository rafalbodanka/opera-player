import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "./Slider";
import useGetSlidesData from "../hooks/useGetSlidesData";

export default function Main() {

    const [slideId, setSlideId] = useState<number | null>(null)
    const [imageUrls, setImageUrls] = useState<string[]>([])
    const [audioUrls, setAudioUrls] = useState<string[]>([])

    const params = useParams()
    const paramId = Number(params.slideId)

    const navigate = useNavigate()

    const slideData = useGetSlidesData()

    useEffect(() => {
        if (!slideData || slideData.length === 0) return
        if (isNaN(paramId) || paramId > slideData.length - 1) {
            navigate('/0')
        }
        setSlideId(paramId)
        if (imageUrls.length < 1) {
            setImageUrls(Array.from({ length: slideData.length }, () => ''))
            setAudioUrls(Array.from({ length: slideData.length }, () => ''))
        }
    }, [paramId, slideData])

    useEffect(() => {
        if (!slideData || slideId === null) return
        const img: string[] = imageUrls
        const audio: string[] = audioUrls
        slideData.map((slide, id) => {
            if (id === slideId) {
                if (!img.includes(slide.imageURL)) {
                    img[slideId] = slide.imageURL
                }
                if (!audio.includes(slide.audioURL)) {
                    audio[slideId] = slide.audioURL
                }
                const prevImg = id === 0 ? slideData[slideData.length - 1].imageURL : slideData[id - 1].imageURL
                const prevAudio = id === 0 ? slideData[slideData.length - 1].audioURL : slideData[id - 1].audioURL
                if (!img.includes(prevImg)) {
                    id === 0 ? img[slideData.length - 1] = prevImg : img[slideId - 1] = prevImg
                }
                if (!audio.includes(prevAudio)) {
                    id === 0 ? audio[slideData.length - 1] = prevAudio : audio[slideId - 1] = prevAudio
                }
                const nextImg = slideData.length - 1 === id ? slideData[0].imageURL : slideData[id + 1].imageURL
                const nextAudio = slideData.length - 1 === id ? slideData[0].audioURL : slideData[id + 1].audioURL
                if (!img.includes(nextImg)) {
                    id === slideData.length - 1 ? img[0] = nextImg : img[slideId + 1] = nextImg
                }
                if (!audio.includes(nextAudio)) {
                    id === slideData.length - 1 ? audio[0] = nextAudio : audio[slideId + 1] = nextAudio
                }
            }
        })
        setImageUrls(img)
        setAudioUrls(audio)
    }, [slideId, slideData])

    if (slideId === null) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <img src='/favicon-32x32.png' />
            </div>
        )
    }

    return <Slider slideData={slideData} slideId={slideId} imageUrls={imageUrls} setImageUrls={setImageUrls} audioUrls={audioUrls} setAudioUrls={setAudioUrls} />

}