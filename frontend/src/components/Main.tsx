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
    }, [slideData, paramId])

    console.log(imageUrls)
    console.log(audioUrls)

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
            }
        })
        setImageUrls(img)
        setAudioUrls(audio)
    }, [slideId])

    if (slideId === null) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <img src='/favicon-32x32.png' />
            </div>
        )
    }

    return <Slider slideData={slideData} slideId={slideId} imageUrls={imageUrls} setImageUrls={setImageUrls} audioUrls={audioUrls} setAudioUrls={setAudioUrls} />

}