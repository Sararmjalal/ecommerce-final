import { AiFillCloseCircle } from "react-icons/ai";
import { UploadBoxProps } from "../../../lib/interfaces";

const UploadBox = ({ images, removeImg }: UploadBoxProps) => {
  return (
    <div className={`p-4 w-[100%] h-full rounded-2xl bg-gray-100 overflow-y-auto shadow-md ${images[0] ? "" : "flex justify-center items-center"}`}>
      {
        !images[0] ?
          <p>No images selected yet.</p>
          :  
          <div className="grid grid-cols-4 gap-2 w-full">
            {images.map((img, index) => (
              <div className="relative shadow-md rounded-2xl overflow-hidden">
                <img
                  src={typeof (img['url']) === 'string' ? img['url'] : ""}
                  alt='product image'
                  className="aspect-square  object-cover"
                />
                  <AiFillCloseCircle
                  className="absolute top-4 left-4 cursor-pointer hover:scale-110 transition-all"
                  fontSize={24}
                  onClick={() => removeImg(index)}
                  />
              </div>
            ))}
            </div>
      }

    </div>
  )
}

export default UploadBox