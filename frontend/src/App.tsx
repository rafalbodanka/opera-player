import { useRef, useState } from "react";
import Controls from "./components/Controls";
import Nav from "./components/Nav";
import Audio from "./components/Audio";

function App() {

  const [slideId, setSlideId] = useState<number>(0)
  const [imageUrls, setImageUrls] = useState<string[]>([
    './img/0.jfif',
    './img/1.jfif',
    './img/2.jfif',
    './img/3.jfif'
  ])

  const imgRef = useRef(null)

  return (
    <div className="h-screen overflow-hidden select-none">
      <Nav imageUrls={imageUrls} slideId={slideId} setSlideId={setSlideId}/>
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
    <Controls slideId={slideId} setSlideId={setSlideId} />
    <Audio slideId={slideId}/>
  </div>
  );
}

export default App;