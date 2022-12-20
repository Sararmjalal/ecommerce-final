import React, {useState} from "react";
import Description from "../components/single-product/Description";
import Header from "../components/single-product/Broadcamps";
import ProductCard from "../components/single-product/ProductCard";
import Reviews from "../components/single-product/Reviews";
import Selected from "../components/home/Selected";

const SingleProduct = () => {
  const [secMode, setSecMode] = useState("description");
  return (
    <div>
      <div className='w-full flex flex-col justify-between items-start md:gap-5 gap-8 xs:gap-12 md:items-center'>
        <Header />
        <ProductCard />
      </div>
      <div className='flex flex-col justify-start mt-28'>
        <div className='flex justify-center items-center gap-3'>
          <button
            onClick={() => setSecMode("description")}
            className={`${
              secMode === "description"
                ? "btn-secondary w-[189px] text-white bg-primary hover:border-primary md:px-2 xs:text-[10px]"
                : "btn-secondary w-[189px] border-[1px] border-grayish hover:border-primary md:px-2 xs:text-[10px]"
            }`}>
            Description
          </button>
          <button
            onClick={() => setSecMode("reviews")}
            className={`${
              secMode === "reviews"
                ? "btn-secondary w-[189px] text-white bg-primary hover:border-primary md:px-2 xs:text-[10px]"
                : "btn-secondary w-[189px] border-[1px] border-grayish hover:border-primary md:px-2 xs:text-[10px]"
            }`}>
            Reviews
          </button>
        </div>
        {secMode === "description" ? <Description /> : <Reviews />}
      </div>
      <Selected />
    </div>
  );
};

export default SingleProduct;
