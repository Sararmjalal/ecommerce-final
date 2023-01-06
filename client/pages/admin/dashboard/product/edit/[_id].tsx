import { useQuery } from "@tanstack/react-query"
import { GetStaticPropsContext } from "next"
import { useEffect } from "react"
import { allCategories, allProducts, singleProduct } from "../../../../../apis"
import AddEditProductForm from "../../../../../components/admin-panel/product/AddEditForm"
import DashboardThisName from "../../../../../components/main/DashboardThisName"
import Loading from "../../../../../components/main/Loading"
import { Category, EditProductNewData, EdtiProductProps, Product, ProductWithVars, ThisCategory } from "../../../../../lib/interfaces"
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
    
    return {
    props: { initialProduct, initialThisCategory, initialCategories }
    }

  } catch (error) {
    return {
      notFound: true
    }
  }
}

const EditProduct = ({ initialProduct, initialThisCategory, initialCategories }: EdtiProductProps) => {
  
  const [newData, setNewData] = useState<EditProductNewData>({
    thisCategory: initialThisCategory,
    thisProduct: initialProduct,
    status: ''
  })
  
   useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["categories"],
    queryFn: async () => await allCategories(),
    initialData: initialCategories,
    onSuccess: (data) => {
      const vars: {}[]  = []
      const newThisCat = data.find((item: ThisCategory) => item._id === initialProduct.categoryId)
        Object.entries(newData.thisCategory.variables).forEach(([key, val]) => {
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
      newThisCat['vars'] = vars
      setNewData({...newData, thisCategory:newThisCat})
    }
  })
  
  const { data:queryProduct } = useQuery({
    queryKey: ['singleProduct'],
    queryFn: async () => await singleProduct(initialProduct._id),
    initialData: initialProduct,
    enabled: !!newData?.thisCategory?.vars,
    onSuccess: (data) => {
        const vars: {}[]  = []
        Object.entries(data.variables).forEach(([key, val]:any) => {
          vars.push({
          name: key,
          options: val.map((opt:string) => ({name:opt}))
          })
        })
      setNewData({...newData, thisProduct:{...data, vars}, status:'ready'})
    }
  })

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
          title: queryProduct.title,
          isAvailable: queryProduct.isAvailable,
          price: queryProduct.price,
          quantity: queryProduct.quantity,
          cats: [],
          thisCategory: newData.thisCategory,
          images: queryProduct.images.map((img:string) => ({url: `${process.env.SERVER}/${img}`})),
          openUpload: false,
          files: [],
          description: queryProduct.description
        }}
        productId={queryProduct._id}
      />
    </>
  )
}

export default EditProduct