import React, {useState} from "react";
import Image from "next/image";
import ColorCard from "./ColorCard";
import {AiOutlinePlus, AiOutlineMinus, AiOutlineHeart} from "react-icons/ai";

const ProductCard = () => {
  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(0);
  const sizes = [
    {
      size: "XS",
    },
    {
      size: "S",
    },
    {
      size: "M",
    },
    {
      size: "L",
    },
    {
      size: "XL",
    },
    {
      size: "XXL",
    },
  ];
  const [selectedSize, setSelectedSize] = useState(sizes[0]["size"]);
  const isAvailable = true;
  const colors = ["black", "#FFE3B7", "#2900FF", "white"];
  const imgs = [
    "/assets/products/product-1.png",
    "/assets/products/product-2.png",
    "/assets/products/product-3.png",
    "/assets/products/product-4.png",
  ];
  return (
    <div className='grid grid-cols-2 md:grid-cols-1 gap-40 md:gap-8'>
      <div>
        <Image
          src={imgs[selectedImg]}
          alt='product-img'
          width={505}
          height={505}
          className='object-cover aspect-square object-top mb-2'
        />
        <div className='grid grid-cols-4 w-full gap-2'>
          {imgs.map((img, i) => (
            <Image
              onClick={() => setSelectedImg(i)}
              src={img}
              alt='product-img'
              width={120}
              height={120}
              className='object-cover aspect-square object-top cursor-pointer'
            />
          ))}
        </div>
      </div>
      <div>
        <div className='relative flex flex-col w-full'>
          <div className='badge-red w-max'>SALE</div>
          <p className='mt-4 text-3xl font-light md:text-lg'>
            T-Shirt Summer Vibes
          </p>
          <div className='flex justify-start items-center gap-6 text-3xl md:text-lg'>
            <p className=' text-reddish '>$89.99</p>
            <p className=' text-grayish line-through '>$119.99</p>
          </div>
          <div className='w-full border-[1px] border-grayborder p-6 mt-8'>
            <p className='font-semibold text-sm mb-6'>COLOR</p>
            <div className='flex flex-col gap-5'>
              <div className='flex justify-center gap-3 items-center'>
                {colors.map((color: string) => (
                  <ColorCard color={color} />
                ))}
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-start mt-8 text-sm font-light'>
            <div className='w-full border-[1px] border-grayborder p-6'>
              <p className='font-semibold text-sm mb-6'>SIZE</p>
              <div className='flex flex-col gap-5'>
                <div className='flex justify-center items-center overflow-y-auto'>
                  {sizes.map(({size}) => (
                    <div
                      className={`w-10 h-10 flex flex-col items-center justify-center cursor-pointer
                    ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-white border-[1px] border-grayborder"
                    }`}
                      onClick={() => setSelectedSize(size)}>
                      <p>{size}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-start mt-8 text-sm font-light'>
              <p className=' mb-2'>Quantity:</p>
              <div className='flex justify-start items-center gap-4 w-full'>
                <div className='flex justify-between items-center px-7 md:px-2 py-3 w-32 md:w-20 h-12 border-[1px] border-grayish rounded-full'>
                  <AiOutlineMinus
                    cursor={"pointer"}
                    onClick={() =>
                      setQty((prev) => (prev === 1 ? 1 : prev - 1))
                    }
                  />
                  <p className='font-bold'>{qty}</p>
                  <AiOutlinePlus
                    cursor={"pointer"}
                    onClick={() => setQty((prev) => prev + 1)}
                  />
                </div>
                {isAvailable ? (
                  <button className='btn-secondary border-[1px] border-grayish hover:border-primary md:px-2 xs:text-[10px]'>
                    Add to cart
                  </button>
                ) : (
                  <button disabled className='text-reddish font-semibold'>
                    Out of stock
                  </button>
                )}
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
