import React, {useRef, useState} from "react";
import {useForm, useFieldArray} from "react-hook-form";
import {Editor} from "@tinymce/tinymce-react";
import {Editor as TinyMCEEditor} from "tinymce";
import * as ReactIconsBS from "react-icons/bs/index";
import {useQuery} from "@tanstack/react-query";
import {allCategories} from "../../../apis";
import Loading from "../../../components/main/Loading";
import { ProductBodyForm, ProductCategory, Category, CategoryVariableObject } from "../../../lib/interfaces";
import UploadModal from "../../../components/modals/Upload";
import ImagesBox from "../../../components/admin-panel/product/ImagesBox";
import Link from "next/link";
import CatList from "../../../components/admin-panel/product/CatList";

const AddProduct = () => {

  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [tempState, setTempState] = useState({
    isAvailable: false,
    openUpload: false,
  });

  const { isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: allCategories,
    onSuccess: (data) => {
      const clone = data.map((category: Category) => {
        const vars: CategoryVariableObject[]  = []
        Object.entries(category.variables).forEach(([key, val]) => {
          vars.push({
            name: key,
            ...val
          })
        })
        return { ...category, isSelected: false, vars }
        })
      setValue('cats', clone)
    }
  })

  const { register, control, handleSubmit, formState: { errors }, getValues, setValue } = useForm<ProductBodyForm>({
    defaultValues: {
      title: "", price: "", quantity: "", description: "", isAvalible: false, categoryId: "",
      cats:[],
      images: [],
      variables: [],   
    },
    mode: "onSubmit",
  });

  const { fields: variables, append: appendVar, remove: removeVar, update: updateVar } = useFieldArray({ control, name: 'variables' });
  const { fields: images, append: appendImg, remove: removeImg, update: updateImg, move: moveImg } = useFieldArray({ control, name: "images" });
  const { fields: cats, append: appendCat, remove: removeCat, update: updateCat, move: moveCat } = useFieldArray({ control, name: "cats" });
  console.log(cats)
  const onCategorySelect = (i: number) => {
    const clone = [...cats]
    clone.forEach((category: ProductCategory) => category.isSelected = false)
    clone[i].isSelected = true
    setValue('cats', clone)
  }
  console.log(cats)
  const onSubmit = (data: ProductBodyForm) => console.log(data);

  if (isLoading) return <Loading />;
  return (
    <div className={tempState.openUpload ? 'hidden' : ''}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          placeholder='Product title...'
          className={`text-gray-600 w-full py-3 pl-2 bg-gray-100	rounded-xl outline-none mt-1 lg:mb-4 mb-8`}
          // {...register(`title` as const, { required: true, maxLength: 50 })}
        />
        <Editor
          // {...register(`description`, { required: true, maxLength: 500 })}
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
              {cats[0] ?
                cats.map((cat: ProductCategory, i: number) => (
                  <CatList
                    cat={cat}
                    i={i}
                    onCategorySelect = {onCategorySelect}
                  />
                )) : <p>No categories created yet.<Link href={'/admin/dashboard/categories'}> <p className="text-blueish font-semibold">Create one.</p></Link></p>
              }
          </ul>
          </div>
          <div className="flex-1 flex-col gap-2 items-start mx-8 md:mx-4  my-6 px-4">
            <p>Variables</p>
              <ul className="overflow-y-auto flex flex-col w-full h-64 border-[1px] border-gray-200 rounded-xl mt-4 p-4 mr-4 md:mr-0 scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100">
                {cats.map((cat: ProductCategory) => (
                  <div>
                   {/* {cat.vars.map((variable, innerIndex:number) => {
                     return (
                       variable.name?.type === 'text' ?
                      ( <div className="flex items-center gap-2 w-full mb-6">
                      <p className='w-1/2 font-semibold text-gray-500'>{variable.name}:</p>
                      <input
                        placeholder='Type value...'
                        className="w-1/2 outline-none text-gray-600 py-3 pl-2 bg-gray-100	rounded-xl mt-1 hover:bg-gray-200 focus:bg-gray-200"
                      />
                    </div>):(<p>asdfghjkhmgfd</p>)   
                      
                         
                    );
                })} */}
                  </div>
                ))}
              </ul>
          </div>
        </div>
      </div>
      <div className='w-full grid grid-cols-3 lg:grid-cols-1 gap-4 border-[1px] border-gray-200 rounded-xl md:mr-[1rem] mr-0 mt-4 pb-6 px-4'>
          <div className="col-span-1">
            <ImagesBox
              title='Featured Image:'
              useFor="single"
              images={images}
              setValue={setValue}
              handleOpenUpload={() => setTempState({...tempState, openUpload: true})}
              />
          </div>
          <div className="col-span-2 md::col-span-1">
          <ImagesBox
              title='Gallery:'
              useFor="multiple"
              images={images}
              setValue={setValue}
              handleOpenUpload={() => setTempState({...tempState, openUpload: true})}
              />
          </div>
        </div>
      <button className='dashboard-btn' type='submit'>Add Product</button>
    </form>
      {
        tempState.openUpload
        &&
        <UploadModal
          removeImg={removeImg}
          setValue={setValue}
          moveImg={moveImg}
          images={images}
          closeHandler={() => setTempState({...tempState, openUpload: false })} />
        }
    </div>
  );
};

export default AddProduct;
