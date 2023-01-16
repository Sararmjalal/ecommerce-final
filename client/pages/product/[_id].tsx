import React, {useState} from "react";
import Description from "../../components/single-product/Description";
import Header from "../../components/single-product/Broadcamps";
import ProductCard from "../../components/single-product/ProductCard";
import Reviews from "../../components/single-product/Reviews";
import TopProducts from "../../components/home/TopProducts";
import { allProducts, singleProduct, submitComment } from "../../apis";
import { AddCommentBody, Product } from "../../lib/interfaces";
import { GetStaticPropsContext } from "next";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loading from "../../components/main/Loading";
import Head from "next/head";
import { useTitle } from "../../lib";

interface SinglePageProps {
  secMode: string,
  product: null | Product
}


export async function getStaticPaths() {
  const products = await allProducts()
  return {
    paths: products.map((product: Product) => ({ params: { _id: product._id } })),
    fallback: 'blocking'
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const thisId = context?.params?._id
    const initialProduct = typeof thisId === 'string' ? await singleProduct(thisId) : {}

    return {
    props: { initialProduct }
    }
    
  } catch (error) {
    return {
      notFound: true
    }
  }
}

const SingleProduct = ({ initialProduct }: { initialProduct: Product }) => {
  
  const [secMode, setSecMode] = useState("description");
  const [pageData, setPageData] = useState<SinglePageProps>({
    product: null,
    secMode: 'description'
  })
  
  const { data } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['products', initialProduct._id],
    queryFn: async () => await singleProduct(initialProduct._id),
    onSuccess: () => {
      const newVars: {}[]  = []
      Object.entries(initialProduct.variables).forEach(([key, value]:any) => {
        newVars.push({
          name: key,
          options: value.map((opt: string, index:number) => (
            index === 0 ? { name: opt, isSelected: true }
            :
            {name: opt, isSelected: false}
          ))
        }) 
      })  
      setPageData({...pageData, product:{...initialProduct, variables: newVars}})
    }
  })


  console.log(pageData.product)
  
  if(!pageData.product) return <Loading/>
  return (
    <div>
      <Head>
        <title>{useTitle(pageData.product.title)}</title>
        <meta name='description' content='Developed by Hamidreza Hashemi and Sara Jalal' />
      </Head>
      <div className='w-full flex flex-col justify-between items-start md:gap-5 gap-8 xs:gap-12 md:items-center'>
        <Header
          productTitle= {pageData.product.title}
        />
        <ProductCard
          product={pageData.product}
          setProduct={(newValue: Product) => setPageData({...pageData, product: newValue})}
        />
      </div>
      <div className='flex flex-col justify-start mt-28'>
        <div className='flex justify-center items-center gap-3'>
          <button
            onClick={() => setSecMode("description")}
            className={`${
              secMode === "description"
              ? "btn-primary w-[189px] py-3 font-semibold"
              : "btn-secondary w-[189px] py-3 font-normal"
            }`}>
            Description 
          </button>
          <button
            onClick={() => setSecMode("reviews")}
            className={`${
              secMode === "reviews"
                ? "btn-primary w-[189px] py-3 font-semibold"
                : "btn-secondary w-[189px] py-3 font-normal"
            }`}>
            Reviews
          </button>
        </div>
        {secMode === "description" ?
          <Description
            description={pageData.product.description}
          />
          :
          <Reviews
            product = {pageData.product}
          />}
      </div>
      {/* <TopProducts /> */}
    </div>

  );
};

export default SingleProduct;
