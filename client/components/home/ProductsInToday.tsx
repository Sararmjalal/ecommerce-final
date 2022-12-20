import React from "react";
import {homeProductsProps} from "../../lib/staticData";
import SelectedProductCard from "./ProductCard";

const ProductsInToday = () => {
  return (
    <div className='main-container flex-col'>
      <p className='head-text text-center'>
        Products in today
      </p>
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

export default ProductsInToday;
