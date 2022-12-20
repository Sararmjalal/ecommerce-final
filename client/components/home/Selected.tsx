import React from "react";
import {homeProductsProps} from "../../lib/staticData";
import SelectedProductCard from "./SelectedProductCard";

const Selected = () => {
  return (
    <div className='main-container flex-col mb-auto'>
      <div className='flex justify-between items-center sm:justify-center mb-16 sm:mb-10'>
        <p className='text-2xl'>Selected just for you</p>
        <button className='btn-secondary border-[1px] border-grayish hover:border-primary sm:hidden'>
          SHOW MORE
        </button>
      </div>
      <div className='grid grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 items-center gap-16 sm:gap-8'>
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
      <button className='btn-secondary border-[1px] border-grayish hover:border-primary hidden sm:block mt-8 w-max m-auto'>
        SHOW MORE
      </button>
    </div>
  );
};

export default Selected;
