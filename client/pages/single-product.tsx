import React, {useState} from "react";
import Description from "../components/singleProduct/Description";
import Header from "../components/singleProduct/Header";
import ProductCard from "../components/singleProduct/ProductCard";
import Reviews from "../components/singleProduct/Reviews";

const SingleProduct = () => {
  const [secMode, setSecMode] = useState("description");
  return (
    <>
      <div className='px-40 pt-40 lg:px-10 md:py-20 sm:px-10 w-full h-fit flex flex-col justify-between items-start lg:gap-20 '>
        <Header />
        <ProductCard />
      </div>
      <div className='flex flex-col justify-start h-screen'>
        <div className='flex justify-center items-center gap-10'>
          <button
            onClick={() => setSecMode("description")}
            className='btn-primary'>
            Description
          </button>
          <button onClick={() => setSecMode("reviews")} className='btn-primary'>
            Reviews
          </button>
        </div>
        {secMode === "description" ? <Description /> : <Reviews />}
      </div>
    </>
  );
};

export default SingleProduct;
