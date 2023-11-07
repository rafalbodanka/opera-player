export default function Nav({
    imageUrls,
    slideId,
    imgHeight,
    imgWidth,
    audioLength,
    currentTime,
    setCurrentTime
}: {
    imageUrls: string[],
    slideId: number,
    imgHeight: number,
    imgWidth: number,
    audioLength: number,
    currentTime: number,
    setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
}) {

    const playedDistance = currentTime / audioLength
    console.log(imgHeight)

    return (
        <div className="z-30 w-screen fixed left-0 flex justify-center duration-500" style={{ top: imgHeight }}>
            <div className={`mt-4 h-[20px] flex justify-between`} style={{ width: imgWidth - 24 }}>
                {imageUrls.map((img, id) => {
                    return (
                        <div key={img} className="relative w-24">
                            <div className={`flex-1 h-[2px] ${id < slideId ? 'bg-white' : 'bg-gray-400'} mr-[2px]`}>
                            </div>
                            {id === slideId &&<div className="absolute top-0 left-0 bg-white h-[2px] mr-[2px]" style={{width: `${playedDistance * 100}%`}}>
                            </div>}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}