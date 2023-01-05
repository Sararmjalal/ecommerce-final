import React, {useEffect, useState} from "react";
import {useForm, useFieldArray} from "react-hook-form";
import * as MdIcons from "react-icons/md";
import * as IOIcons from "react-icons/io5";
import { AddCategoryFormValues, CreateCategoryBody, CategoryVariableObject } from "../../../lib/interfaces";
import {allCategories, createCategory} from "../../../apis";
import {QueryClient, useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import VariableForm from "../../../components/admin-panel/categories/VariablesForm";

const AddCategory = () => {
  const types = [
    { name: "Select", value: "select" },
    { name: "Multi Select", value: "multiselect"},
    { name: "Color", value: "multiselect"},
    { name: "Text", value: "text" },
  ];

  const {push} = useRouter();

  const [selectedTypes, setSelectedTypes] = useState([types[0]]);

  useEffect(() => {
    const clone = getValues("variables");
    const thisIndex = selectedTypes.length - 1
    if (selectedTypes[thisIndex].name === 'Color') clone[thisIndex].options[0] = '#000000'
    clone[thisIndex].type = selectedTypes[thisIndex].value
    setValue('variables', clone)
  }, [selectedTypes]);

  const {
    register, control, handleSubmit, formState: {errors}, getValues, setValue } = useForm<AddCategoryFormValues>({
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
    mutationFn: async (cat: CreateCategoryBody) => await createCategory(cat),
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
        ...(type !== "text" && {options: [...options]}),
      }
    })
    addCategory.mutate({
      name: data.name,
      variables: obj,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className='ml-1'>Name:</label>
        {errors.name && (<p className='text-xs text-reddish ml-3'>Please enter category name</p>)}
        <input
          placeholder='Category name'
          style={ errors.name?.ref && { border: "1px", borderStyle: "solid", borderColor: "red" } }
          className={`text-gray-600 w-full py-3 pl-2 bg-gray-100	rounded-xl outline-none mt-1 lg:mb-4 mb-8`}
          {...register('name', { required: true, maxLength: 50 })}
        />
        <label className=' ml-1'>Variables:</label>
        {variables.map((variable, outerIndex) => (
          <VariableForm
            outerIndex={outerIndex}
            variables={variables}
            selectedTypes={selectedTypes}
            remove={remove}
            setSelectedTypes={setSelectedTypes}
            errors={errors}
            register={register}
            types={types}
            variable={variable}
            getValues={getValues}
            update={update}
          />
        ))}
        <div
          onClick={() => {
            append({name: "", type: types[0].value, options: [""]})
            setSelectedTypes([...selectedTypes, types[0]])
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
