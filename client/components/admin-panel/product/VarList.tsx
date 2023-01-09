import { VarListProps } from "../../../lib/interfaces";
import * as ReactIconsBS from "react-icons/bs/index"

const VarList = ({thisVariable, outerIndex, onOptionSelect, length, register} : VarListProps) => {
  return (
        <li className={`flex gap-2 mb-6 ${outerIndex === length-1 ? "" : "border-b-[1px] border-gray-200"} `}>
          <p className={`${thisVariable.type === 'text' ? 'w-1/3' : 'w-1/2'} font-semibold text-gray-500`}>{thisVariable.name}:</p>
          <ul className={`${thisVariable.type === 'text' ? 'w-2/3' : 'w-1/2'} flex flex-col items-end`}>
          {thisVariable.options?.map((option, innerIndex) => {
            return (
            <li
              key={`opt${outerIndex}-${innerIndex}`}
              className='flex gap-1 items-center justify-center text-right mb-4 cursor-pointer'
              onClick={() => onOptionSelect(outerIndex, innerIndex, thisVariable.type)}>
              {thisVariable.name === 'Color' ?
                <div className="w-5 h-5 rounded-2xl mr-1 shadow-md" style={{background: option.name}}></div>
                  :
                thisVariable.type === 'text' ?
                <input
                  className="w-full outline-none text-gray-600 py-3 pl-2 bg-gray-100	rounded-xl mt-1 hover:bg-gray-200 focus:bg-gray-200"
                  placeholder='Type value...'
                  {...register(`thisCategory.vars.${outerIndex}.options.${innerIndex}.name`)} 
                  onChange={(e) => {
                    if (e.target.value) return option.isSelected = true
                    option.isSelected = false
                }}/>
                  :
                <p className={`${option.isSelected ? 'font-normal' : " font-light"} text-sm`}>{option.name}</p>
              }
              {thisVariable.type !== 'text' &&
                <div className={`w-4 h-4 rounded-md p-[1.5px] ${option.isSelected ? "bg-gray-700" : "border-2 border-gray-200"}`}> 
                  {option.isSelected && thisVariable.type !== 'text' ? <ReactIconsBS.BsCheck fill='white' size="14px" /> : " "}
                </div>
              }
            </li>
          )})}
          </ul>
        </li>
  );
}

export default VarList