import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, useNavigate, useParams} from "react-router-dom";
import Controls from "./Controls";
import Nav from "./Nav";
import Audio from "./Audio";

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

  const imgRef = useRef(null)
  const params = useParams()
  const slideId = Number(params.slideId);

  return (
      <div className="h-screen overflow-hidden select-none">
        <Nav imageUrls={imageUrls} slideId={slideId}/>
      <div className="flex">
        {imageUrls.map((imgUrl, index) => (
          <div key={imgUrl} className="relative w-screen h-screen overflow-hidden flex-shrink-0 duration-1000" style={{ translate: `${-100 * slideId}%`}}>
          <img className="w-screen h-screen object-cover blur-md scale-105" src={imgUrl} alt={`Background Image ${index}`}/>
          <div className="absolute top-0 left-0 w-screen flex h-screen justify-center items-center">
            <img ref={imgRef} className="max-h-screen" src={imgUrl} alt={`Image ${index}`}/>
          </div>
        </div>
        ))}
      </div>
      <Controls slideId={slideId} imageUrls={imageUrls}/>
      <Audio slideId={slideId}/>
    </div>
  );
}