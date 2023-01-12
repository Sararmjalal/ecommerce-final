import React from 'react'
import { BsCheck2 } from 'react-icons/bs'

const ThirdVariable = (props:{otherOption:any, handleSelect: (selectedOption: string) => void}) => {
  return (
    <div className='flex gap-5 items-center justify-start'>
                <div
                  className={`w-6 h-6 flex flex-col items-center justify-center cursor-pointer
                    ${
                      props.otherOption.isSelected 
                        ? "bg-black text-white"
                        : "bg-white border-[1px] border-grayborder"
                    }`}
                  onClick={() => props.handleSelect(props.otherOption.name)}
      >
                  {props.otherOption.isSelected && <BsCheck2 />}
                </div>
                <p>{props.otherOption.name}</p>
           
    </div>
  )
}

export default ThirdVariable