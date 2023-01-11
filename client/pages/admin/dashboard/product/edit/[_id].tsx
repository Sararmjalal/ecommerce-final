import { useQuery } from "@tanstack/react-query"
import { GetStaticPropsContext } from "next"
import { useEffect } from "react"
import { allCategories, allProducts, singleProduct } from "../../../../../apis"
import AddEditProductForm from "../../../../../components/admin-panel/product/AddEditForm"
import DashboardThisName from "../../../../../components/main/DashboardThisName"
import Loading from "../../../../../components/main/Loading"
import { Category, EditProductNewData, Product, ProductWithVars, ThisCategory } from "../../../../../lib/interfaces"
import {useState} from 'react'

export async function getStaticPaths() {
  return {
    paths: (await allProducts()).map((product: Product) => ({ params: {_id: product._id} })),
    fallback: 'blocking'
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  
  try {
    const thisId = context?.params?._id
    const initialProduct = typeof (thisId) === 'string' ? await singleProduct(thisId) : {}
    const initialCategories = await allCategories()
    const initialThisCategory = initialCategories.find((cat: Category) => cat._id === initialProduct.categoryId)

    const thisCatVars: {}[]  = []
      Object.entries(initialThisCategory.variables).forEach(([key, val]:any) => {
        thisCatVars.push({
        name: key,
        type: val.type,
        isSelected: false,
        options: val.type === 'text' ?
          [{name: '', isSelected:false}] :
          val.options?.map((opt:string) => ({
            name: opt,
            isSelected: false
          }))
        })
      })
    
    initialThisCategory['isSelected'] = true
    
      const productVars: {}[]  = []
      Object.entries(initialProduct.variables).forEach(([key, val]:any) => {
        productVars.push({
        name: key,
        options: val.map((opt:string) => ({name:opt}))
        })
      })
      
    
    return {
      props: { initialProduct, initialThisCategory, initialCategories, thisCatVars, productVars },
      revalidate: 1
    }

  } catch (error) {
    return {
      notFound: true
    }
  }
}

const EditProduct = ({ initialProduct, initialThisCategory, thisCatVars, productVars }: any) => {
  
  const [newData, setNewData] = useState<EditProductNewData>({
    thisCategory: initialThisCategory,
    thisProduct: initialProduct,
    status: ''
  })

  useEffect(() => {
    setNewData({
      thisCategory: {
        ...initialThisCategory,
        vars: thisCatVars,
      },
      thisProduct: {
        ...initialProduct,
        vars: productVars
      },
      status:'ready'
    })
  }, [])
  
  const generateData = () => {
    const { thisProduct: productClone, thisCategory: catClone } = newData
    if (!catClone.vars || !productClone.vars) return

    for (let i = 0; i < catClone.vars.length; i++) {
      catClone.vars[i].isSelected = true
      for (let j = 0; j < catClone.vars[i].options.length; j++) {
        if (productClone.vars[i].options[j]) {
          if (catClone.vars[i].options[j]['name'] === productClone.vars[i].options[j]['name'])
          catClone.vars[i].options[j].isSelected = true
        }
      }
    }
    setNewData({thisCategory: catClone, thisProduct: productClone, status:'done'})
  }

  useEffect(() => {
    if (newData.status ==='ready') generateData()
  }, [newData])

  if (newData.status !== 'done') return <Loading />
  return (
    <>
      <DashboardThisName name={'Edit Product'} />
      <AddEditProductForm
        useFor="Edit Product"
        defaultValues={{
          title: initialProduct.title,
          isAvailable: initialProduct.isAvailable,
          price: initialProduct.price,
          quantity: initialProduct.quantity,
          cats: [],
          thisCategory: newData.thisCategory,
          images: initialProduct.images.map((img: string) => ({ url: img, dataUrl: '' })),
          // defaultImages: [...initialProduct.images],
          openUpload: false,
          files: [],
          description: initialProduct.description
        }}
        productId={initialProduct._id}
      />
    </>
  )
}

export default EditProduct