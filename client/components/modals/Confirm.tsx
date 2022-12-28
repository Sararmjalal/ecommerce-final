import { ConfirmModalProps } from "../../lib/interfaces"
import { AiOutlineClose } from "react-icons/ai"

const ConfirmModal = ({ mode = "logout", closeHandler, okHandler }: ConfirmModalProps) => {
  return (
    <>
      <div onClick={closeHandler} className='modal-backdrop'></div>
      <div className='modal-container h-max'>
        <AiOutlineClose
          onClick={closeHandler}
          color={"#000"}
          size={17}
          cursor={"pointer"}
          className='absolute top-0 right-0 mt-9 mr-9 hover:scale-150 transition-all'
        />
        <p className='text-black font-semibold text-xl mt-8'>
          Are you sure you want to 
          {
            mode === 'logout' ?
              " exit?"
              :
              " delete this item?"
          }
        </p>
        <p className='text-grayish text-sm text-center mt-6'>
          Note that you can't restore your changes if you do.
        </p>
        <div className="flex gap-4">
        <button
          className='btn-primary w-full mt-5 py-3'
          onClick={closeHandler}
        >
          Cancel
        </button><button
          className='btn-secondary w-full mt-5 py-3'
          onClick={okHandler}>
          Yes
        </button>
        </div>
      </div>
    </>)
}

export default ConfirmModal