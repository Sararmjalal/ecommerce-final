import React from "react";
import Image from "next/image";
import ColorCard from "./ColorCard";
import {AiOutlinePlus, AiOutlineMinus, AiOutlineHeart} from "react-icons/ai";

const ProductCard = () => {
  const colors = ["black", "#FFE3B7", "#2900FF", "white"];
  return (
    <div className='grid grid-cols-12 w-full h-screen gap-5 '>
      <div className='relative col-span-2 md:col-span-3 h-[40%] md:h-[60%] sm:h-[30%] cursor-pointer'>
        <Image
          src={"/assets/products/product-1.png"}
          alt='product-img'
          fill
          className='object-cover'
        />
      </div>
      <div className='relative col-span-4 md:col-span-9 h-[80%] md:w-full'>
        <Image
          src={"/assets/products/product-1.png"}
          alt='product-img'
          fill
          className='object-cover'
        />
      </div>
      <div className='col-span-6 md:col-span-10 ml-10 '>
        <div className='relative flex flex-col w-full'>
          <div className='badge-red'>SALE</div>
          <p className='mt-4 text-3xl font-light md:text-lg'>
            T-Shirt Summer Vibes
          </p>
          <div className='flex justify-start items-center gap-6 text-3xl md:text-lg'>
            <p className=' text-reddish '>$89.99</p>
            <p className=' text-grayish line-through '>$119.99</p>
          </div>
          <div className='flex flex-col justify-start mt-8 text-sm font-light'>
            <p className=' mb-2'>Color:</p>
            <div className='flex justify-start items-center gap-4 md:gap-1 lg:gap-2 w-[80%]'>
              {colors.map((color: string) => (
                <ColorCard color={color} />
              ))}
            </div>
          </div>
          <div className='flex flex-col justify-start mt-8 text-sm font-light'>
            <div className='flex justify-start items-center gap-10  mb-2'>
              <p>Size:</p>
              <p>See size table</p>
            </div>
            <select className='input-primary w-[70%]'>
              <option className='select-none'>CHOOSE SIZE</option>
              <option>XL</option>
              <option>L</option>
              <option>M</option>
              <option>S</option>
            </select>
            <div className='flex flex-col justify-start mt-8 text-sm font-light'>
              <p className=' mb-2'>Quantity:</p>
              <div className='flex justify-start items-center gap-4 w-full'>
                <div className='relative flex justify-between items-center px-7 py-3 w-32 h-12 border-[1px] border-grayish rounded-full'>
                  <AiOutlineMinus cursor={"pointer"} />
                  <p className='font-bold'>1</p>
                  <AiOutlinePlus cursor={"pointer"} />
                </div>
                <button className='btn-primary'>Add to cart</button>
                <div className='flex justify-center items-center border-[1px] border-grayish w-12 h-12 rounded-full cursor-pointer bg-white hover:bg-reddish hover:text-white hover:scale-110 transition-all'>
                  <AiOutlineHeart size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
