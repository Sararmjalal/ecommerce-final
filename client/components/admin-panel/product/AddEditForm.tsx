import { ProductBodyForm, Category, ProductBody, ProductBodyVariables, AddEditProductForm } from "../../../lib/interfaces";
import React, {useRef} from "react";
import {useForm, useFieldArray, useWatch} from "react-hook-form";
import {Editor} from "@tinymce/tinymce-react";
import {Editor as TinyMCEEditor} from "tinymce";
import {allCategories, createProduct, upload, editProduct} from "../../../apis";
import ImagesBox from "../../../components/admin-panel/product/ImagesBox";
import {useMutation, useQuery} from "@tanstack/react-query";
import CatList from "../../../components/admin-panel/product/CatList";
import VarList from "../../../components/admin-panel/product/VarList";
import UploadModal from "../../../components/modals/Upload";
import Loading from "../../../components/main/Loading";
import { useRouter } from "next/router";
import {BsCheck} from "react-icons/bs";
import { toast } from "react-toastify";
import Link from "next/link";
import { queryClient } from "../../../pages/_app";

const AddEditProductForm = ({ useFor, defaultValues, productId='' }: AddEditProductForm) => {
  
  const editorRef = useRef<TinyMCEEditor | null>(null);
  
  const router = useRouter()
  
  const { isLoading } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["categories"],
    queryFn: allCategories,
    onSuccess: (data) => {
      const clone = data.map((category: Category) => {
        const vars: {}[]  = []
        Object.entries(category.variables).forEach(([key, val]) => {
          vars.push({
          name: key,
          type: val.type,
          isSelected: false,
          options: val.type === 'text' ?
            [{name: '', isSelected:false}] :
            val.options?.map(opt => ({
              name: opt,
              isSelected: false
            }))
          })
        })
        return { ...category, isSelected: false, vars }
      })
      setValue('cats', clone)
    }
  })

  const { register, control, handleSubmit, formState: { errors }, getValues, setValue } = useForm<ProductBodyForm>({
    defaultValues,
    mode: "onSubmit",
  });
  
  const { fields: images, remove: removeImg, move: moveImg } = useFieldArray({ control, name: "images" });
  
  const { fields: cats } = useFieldArray({ control, name: "cats" });
  
  const thisCategory = useWatch({
    control,
    name: 'thisCategory'
  })

  const openUpload = useWatch({
    control,
    name: 'openUpload'
  })

  const isAvailable = useWatch({
    control,
    name:'isAvailable'
  })
  
  const onCategorySelect = (i: number) => {
    const clone = [...cats]
    clone.forEach((category) => category.isSelected = false )
    clone[i].isSelected = true
    setValue('cats', clone)
    setValue('thisCategory', clone[i])
  }

  const onOptionSelect = (outerIndex:number, innerIndex:number, thisType: string) => {
    const clone = { ...thisCategory }
    if(!clone['vars']) return
    if (thisType === 'select')
    clone.vars[outerIndex].options.forEach(opt => opt.isSelected = false)
    clone.vars[outerIndex].options[innerIndex].isSelected = true
    clone.vars[outerIndex].isSelected = true
    setValue('thisCategory', clone)
  }
  
  const addProductMutation = useMutation({
    mutationFn: async (body: ProductBody) => await createProduct(body),
    onSuccess: () => {
      toast.success('Product added lool')
      queryClient.invalidateQueries({queryKey: ['products']})
      router.push('/admin/dashboard/products')
    },
    onError: (error) => toast.error('You suck lool')
  }) 

  const editProductMutation = useMutation({
    mutationFn: async (body: ProductBody) => await editProduct(productId, body),
    onSuccess: () => {
      toast.success('Product Edited lool')
      queryClient.invalidateQueries({queryKey: ['products']})
      router.push('/admin/dashboard/products')
    },
    onError: () => toast.error('You suck lool'),
  }) 

  const onSubmit = async (data: ProductBodyForm) => {

    if (!thisCategory._id) return toast.error('You must select a category')
    if (!thisCategory?.vars?.every(item => item.isSelected)) return toast.error('Put some vars in it lool')
    if (!images[0]) return toast.error('You should pick an image')

    const postFormData = (file: File | string, url:string) => 
      new Promise(async (resolve, reject) => {
        if (!file) return resolve({ url, dataUrl: '', file:''})
        const formData = new FormData()
        formData.append('reserve', file)
        const res = await upload(formData)
        resolve({
          url: res.data.name,
          dataUrl: '',
          file:''
        })
      })
    
    const thisImages = []
    for (let i = 0; i <images.length; i++) thisImages.push(postFormData(images[i]['file'], images[i]['url']))
    const clone = await Promise.all(thisImages)
    setValue('images', clone)

    const variables: ProductBodyVariables = {}
    thisCategory?.vars?.forEach(({ name, type, options }) => {
      options.forEach((opt, i, ref) => ref[i].isSelected && (  
        variables[name] ? variables[name].push(opt.name) : variables[name] = [opt.name]
      ))
    })

    const newData: ProductBody = {
      title: data.title,
      price: Number(data.price),
      quantity: Number(data.quantity),
      isAvailable: data.isAvailable,
      images: clone.map((item) => typeof(item['url'] === 'string') && item['url']),
      variables,
      categoryId: data.thisCategory._id,
      description:  editorRef.current?.getContent() ?? "No description provided yet."
    }
    
    useFor === 'Add Product' ? addProductMutation.mutate(newData) : editProductMutation.mutate(newData)
  }
  
  if (isLoading) return <Loading />;
  return (
    <div className={openUpload ? 'hidden' : ''}>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div>
        {errors.title && (<p className='text-xs text-reddish ml-1'>Please enter product title</p>)}
          <input
          style={ errors.title?.ref && { border: "1px", borderStyle: "solid", borderColor: "red" } }
          placeholder='Product title...'
          className={`text-gray-600 w-full py-3 pl-2 bg-gray-100	rounded-xl outline-none mt-1 lg:mb-4 mb-8`}
          {...register('title', { required: true, maxLength: 50 })}
          />
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={getValues('description')}
            init={{
              placeholder: "Product Description...",
              height: 500,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar: 'undo redo | formatselect | ' +
              'bold italic backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            }} />
      </div>
      <div className='w-full border-[1px] border-gray-200 rounded-xl md:mr-0 mr-[1rem] mt-4 pb-6'>
        <div>
          <p className='m-4 font-semibold'>Product Details:</p>
            <div
              className='flex gap-2 items-center ml-4 cursor-pointer'
              onClick={() => setValue('isAvailable', !getValues('isAvailable'))}>
              <p className={isAvailable ? "font-semibold" : "font-normal"}>Is Available?</p>
              <div className={`w-5 h-5 rounded-md p-[1.5px]
                ${isAvailable ? "bg-gray-700" : "bg-white border-2 border-gray-200"}`}>
              {isAvailable && <BsCheck fill='white' size='18px' />}
            </div>
          </div>
              <div className='m-4 grid grid-cols-2 gap-3 w-1/2'>
                  <div className="col-span-1 lg:col-span-2">
                    {errors.quantity && (<p className='text-xs text-reddish ml-1'>Please enter quantity</p>)}
                    <input
                    style={ errors.quantity && { border: "1px", borderStyle: "solid", borderColor: "red" } }
                    className='w-full dashboard-input'
                    placeholder='Quantity'
                    type='number'
                    {...register('quantity', {required: true, maxLength: 10})}/>
                  </div>
                <div className="col-span-1 lg:col-span-2">
                  {errors.price && (<p className='text-xs text-reddish ml-1'>Please enter price</p>)}
                    <input
                      style={ errors.price && { border: "1px", borderStyle: "solid", borderColor: "red" } }
                      placeholder='Price'
                      type='number'
                      className='w-full dashboard-input'
                      {...register('price', {required: true, maxLength: 50})}/>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-1">
          <div className="flex-1 flex-col gap-2 items-start ml-4 my-4 lg:mx-4">
            <p className="ml-1">Category</p>
              <ul className='overflow-y-auto flex flex-col w-full h-64 border-[1px] border-gray-200 rounded-xl mt-4 p-4 mr-4 md:mr-0 scrollbar-thin
            scrollbar-thumb-gray-200 scrollbar-track-gray-100'>
              {cats[0] ?
                cats.map((cat, i) => (
                  <CatList
                    key={cat._id}
                    cat={cat}
                    i={i}
                    thisCategory={thisCategory}
                    onCategorySelect={onCategorySelect}
                  />
                )) : <div>No categories created yet.
                    <Link href={'/admin/dashboard/categories'}>
                      <p className="text-blueish font-semibold">
                        Create one.
                      </p>
                    </Link>
                  </div>
              }
          </ul> 
          </div>
          <div className="flex-1 flex-col gap-2 items-start my-4 mx-4"> 
            <p className="ml-1">Variables</p>
              <ul className="overflow-y-auto flex flex-col w-full h-64 border-[1px] border-gray-200 rounded-xl mt-4 p-4 mr-4
              md:mr-0 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-500 scrollbar-track-gray-100">
                {thisCategory._id && thisCategory.vars &&
                  thisCategory.vars[0] &&
                  thisCategory.vars.map((thisVariable, outerIndex, ref) => (
                    <VarList
                      key={`var${outerIndex}`}
                      thisVariable={thisVariable}
                       outerIndex={outerIndex}
                       length={ref.length}
                      onOptionSelect={onOptionSelect}
                      register={register}
                     />
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
              handleOpenUpload={() => setValue('openUpload', true)}
              />
          </div>
          <div className="col-span-2 md::col-span-1">
          <ImagesBox
              title='Gallery:'
              useFor="multiple"
              images={images}
              setValue={setValue}
              handleOpenUpload={() => setValue('openUpload', true)}
              />
          </div>
        </div>
        <button className='dashboard-btn' type='submit'>{useFor}</button>
    </form>
      {
        openUpload
        &&
        <UploadModal
          removeImg={removeImg}
          setValue={setValue}
          moveImg={moveImg}
          images={images}
          closeHandler={() => setValue('openUpload', false)}
        />
        }
    </div>
  );
};

export default AddEditProductForm