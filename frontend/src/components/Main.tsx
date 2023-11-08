import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "./Slider";
import useGetSlidesData from "../hooks/useGetSlidesData";

export default function Main() {

    const [imageUrls, setImageUrls] = useState<string[]>([
        './img/0.png',
        './img/1.png',
        './img/2.png',
        './img/3.png',
        './img/4.png',
        './img/5.png',
        './img/6.png',
        './img/7.png',
        './img/8.png',
        './img/9.png'
    ])

    const slideData = useGetSlidesData()
    useEffect(() => {
        console.log(slideData)
    }, [slideData])

    const [slideId, setSlideId] = useState<number | null>(null)

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        const paramId = Number(params.slideId)
        if (isNaN(paramId) || paramId >= imageUrls.length){
            navigate('/0')
        }
        if (paramId < imageUrls.length) setSlideId(paramId)
    }, [navigate])

    if (slideId === null) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <img src='/favicon-32x32.png'/>
            </div>
        )
    }

    return <Slider slideId={slideId} imageUrls={imageUrls} />

}