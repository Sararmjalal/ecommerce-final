import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai"
import { UploadModalProps } from "../../lib/interfaces"
import UploadBox from "../admin-panel/product/UploadBox"

const UploadModal = ({ images, setValue, closeHandler, removeImg }: UploadModalProps) => {
  
  const readFileAsDataUrl = (file: File) =>
    new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => resolve(e.target!.result);
    fileReader.onerror = () => reject(fileReader);
    fileReader.readAsDataURL(file);
    });
  
  
  const readAllFiles = async(files: FileList | null) => {
    if (!files) return

    const readers = []

    const clone = [...images]

    for (let i = 0; i < files.length; i++) readers.push(readFileAsDataUrl(files[i]));
    
      const values = await Promise.all(readers)
      values.forEach(val => {
        clone.push({ url: val })
      })
      setValue('images', clone)
  }

  return createPortal((
    <>
      <div onClick={closeHandler} className='modal-backdrop' />
        <div className="fixed top-16 left-16 z-[1001] bg-white w-[calc(100%-128px)] h-[calc(100vh-128px)] rounded-2xl overflow-hidden">
          <AiOutlineClose
            className='m-4 text-2xl text-gray-300 hover:text-black cursor-pointer'
            onClick={closeHandler} />
          <div className="p-4 h-[calc(100%-150px)]" >
          <UploadBox
            images={images}
            removeImg={removeImg}
          />
          </div>
          <div className={`w-max m-auto mt-2 ${images[0] ? "grid grid-cols-2 gap-4" : ""}`}>
          <button
            className={images[0] ? 'dashboard-btn bg-gray-100 text-black border-2 hover:text-white' : 'hidden'}
            onClick={() => removeImg()}>Remove All</button>
            <label htmlFor="fileInput"
              className="dashboard-btn cursor-pointer">
            { images[0] ? 'Add more images' : 'Choose image(s)' }
          </label>
            <input
              id="fileInput"
              type='file'
              className="hidden"
              multiple
              onChange={(e) => readAllFiles(e.target.files)}
            />
          </div>
        </div>
    </>
  ), document.querySelector('#upload-portal') as HTMLElement)
}

export default UploadModal