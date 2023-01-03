import {MdRemoveCircle} from "react-icons/md";
import { OptionsFormProps } from "../../lib/interfaces";

const OptionsForm = ({ errors, outerIndex, register, innerIndex, selectedTypes, variable, getValues, update }: OptionsFormProps) => {
  if(!innerIndex) return <></>
  return (
    <div className='flex flex-col'>
    <div className='flex items-center justify-center gap-2'>
      <input
        style={errors.variables && errors.variables[outerIndex]?.options && errors.variables[outerIndex]?.options![innerIndex] ? {border: "1px", borderStyle: "solid", borderColor: "red"} : {}}
        autoFocus
        {...register(`variables.${outerIndex}.options.${innerIndex}`, {required:true})}
        type={selectedTypes[outerIndex].name === 'Color' ? 'color' : 'text'}
        className={`text-gray-600 w-full outline-none text-sm border-none ${selectedTypes[outerIndex].name === 'Color' ? "h-[50px] p-0 bg-white shadow-md cursor-pointer" : " py-3 px-2 bg-gray-100 rounded-xl mt-1"}`}
        placeholder='Option'
      />
      <div
        className={`w-max cursor-pointer ${variable.options.length > 1 ? "block" : "hidden"}`}
        onClick={() => {
          const thisVariable = getValues(`variables.${outerIndex}`)
          thisVariable.options.splice(outerIndex, 1);
          update(outerIndex, thisVariable);
        }}>
        <MdRemoveCircle className="hover:text-primary"/>
      </div>
    </div>
    {errors.variables && errors.variables[outerIndex]?.options && errors.variables[outerIndex]?.options![innerIndex] &&(<p className='text-xs text-reddish ml-1 my-2'>Please fillout this field!</p>)}
  </div>
  )
}

export default OptionsForm