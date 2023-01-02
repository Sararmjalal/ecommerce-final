import React, {useRef, useState} from "react";
import {useForm, useFieldArray} from "react-hook-form";
import {Editor} from "@tinymce/tinymce-react";
import {Editor as TinyMCEEditor} from "tinymce";
import * as ReactIconsBS from "react-icons/bs/index";
import {useQuery} from "@tanstack/react-query";
import {allCategories} from "../../../apis";
import {Category} from "../../../lib/interfaces";
import Loading from "../../../components/main/Loading";

const AddProduct = () => {

  const editorRef = useRef<TinyMCEEditor | null>(null);

  const [tempState, setTempState] = useState({
    isAvailable: false,
    isSelected: false
  });

  const { isLoading, data: categories, error} = useQuery({ queryKey: ["categories"], queryFn: allCategories });

  const { register, control, handleSubmit, formState: { errors } } = useForm<any>({
    defaultValues: {
      title: "", price: "", quantity: "", description: "", isAvalible: false, categoryId: "", images: [""],
      variables: {
        name: { type: "", options: [""] },
      },   
    },
    mode: "onSubmit",
  });

  const { fields: variables, append, remove, update } = useFieldArray({ control, name: "variables" });

  const onSubmit = (data: any) => console.log(data);

  if (isLoading) return <Loading />;
console.log(errors)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div>
        <input
          placeholder='Product title...'
          className={`text-gray-600 w-full py-3 pl-2 bg-gray-100	rounded-xl outline-none mt-1 lg:mb-4 mb-8`}
          {...register(`title` as const, { required: true, maxLength: 50 })} />
        <Editor
          {...register(`description`, { required: true, maxLength: 500 })}
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            placeholder: "Product Description...",
            height: 500,
          }} />
      </div>

      <div className='w-full border-[1px] border-gray-200 rounded-xl md:mr-0 mr-[1rem] mt-4 pb-6'>
        
        <div>
          <p className='m-4 font-semibold'>Product Details:</p>
          <div className='flex gap-2 items-center mx-8 md:mx-4 mr-1'>
            <p>Is Available?</p>
            <div className={`w-5 h-5 cursor-pointer rounded-md p-[1.5px] ${tempState.isAvailable? "bg-gray-700": "bg-white border-2 border-gray-200"}`}
              onClick={() => setTempState({...tempState, isAvailable:!tempState.isAvailable})}>
              {tempState.isAvailable && <ReactIconsBS.BsCheck fill='white' size='18px' />}
            </div>
          </div>
          {tempState.isAvailable && (
            <div className='my-4 flex gap-3 px-4'>
              <input
                className='w-1/2 dashboard-input'
                placeholder='Quantity'
                type='text'
                {...register(`quantity` as const, {required: true, maxLength: 50})}/>
              <input
                placeholder='Price'
                type='text'
                className='w-1/2 dashboard-input'
                {...register(`price` as const, {required: true, maxLength: 50})}/>
            </div>
          )}
        </div>
        
        <div className="flex lg:flex-col w-full">
          <div className="flex-1 flex-col gap-2 items-start mx-8 md:mx-4 my-6 px-4">
            <p>Category</p>
            <ul className='overflow-y-auto flex flex-col w-full h-64 border-[1px] border-gray-200 rounded-xl mt-4 p-4 mr-4 md:mr-0 scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100'>
              {categories.map((cat: Category, i: number) => {
                return (
                  <div className='flex gap-3 justify-between px-4'>
                    <li className='flex gap-2 items-center mb-3'
                      key={`cat${i}`}>
                      <p className='font-light'>{cat.name}</p>
                      <div className={` w-4 h-4 cursor-pointer rounded-md p-[1.5px]`}>
                        <ReactIconsBS.BsCheck fill='white' size='14px' />
                      </div>
                    </li>
                    <div className={` w-5 h-5 cursor-pointer rounded-md p-[1.5px] ${tempState.isSelected? "bg-gray-700":"bg-white border-2 border-gray-200"}`}>
                      {tempState.isSelected && (<ReactIconsBS.BsCheck fill='white' size='18px' />)}
                    </div>
                  </div>
                  );
                })}
            </ul>
          </div>
          <div className="flex-1 flex-col gap-2 items-start mx-8 md:mx-4  my-6 px-4">
            <p>Variables</p>
            <ul className="overflow-y-auto flex flex-col w-full h-64 border-[1px] border-gray-200 rounded-xl mt-4 p-4 mr-4 md:mr-0 scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100"></ul>
          </div>
        </div>

      </div>
      
      <div className='w-full border-[1px] border-gray-200 rounded-xl md:mr-0 mr-[1rem] mt-4 pb-6 px-4'>
        <div>
          <p className='m-4 font-semibold'>Product Gallery:</p>
          <div className='flex flex-col items-center py-24 cursor-pointer bg-gray-100 hover:bg-gray-200 focus:bg-grat-200 w-full rounded-xl'>
            <div>
              <ReactIconsBS.BsPlusSquareDotted />
            </div>
          </div>
        </div>
      </div>

      <button className='dashboard-btn' type='submit'>Add Product</button>
    </form>
  );
};

export default AddProduct;
