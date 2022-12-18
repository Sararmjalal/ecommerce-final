import React from "react";
import {homeProductsProps} from "../../lib/staticData";
import SelectedProductCard from "./SelectedProductCard";

const Selected = () => {
  return (
    <div className='main-container flex-col'>
      <div className='flex justify-between items-center'>
        <p className='text-2xl md:text-xl sm:text-lg'>Selected just for you</p>
        <button className='text-[10px] font-semibold px-8 py-4 md:px-4 md:py-4 border-[1px] border-grayish rounded-full bg-white text-black hover:bg-primary hover:text-white transition-all'>
          SHOW MORE
        </button>
      </div>
      <div className='flex md:flex-col justify-between items-center gap-9'>
        {homeProductsProps.map((product) => (
          <SelectedProductCard
            key={product.id}
            img={product.img}
            title={product.title}
            price={product.price}
            lastPrice={product.lastPrice}
            badge={product.badge}
          />
        ))}
      </div>
    </div>
  );
};

export default Selected;
