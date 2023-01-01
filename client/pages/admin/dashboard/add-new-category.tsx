import React, {useEffect, useState} from "react";
import {useForm, useFieldArray} from "react-hook-form";
import * as MdIcons from "react-icons/md";
import * as IOIcons from "react-icons/io5";
import TypesMenu from "../../../components/admin-panel/TypesMenu";
import {ErrorMessage} from "@hookform/error-message";
import {
  AddCategoryFormValues,
  CategoryVariableObject,
} from "../../../lib/interfaces";

const AddCategory = () => {
  const types = [
    {
      name: "Text",
      value: "text",
    },
    {
      name: "Select",
      value: "select",
    },
    {
      name: "Multi Select",
      value: "multiselect",
    },
  ];

  const [selectedTypes, setSelectedTypes] = useState([types[0]]);

  useEffect(() => {
    const clone = getValues("variables");
    selectedTypes.forEach((type, index) => {
      clone[index].type = type.value;
      update(index, clone[index]);
    });
  }, [selectedTypes]);

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    getValues,
    setError,
  } = useForm<AddCategoryFormValues>({
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

  console.log(errors);

  const {
    fields: variables,
    append,
    remove,
    update,
  } = useFieldArray({
    control,
    name: "variables",
  });

  const onSubmit = (data: AddCategoryFormValues) => {
    console.log(data);

    const variables = {} as CategoryVariableObject;
    data.variables.forEach(({name, type, options}) => {
      type = type.toLowerCase().trim();
      variables[name as keyof CategoryVariableObject] = {
        type,
        ...(type !== "text" && {
          options: [...options],
        }),
      };
    });
    console.log(variables);
  };

  // console.log(errors.variables[0]?.options[0].ref);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className='ml-1'>Name:</label>
        {errors.name && (
          <p className='text-xs text-reddish ml-3'>
            Please enter category name
          </p>
        )}
        <input
          placeholder='Category name'
          style={
            errors.name?.ref && {
              border: "1px",
              borderStyle: "solid",
              borderColor: "red",
            }
          }
          className={`text-gray-600 w-full py-3 pl-2 bg-gray-100	rounded-xl outline-none mt-1 lg:mb-4 mb-8`}
          {...register(`name` as const, {
            required: true,
            maxLength: 50,
          })}
        />
        <label className=' ml-1'>Variables:</label>
        {variables.map((variable, outerIndex) => {
          return (
            <>
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
                  {/* <ErrorMessage errors={errors} name='name' /> */}
                  {errors.variables && (
                    <p className='text-xs text-reddish ml-3'>
                      Enter Variable Name
                    </p>
                  )}
                  <input
                    style={
                      errors.variables && {
                        border: "1px",
                        borderStyle: "solid",
                        borderColor: "red",
                      }
                    }
                    className='text-gray-600 w-full py-3 pl-2 bg-gray-100	rounded-xl outline-none mt-1 mb-4 text-sm'
                    placeholder='var name'
                    {...register(`variables.${outerIndex}.name`, {
                      required: true,
                      maxLength: 50,
                    })}
                  />
                </div>
                <div className='w-1/3 md:w-full'>
                  <TypesMenu
                    types={types}
                    selectedTypes={selectedTypes}
                    setSelectedTypes={setSelectedTypes}
                    outerIndex={outerIndex}
                  />
                  <div className='text-red-400 text-sm font-semibold ml-1'>
                    {/* {row.errorMessage} */}
                  </div>
                </div>
                <div className='w-1/3 md:w-full'>
                  {variables[outerIndex].type !== "text" && (
                    <>
                      <label className='ml-1 font-light text-sm'>
                        Options:
                      </label>
                      {variable.options.map((option, innerIndex) => {
                        return (
                          <>
                            {errors?.variables && (
                              <p className='text-xs text-reddish ml-3'>
                                {variable.options.length === 1
                                  ? "At least 1 option is required for non-text types"
                                  : "Add option name or remove empty option fields."}
                              </p>
                            )}
                            <div className='flex items-center gap-2'>
                              <input
                                style={
                                  errors?.variables && {
                                    border: "1px",
                                    borderStyle: "solid",
                                    borderColor: "red",
                                  }
                                }
                                className='text-gray-600 w-full py-3 pl-2 bg-gray-100	rounded-xl outline-none mt-1 mb-4 text-sm'
                                placeholder='option'
                                {...register(
                                  `variables.${outerIndex}.options.${innerIndex}`,
                                  {required: true, maxLength: 50}
                                )}
                              />
                              <div
                                className={`w-max cursor-pointer ${
                                  variable.options.length > 1
                                    ? "block"
                                    : "hidden"
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
                          </>
                        );
                      })}
                      <div
                        key={`addOpt${outerIndex}`}
                        onClick={() => {
                          const thisVariable = getValues(
                            `variables.${outerIndex}`
                          );
                          thisVariable.options.push("");
                          update(outerIndex, thisVariable);
                        }}
                        className='text-sm cursor-pointer ml-1 text-gray-900 hover:text-violet-700 font-semibold flex'>
                        <div className='w-max flex items-center gap-1'>
                          <IOIcons.IoAddCircle />
                          <div>Add More Options</div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          );
        })}
        <div
          onClick={() => {
            append({
              name: "",
              type: "",
              options: [""],
            });
            setSelectedTypes([...selectedTypes, types[0]]);
          }}
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
