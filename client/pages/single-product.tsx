import React, {useState} from "react";
import Description from "../components/single-product/Description";
import Header from "../components/single-product/Broadcamps";
import ProductCard from "../components/single-product/ProductCard";
import Reviews from "../components/single-product/Reviews";
import TopProducts from "../components/home/TopProducts";

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
        {secMode === "description" ? <Description /> : <Reviews />}
      </div>
      {/* <TopProducts /> */}
    </div>
  );
};

export default SingleProduct;
