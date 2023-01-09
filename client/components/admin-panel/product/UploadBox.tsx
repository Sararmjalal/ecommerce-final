import { AiFillCloseCircle, AiFillPushpin } from "react-icons/ai";
import { UploadBoxProps } from "../../../lib/interfaces";

const UploadBox = ({ images, removeImg, moveImg }: UploadBoxProps) => {
  return (
    <div className="p-4 w-[100%] h-full rounded-2xl bg-gray-100 overflow-y-auto shadow-md">
      {!images[0] ?
        <label htmlFor="fileInput" className="cursor-pointer w-full h-full flex justify-center items-center">
          <p>No images selected yet.</p>
        </label>
          :  
        <div className="grid grid-cols-8 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-2 w-full">
          {images.map((img, index) => (
            <div className="relative shadow-md rounded-2xl overflow-hidden">
              <img
                className="aspect-square object-cover"
                src={typeof (img['url']) === 'string' ? img['url'] : ""}
                alt='product image'
              />
              <AiFillCloseCircle
                className="absolute top-3 left-3 xl:top-2 xl:left-2 cursor-pointer hover:scale-110 transition-all hover:text-primary"
                fontSize={24}
                onClick={() => removeImg(index)}
                stroke='gray'
                strokeWidth={20}
              />
                {index !== 0 &&
              <AiFillPushpin
                className="absolute top-3 right-3 xl:top-2 xl:right-2 cursor-pointer hover:scale-110 transition-all hover:text-primary"
                fontSize={24}
                onClick={() => moveImg(index, 0)}
              />
            }
            </div>
            ))}
        </div>
      }
      </div>
  )
}

export default UploadBox