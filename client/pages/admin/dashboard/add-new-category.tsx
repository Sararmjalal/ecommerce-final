import React, {useState} from "react";
import {useForm, useFieldArray} from "react-hook-form";
import * as MdIcons from "react-icons/md";
import * as IOIcons from "react-icons/io5";
import TypesMenu from "../../../components/admin-panel/TypesMenu";
import SmallLoading from "../../../components/main/SmallLoading";

type FormValues = {
  name: string;
  variables: {
    name: string;
    type: string;
    options: {[key: number]: string}[];
  }[];
};

type VariableObject = {
  name: {
    type: string;
    options?: {[key: number]: string}[];
  };
};

const AddCategory = () => {
  const [showLoading, setShowLoading] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      variables: [
        {
          name: "",
          type: "",
          options: [""],
        },
      ],
    },
    mode: "onBlur",
  });

  const {
    fields: variables,
    append,
    remove,
    update,
  } = useFieldArray({
    control,
    name: "variables",
  });

  const onSubmit = (data: FormValues) => {
    const obj = {} as VariableObject;
    data.variables.forEach(({name, type, options}) => {
      obj[name as keyof VariableObject] = {
        type,
        ...(type !== "text" && {
          options: [...options],
        }),
      };
    });
    console.log(obj);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className='ml-1'>Name:</label>
        <input
          placeholder='Category name'
          className='text-gray-600 w-full py-3 pl-2 bg-gray-100	rounded-xl outline-none mt-1 lg:mb-4 mb-8'
          {...register(`name` as const, {
            // required: true,
          })}
        />
        <label className=' ml-1'>Variables:</label>
        {variables.map((variable, outerIndex) => {
          return (
            <div
              className='flex md:flex-col gap-4 md:gap-0 mt-4 w-full'
              key={`var${outerIndex}`}>
              <div
                className={`mb-5 cursor-pointer mt-9 mr-2 flex hover:text-violet-700 ${
                  variables.length > 1 ? "block" : "hidden"
                }`}
                onClick={() => remove(outerIndex)}>
                <div className='md:w-max w-1/3 mr-0 text-2xl md:mr-1'>
                  <MdIcons.MdRemoveCircle />
                </div>
                <div className='hidden font-semibold md:block'>
                  Remove Variable
                </div>
              </div>
              <div className='w-1/3 md:mr-4 md:w-full'>
                <label className='ml-1 font-light text-sm'>Name:</label>
                <input
                  className='text-gray-600 w-full py-3 pl-2 bg-gray-100	rounded-xl outline-none mt-1 mb-4 text-sm'
                  placeholder='var name'
                  {...register(`variables.${outerIndex}.name`)}
                />
              </div>
              <div className='w-1/3 md:w-full'>
                <TypesMenu
                  register={register}
                  index={outerIndex}
                  // errorMessage={row.errorMessage}
                />
                <div className='text-red-400 text-sm font-semibold ml-1'>
                  {/* {row.errorMessage} */}
                </div>
              </div>
              <div className='w-1/3 md:w-full'>
                <label className='ml-1 font-light text-sm'>Options:</label>
                {variables[outerIndex].type !== "text" &&
                  variable.options.map((option, innerIndex) => {
                    return (
                      <div className='flex items-center gap-2'>
                        <input
                          className='text-gray-600 w-full py-3 pl-2 bg-gray-100	rounded-xl outline-none mt-1 mb-4 text-sm'
                          placeholder='option'
                          {...register(
                            `variables.${outerIndex}.options.${innerIndex}`
                          )}
                        />
                        <div
                          className={`w-max cursor-pointer ${
                            variable.options.length > 1 ? "block" : "hidden"
                          }`}
                          onClick={() => {
                            const thisVariable = getValues(
                              `variables.${outerIndex}`
                            );
                            thisVariable.options.splice(outerIndex, 1);
                            update(outerIndex, thisVariable);
                          }}>
                          <MdIcons.MdRemoveCircle />
                        </div>
                      </div>
                    );
                  })}
                <div
                  key={`addOpt${outerIndex}`}
                  onClick={() => {
                    const thisVariable = getValues(`variables.${outerIndex}`);
                    thisVariable.options.push("");
                    update(outerIndex, thisVariable);
                  }}
                  className='text-sm cursor-pointer ml-1 text-gray-900 hover:text-violet-700 font-semibold flex'>
                  <div className='w-max flex items-center gap-1'>
                    <IOIcons.IoAddCircle />
                    <div>Add More Options</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div
          onClick={() =>
            append({
              name: "",
              type: "",
              options: [""],
            })
          }
          className='flex cursor-pointer ml-1 text-gray-900 hover:text-violet-700 font-semibold w-min'>
          <div className='w-max flex items-center mt-10 gap-1'>
            <div className='text-2xl'>
              <IOIcons.IoAddCircle />
            </div>
            <div>Add Variable</div>
          </div>
        </div>
      </div>
      <div className='text-right w-full mt-8'>
        {showLoading ? <SmallLoading /> : ""}
        <button
          className='text-white bg-gray-900 outline-none hover:bg-gray-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-6 py-2'
          type='submit'>
          Add Category
        </button>
      </div>
    </form>
  );
};

export default AddCategory;
