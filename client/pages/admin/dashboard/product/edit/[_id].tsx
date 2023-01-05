import { useQuery } from "@tanstack/react-query"
import { GetStaticPropsContext } from "next"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { allCategories, allProducts, singleProduct } from "../../../../../apis"
import AddEditProductForm from "../../../../../components/admin-panel/product/AddEditForm"
import DashboardThisName from "../../../../../components/main/DashboardThisName"
import Loading from "../../../../../components/main/Loading"
import { Category, Product } from "../../../../../lib/interfaces"

export async function getStaticPaths() {
  return {
    paths: (await allProducts()).map((product: Product) => ({ params: {_id: product._id} })),
    fallback: 'blocking'
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  
  try {
    const thisId = context?.params?._id
    const product = typeof (thisId) === 'string' ? await singleProduct(thisId) : {}
    const thisCategory = (await allCategories()).find((cat:Category) => cat._id === product.categoryId)

    return {
    props: { product, thisCategory }
    }
    
  } catch (error) {
    return {
      notFound: true
    }
  }
}

const EditProduct = ({ product, thisCategory }: { product: Product, thisCategory:Category }) => {
  
  const { data, isLoading } = useQuery({
    queryKey: ['singleProduct'],
    queryFn: async () => await singleProduct(product._id),
    initialData: product
  })

  const { data: thisCat } = useQuery({
    queryKey:['categories'],
    queryFn: async () => await allCategories(),
    onSettled: (data) => {
      return data.find((cat:Category) => cat._id === product._id)
    },
    initialData: thisCategory,
  })

  // useEffect(() => {
  //   abc(thisCat)
  // }, [])

  // const abc = (data2:any) => {
  //   const thisCatVars = Object.entries(data2.variables)
  //   const thisProductVars = Object.entries(data.variables)
  //     const catVars = thisCatVars.map(([key, val]:any) => ({
  //       name: key,
  //       type: val.type,
  //       options: val.type === 'text' ? [''] : val.options
  //     }))
  //   const productVars = thisProductVars.map(([key, val]) => ({
  //     name: key,
  //     options: val
  //   })) 

  //   const x = catVars.map((catVar, catVarIndex) => {
  //     productVars.map((productVar:any, productVarIndex) => {
  //       catVar.options.map((catOption:any) => {
  //         productVar.options.map((productOption: any) => {
  //           console.log(catOption === productOption)
  //           return ({
  //             ...catVars, options: [...catVar.options, {
  //               name: catOption,
  //               isSelected: catOption === productOption
  //             }]
  //           })
  //         })
  //       })
  //     })
  //   })
  //   console.log(x)
      // data2['vars'] = [...vars]
      // console.log(data2)
  // }
  
  // if (isLoading) return <Loading />

  return (
    <>
      <DashboardThisName name={'Edit Product'} />
      {/* <AddEditProductForm
        useFor="Edit Product"
        defaultValues={{
          title: data.title,
          isAvalible: data.isAvailable,
          cats: [],
          thisCategory: thisCat,
          images: product.images.map(img => ({url: `${process.env.SERVER}/${img}`})),
          openUpload: false,
          files: [],
          description: product.description
        }}
      /> */}
    </>
  )
}

export default EditProduct