import React, {useState} from "react";
import Description from "../../components/single-product/Description";
import Header from "../../components/single-product/Broadcamps";
import ProductCard from "../../components/single-product/ProductCard";
import Reviews from "../../components/single-product/Reviews";
import TopProducts from "../../components/home/TopProducts";
import { allProducts, singleProduct } from "../../apis";
import { Product } from "../../lib/interfaces";
import { GetStaticPropsContext } from "next";


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
    const product = typeof thisId === 'string' ? await singleProduct(thisId) : {}
    // const thisCategory = (await allCategories()).find((cat:Category) => cat._id === product.categoryId)

    return {
    props: { product }
    }
    
  } catch (error) {
    return {
      notFound: true
    }
  }
}

const SingleProduct = ({ product }: { product: Product }) => {
  
  const [secMode, setSecMode] = useState("description");
  return (
    <div>
      <div className='w-full flex flex-col justify-between items-start md:gap-5 gap-8 xs:gap-12 md:items-center'>
        <Header />
        <ProductCard
          product ={product}
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
            description={product.description}
          />
          :
          <Reviews
            score={product.averageScore}
          />}
      </div>
      {/* <TopProducts /> */}
    </div>
  );
};

export default SingleProduct;
