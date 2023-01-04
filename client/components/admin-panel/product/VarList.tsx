import * as ReactIconsBS from "react-icons/bs/index"
import { VarListProps } from "../../../lib/interfaces";

const VarList = ({thisVariable, outerIndex, onOptionSelect, length, register} : VarListProps) => {
  return (
        <li className={`flex gap-2 mb-6 ${outerIndex === length-1 ? "" : "border-b-[1px] border-gray-200"} `}>
        {
        thisVariable.type === 'text' ?
        <div className="flex items-center gap-2 w-full mb-6">
          <p className='w-1/2 font-semibold text-gray-500'>{thisVariable.name}:</p>
              <input
                placeholder='Type value...'
                {...register(`thisCategory.vars.${outerIndex}.options.${0}`)}
                className="w-1/2 outline-none text-gray-600 py-3 pl-2 bg-gray-100	rounded-xl mt-1 hover:bg-gray-200 focus:bg-gray-200"/>
        </div>
        :
        <>
        <p className='w-1/2 font-semibold text-gray-500'>{thisVariable.name}:</p>
        <ul className='w-1/2 flex flex-col items-end'>
          {
            thisVariable.options?.map((option, innerIndex) => {
              return (
                <li
                  onClick={() => onOptionSelect(outerIndex, innerIndex, thisVariable.type)}
                  key={`opt${outerIndex}-${innerIndex}`}
                  className='flex gap-1 items-center text-right mb-4 cursor-pointer'>
                  {
                    thisVariable.name === 'Color' ?
                      <div className="w-5 h-5 rounded-2xl mr-1 shadow-md" style={{background: option.name}}></div>
                      :
                      <p className={`${option.isSelected ? 'font-normal' : " font-light"} text-sm`}>{option.name}</p>
                  }
                  <div className={`w-4 h-4 rounded-md p-[1.5px] ${option.isSelected ? "bg-gray-700" : "border-2 border-gray-200"}`}> 
                    {option.isSelected ? <ReactIconsBS.BsCheck fill='white' size="14px" /> : " "}
                  </div>
                </li>
              )})}
          </ul>
      </>
    }
</li>
  );
}

export default VarList