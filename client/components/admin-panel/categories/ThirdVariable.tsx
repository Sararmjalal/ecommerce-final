import React from 'react'
import { BsCheck2 } from 'react-icons/bs'

const ThirdVariable = ({otherOption}:any) => {
  return (
    <div className='flex gap-5 items-center justify-start'>
                <div
                  className={`w-6 h-6 flex flex-col items-center justify-center cursor-pointer
                    ${
                      !otherOption.isSelected 
                        ? "bg-black text-white"
                        : "bg-white border-[1px] border-grayborder"
                    }`}
        // onClick={() => setData({ ...data, selectedCategory: name })}
      >
                  {!otherOption.isSelected && <BsCheck2 />}
                </div>
                <p>{otherOption.name}</p>
           
    </div>
  )
}

export default ThirdVariable