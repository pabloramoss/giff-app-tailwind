import { useState } from "react"
import Image from "next/image"
import Dropdown from "./Dropdown"
import { FaHeart, FaLink } from "react-icons/fa";

interface Props {
  gif: any;
}

const GifDetail: React.FC<Props> = ({ gif }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const like = ()=> (isLiked) ? setIsLiked(false) : setIsLiked(true)
  console.log(gif)
  
  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <h1 className="my-10 text-2xl text-slate-300 font-semibold">{gif.title}</h1>
      <div className="flex gap-20">
        <Image
          src={gif.images.fixed_height.url} 
          alt={gif.title} 
          height={400}
          width={400}
          objectFit="cover"
        />
        <div className="flex flex-col gap-5">
          <button onClick={like} className="flex items-center gap-4 p-1">
            <FaHeart className={` ${isLiked ? "text-red-500" : "text-gray-300"}`} size={20} />
            <p className="ml- font-semibold text-slate-300 text-lg">Favorite</p>
          </button>
            <Dropdown gifUrl={gif.url} text="Share" />
            <button
              className="px-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 text-sm font-semibold rounded-md items-center flex gap-4"
              onClick={()=>navigator.clipboard.writeText(gif.embed_url)}>
              <FaLink size={25} className="bg-slate-300 px-1 rounded-md" />
              <p className="font-semibold text-slate-300 text-lg">Link</p>
            </button>
        </div>
      </div>
    </div>
  )
}

export default GifDetail