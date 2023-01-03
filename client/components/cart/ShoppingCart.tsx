import React from "react";
import CartItemCard from "./CartItemCard";
import {toast} from "react-toastify";
import Checkout from "./Checkout";
import {AiOutlineArrowLeft} from 'react-icons/ai'
import Link from "next/link";

const ShoppingCart = (props:{setCheckoutStep:React.Dispatch<React.SetStateAction<string>>, cartItems}) => {
 
  const calcTotalPrice = props.cartItems.reduce(
    (prevVal:number, currentVal:number) => prevVal + currentVal.price * currentVal.ammount,
    0
  );
 
  return (
    <>
      <div className='md:hidden grid grid-cols-12 w-full gap-2 text-center md:text-start my-4'>
        <div className=' col-span-4 md:col-span-12 text-grayish'>
          <p>Product</p>
        </div>
        <div className=' col-span-2 md:col-span-4 text-grayish'>
          <p>Color</p>
        </div>
        <div className=' col-span-1 md:col-span-2 text-grayish'>
          <p>Size</p>
        </div>
        <div className=' col-span-3 md:col-span-6 text-grayish'>
          <p>Amount</p>
        </div>
        <div className=' col-span-1 md:col-span-3 text-grayish'>
          <p>Price</p>
        </div>
        <div className=' col-span-1 md:col-span-3 text-grayish'></div>
      </div>
      {props.cartItems.length ? (
        props.cartItems.map((cartItem) => {
          return (
            <CartItemCard
              key={cartItem.id}
              id={cartItem.id}
              image={cartItem.image}
              title={cartItem.title}
              color={cartItem.color}
              size={cartItem.size}
              ammount={cartItem.ammount}
              price={cartItem.price}
            />
          );
        })
      ) : (
        <p className='text-grayish text-center mt-5'>
          There is no items in your cart!
        </p>
      )}
      <div className="flex md:flex-col md:gap-4 justify-between items-center mt-20 md:mt-10">
        <Link href={'/shop'}>
          <div className="flex items-center gap-6 hover:scale-110 transition duration-200 cursor-pointer">
            <AiOutlineArrowLeft/>
            <button className='font-semibold'>
              Continue Shopping
            </button>
          </div>
        </Link>
        <div className='flex md:flex-col items-center gap-12 sm:gap-4'>
          <p>Total Cost:</p>
          <p>${calcTotalPrice}</p>
          <button className='btn-primary text-base py-3' onClick={()=>props.setCheckoutStep('checkout')}>
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
