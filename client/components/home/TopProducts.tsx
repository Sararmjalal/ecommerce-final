import { Product } from "../../lib/interfaces";
import Carousel from "./Carousel";

const TopProducts = ({ products }: {products: Product[]}) => {
  return (
    <div className='main-container flex-col mb-auto'>
      <div className='flex justify-between items-center sm:justify-center mb-16 sm:mb-10'>
        <p className='text-2xl'>Top Products</p>
        <button className='btn-secondary py-[15px] px-[32px] sm:hidden font-semibold'>
          SHOW MORE
        </button>
      </div>
      <Carousel products={products} />
      <button className='btn-secondary hidden sm:block mt-8 w-max m-auto py-[15px] px-[32px]'>
        SHOW MORE
      </button>
    </div>
  );
};

export default TopProducts;
