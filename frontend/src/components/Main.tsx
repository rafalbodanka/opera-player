import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "./Slider";

export default function Main() {

    const [imageUrls, setImageUrls] = useState<string[]>([
        './img/0.jfif',
        './img/1.jfif',
        './img/2.jfif',
        './img/3.jfif',
        './img/4.jfif',
        './img/5.jfif',
        './img/6.jfif',
        './img/7.jfif',
        './img/8.jfif',
    ])

    const [slideId, setSlideId] = useState<number | null>(null)

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        const paramId = Number(params.slideId)
        if (isNaN(paramId) || paramId >= imageUrls.length){
            navigate('/0')
        }
        if (paramId < imageUrls.length - 1) setSlideId(paramId)
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