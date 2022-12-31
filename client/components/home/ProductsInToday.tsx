import React from "react";
import { Product } from "../../lib/interfaces";
import Carousel from "./Carousel";

const ProductsInToday = ({products}: {products: Product[]}) => {
  return (
    <div className='main-container flex-col mb-20'>
      <p className='head-text text-center'>
        Products in today
      </p>
       <Carousel products={products} />
    </div>
  );
};

export default ProductsInToday;
