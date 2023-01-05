import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai"
import { UploadModalProps } from "../../lib/interfaces"
import UploadBox from "../admin-panel/product/UploadBox"
import { readAllFiles } from "../../lib";

const UploadModal = ({ images, setValue, closeHandler, removeImg, moveImg, files }: UploadModalProps) => {

  return createPortal((
    <>
      <div onClick={closeHandler} className='modal-backdrop' />
      <div
        className="fixed top-16 left-16 md:top-8 md:left-8 md:w-[calc(100%-65px)] md:h-[calc(100vh-65px)] z-[1001]
        bg-white w-[calc(100%-128px)] h-[calc(100vh-128px)] rounded-2xl overflow-hidden">
          <AiOutlineClose
            className='m-4 text-2xl text-gray-300 hover:text-black cursor-pointer'
            onClick={closeHandler} />
          <div className={images[0] ? 'p-4 h-[calc(100%-210px)]' : 'p-4 h-[calc(100%-150px)]'}>
          <UploadBox
            images={images}
            removeImg={removeImg}
            moveImg={moveImg}
          />
          </div>
          <div className={`w-max m-auto mt-2 ${images[0] ? "grid grid-cols-2 gap-3" : ""}`}>
          <button
            className={images[0] ? 'dashboard-btn bg-gray-100 text-black border-2 hover:border-gray-800 hover:bg-gray-800 focus:bg-gray-800' : 'hidden'}
            onClick={() => removeImg()}>Remove All</button>
          <label
            htmlFor="fileInput"
            className='dashboard-btn bg-gray-100 text-black border-2 hover:border-gray-800 hover:bg-gray-800 focus:bg-gray-800 cursor-pointer'>
            { images[0] ? 'Add more images' : 'Choose image(s)' }
          </label>
          <button className={images[0] ? "col-span-2 dashboard-btn mt-0 w-full text-base" : "hidden"}
            onClick={closeHandler}>
            Done
          </button>
          <input
            id="fileInput"
            type='file'
            accept="image/*"
            className="hidden"
            multiple
            onChange={(e) => {
              readAllFiles({
                useFor: 'gallery',
                files: e.target.files,
                images,
                setImages: setValue
              })
              const clone = [...files]
              if(!e.target.files) return
              for(let i=0; i<e.target.files.length; i++) clone.push(e.target.files[i])
              setValue('files', clone)
            }}
          />
          </div>
        </div>
    </>
  ), document.querySelector('#upload-portal') as HTMLElement)
}

export default UploadModal