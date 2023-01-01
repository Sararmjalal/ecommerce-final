import React, {useEffect, useState} from "react";
import {useForm, useFieldArray} from "react-hook-form";
import * as MdIcons from "react-icons/md";
import * as IOIcons from "react-icons/io5";
import TypesMenu from "../../../components/admin-panel/TypesMenu";
import {
  AddCategoryFormValues,
  Category,
  CategoryVariableObject,
} from "../../../lib/interfaces";
import {allCategories, createCategory} from "../../../apis";
import {QueryClient, useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

const AddCategory = () => {
  const types = [
    {
      name: "Select",
      value: "select",
    },
    {
      name: "Multi Select",
      value: "multiselect",
    },
    {
      name: "Color",
      value: "multiselect"
    },
    {
      name: "Text",
      value: "text",
    },
  ];

  const {push} = useRouter();

  const [selectedTypes, setSelectedTypes] = useState([types[0]]);

  useEffect(() => {
    const clone = getValues("variables");
    const thisIndex = selectedTypes.length - 1
    if (selectedTypes[thisIndex].name === 'Color') clone[thisIndex].options[0] = '#000000'
    clone[thisIndex].type = selectedTypes[thisIndex].value
    setValue('variables', clone)
  }, []);

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    getValues,
    setValue,
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
    mode: "onSubmit",
  });

  const { fields: variables, append, update, remove } = useFieldArray({
    control,
    name: "variables",
  });

  const addCategory = useMutation({
    mutationFn: async (cat: Category) => await createCategory(cat),
    onSuccess: async(res) => {
      toast.success("Category added successfully");
      const queryClient = new QueryClient
      await queryClient.invalidateQueries({ queryKey: ['categories'] })
      await queryClient.prefetchQuery(['categories'], allCategories)
      push("/admin/dashboard/categories");
    },
  });

  const onSubmit = (data: AddCategoryFormValues) => {
    const obj = {} as CategoryVariableObject;
    data.variables.forEach(({name, type, options}) => {
      type = type.toLowerCase().trim();
      obj[name as keyof CategoryVariableObject] = {
        type,
        ...(type !== "text" && {
          options: [...options],
        }),
      };
    });
    addCategory.mutate({
      name: data.name,
      variables: obj,
    });
  };

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
          {...register('name', {
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
                  className={`mb-5 cursor-pointer mt-9 mr-2 flex hover:text-primary ${
                    variables.length > 1 ? "block" : "hidden"
                  }`}
                  onClick={() => {
                    const clone = [...selectedTypes]
                    clone.splice(outerIndex, 1)
                    remove(outerIndex)
                    setSelectedTypes(clone)
                  }}>
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
                    style={
                      errors.variables &&
                      errors.variables![outerIndex]?.name && {
                        border: "1px",
                        borderStyle: "solid",
                        borderColor: "red",
                      }
                    }
                    className='text-gray-600 w-full py-3 pl-2 bg-gray-100	rounded-xl outline-none mt-1 text-sm'
                    placeholder='Variable Name'
                    {...register(`variables.${outerIndex}.name`, {
                      required: true,
                      maxLength: 50,
                    })}
                  />
                  {errors.variables && errors.variables![outerIndex]?.name && (
                    <p className='text-xs text-reddish ml-1 my-2 '>
                      Please fillout this field!
                    </p>
                  )}
                </div>
                <div className='w-1/3 md:w-full'>
                  <TypesMenu
                    types={types}
                    selectedTypes={selectedTypes}
                    setSelectedTypes={setSelectedTypes}
                    outerIndex={outerIndex}
                  />
                  <div className='text-red-400 text-sm font-semibold ml-1'>
                  </div>
                </div>
                <div className='w-1/3 md:w-full'>
                  {variables[outerIndex].type !== "text" && (
                    <>
                      <label className='ml-1 font-light text-sm'>
                        Options:
                      </label>
                      <div className={`${selectedTypes[outerIndex].name === 'Color' ? 'flex flex-wrap gap-2 mt-2 mb-4' : ''}`}>
                        {variable.options.map((option, innerIndex) => {
                          return (
                            <>
                              <div className='flex flex-col'>
                                <div className='flex items-center justify-center gap-2'>
                                  <input
                                    style={errors.variables && 
                                      errors.variables[outerIndex]?.options &&
                                      errors.variables[outerIndex]?.options![innerIndex] ? {
                                      border: "1px",
                                      borderStyle: "solid",
                                      borderColor: "red",
                                    } : {}}
                                    autoFocus
                                    {...register(`variables.${outerIndex}.options.${innerIndex}`, {required:true})}
                                    type={selectedTypes[outerIndex].name === 'Color' ? 'color' : 'text'}
                                    className={`text-gray-600 w-full outline-none text-sm border-none
                                    ${selectedTypes[outerIndex].name === 'Color' ?
                                      "h-[50px] p-0 bg-white shadow-md cursor-pointer"
                                      :
                                      " py-3 px-2 bg-gray-100 rounded-xl mt-1"}`}
                                    placeholder='Option'
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
                                    <MdIcons.MdRemoveCircle
                                    className="hover:text-primary"
                                    />
                                  </div>
                                </div>
                                {errors.variables && 
                                  errors.variables[outerIndex]?.options &&
                                  errors.variables[outerIndex]?.options![innerIndex] &&(
                                    <p className='text-xs text-reddish ml-1 my-2'>
                                      Please fillout this field!
                                    </p>
                                  )}
                              </div>
                            </>
                          );
                        })}
                      </div>
                      <div
                        key={`addOpt${outerIndex}`}
                        onClick={() => {
                          const thisVariable = getValues(
                            `variables.${outerIndex}`
                          );
                          thisVariable.options.push(selectedTypes[outerIndex].name === 'Color' ?  "#000000" : "");
                          update(outerIndex, thisVariable);
                        }}
                        className='text-sm cursor-pointer ml-1 text-gray-900 hover:text-primary font-semibold flex'>
                        <div className='w-max flex items-center gap-1 mt-2'>
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
              type: types[0].value,
              options: [""],
            });
            setSelectedTypes([...selectedTypes, types[0]]);
          }}
          className='flex cursor-pointer ml-1 text-gray-900 hover:text-primary font-semibold w-min'>
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
