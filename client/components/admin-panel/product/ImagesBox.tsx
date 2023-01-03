import { BsPlusSquareDotted } from "react-icons/bs"
import { readAllFiles } from "../../../lib"
import { ImagesBoxProps } from "../../../lib/interfaces"

const ImagesBox = ({ useFor, images, title, handleOpenUpload, setValue }: ImagesBoxProps) => (
  <div className="col-span-2 md::col-span-1">
    <p className='my-4 font-semibold'>{title}</p>
      <div
      className='h-72 cursor-pointer bg-gray-100 hover:bg-gray-200 focus:bg-grat-200 w-full rounded-xl overflow-y-auto'
      onClick={() => useFor !== 'single' && handleOpenUpload()}>
      <div className="h-full">
      {
      useFor === 'single' ?
      <label htmlFor="oneFileInput" className="w-full flex justify-center items-center">
      <div className='cursor-pointer h-72 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 w-full rounded-xl overflow-hidden'>
        {
            images[0] ?
              <img
                src={typeof (images[0]['url']) === 'string' ? images[0]['url'] : ""}
                alt='product image'
                className="aspect-square object-cover h-72 w-full"
              />
                :
              <div className="w-full h-full flex justify-center items-center">
                <BsPlusSquareDotted />
              </div>        
        }
        </div>
        <input
          id="oneFileInput"
          type='file'
          className="hidden"
            accept="image/*"
            onChange={(e) => readAllFiles({
              useFor: 'featured',
              files:e.target.files,
              images,
              setImages: setValue,
            })}
          />
          </label>
            :
          images[0] ?
            <div className="grid grid-cols-5 md:grid-cols-3 gap-2 w-full p-2">
              {
                images.map(({ url }) => (
                  <img
                    src={typeof (url) === 'string' ? url : ""}
                    alt='product image'
                    className="aspect-square object-cover h-32 xl:h-20 w-full rounded-2xl"
                  />
                ))
              }
             </div> 
            :
          <div className="w-full h-full flex justify-center items-center">
            <BsPlusSquareDotted />
          </div>  
      }
    </div>
  </div>
</div>
)

export default ImagesBox