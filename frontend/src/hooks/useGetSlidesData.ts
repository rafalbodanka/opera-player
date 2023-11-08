import { useEffect, useState } from "react";
import { Slide } from "../types/Slide";

export default function useGetSlidesData() {
    const [slidesData, setSlideData] = useState<Slide[]>([])

    useEffect(() => {
        const getSlidesData = async () => {
            try {
                const response = await fetch('http://localhost:5000/data')
                const data = await response.json()
                console.log(data)
                setSlideData(data)
            } catch (err) {
                console.log(err)
            }
        }
        getSlidesData()
    }, [])

    return slidesData
}