import React from 'react'
import OptionsForm from './OptionsForm'
import { MdRemoveCircle } from "react-icons/md";
import * as IOIcons from "react-icons/io5";
import TypesMenu from '../TypesMenu';
import { VariablesFormProps } from '../../../lib/interfaces';

const VariablesForm = ({outerIndex, variables, selectedTypes, remove, setSelectedTypes, errors, register, types, variable, getValues, update}: VariablesFormProps) => {
  
  return (
    <div
    key={`var${outerIndex}`}
    className='flex md:flex-col gap-4 md:gap-0 mt-4 w-full'>
    <div
      className={`mb-5 cursor-pointer mt-9 mr-2 flex hover:text-primary ${variables.length > 1 ? "block" : "hidden"}`}
      onClick={() => {
        const clone = [...selectedTypes]
        clone.splice(outerIndex, 1)
        remove(outerIndex)
        setSelectedTypes(clone)
      }}>
      <div className='md:w-max w-1/3 mr-0 text-2xl md:mr-1'>
        <MdRemoveCircle />
      </div>
      <div className='hidden font-semibold md:block'>
        Remove Variable
      </div>
    </div>
    <div className='w-1/3 md:mr-4 md:w-full'>
      <label className='ml-1 font-light text-sm'>Name:</label>
      <input
        style={errors.variables && errors.variables![outerIndex]?.name && {border: "1px", borderStyle: "solid", borderColor: "red"}}
        className='text-gray-600 w-full py-3 pl-2 bg-gray-100	rounded-xl outline-none mt-1 text-sm'
        placeholder='Variable Name'
        {...register(`variables.${outerIndex}.name`, {required: true, maxLength: 50})}
      />
      {errors.variables && errors.variables![outerIndex]?.name && (<p className='text-xs text-reddish ml-1 my-2 '>Please fillout this field!</p>)}
    </div>
    <div className='w-1/3 md:w-full'>
      <TypesMenu
        types={types}
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        outerIndex={outerIndex}
      />
    </div>
    <div className='w-1/3 md:w-full'>
        {variables[outerIndex].type !== "text" && (
        <>
          <label className='ml-1 font-light text-sm'>Options:</label>
          <div className={`${selectedTypes[outerIndex].name === 'Color' ? 'flex flex-wrap gap-2 mt-2 mb-4' : ''}`}>
            {variable.options.map((option, innerIndex:number) => {
              return (
                <OptionsForm
                  errors={errors}
                  outerIndex={outerIndex}
                  innerIndex={innerIndex}
                  register={register}
                  selectedTypes={selectedTypes}
                  variable={variable}
                  getValues={getValues}
                  update={update}
                />
              );
            })}
          </div>
          <div
            key={`addOpt${outerIndex}`}
            className='text-sm cursor-pointer ml-1 text-gray-900 hover:text-primary font-semibold flex'
            onClick={() => {
              const thisVariable = getValues(`variables.${outerIndex}`);
              thisVariable.options.push(selectedTypes[outerIndex].name === 'Color' ?  "#000000" : "");
              update(outerIndex, thisVariable);
            }}>
            <div className='w-max flex items-center gap-1 mt-2'>
              <IOIcons.IoAddCircle />
              <div>Add More Options</div>
            </div>
          </div>
        </>
      )}
    </div>
  </div>
  )
}

export default VariablesForm