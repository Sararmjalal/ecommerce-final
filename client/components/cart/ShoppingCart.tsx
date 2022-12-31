import React from "react";
import CartItemCard from "./CartItemCard";
import {toast} from "react-toastify";
import Checkout from "./Checkout";

const ShoppingCart = () => {
  const cartItems = [
    {
      id: 1,
      image: "/assets/products/product-1.png",
      title: "T-shirt Summer Vibes",
      color: "White",
      size: "XL",
      ammount: 2,
      price: 89.99,
    },
    {
      id: 2,
      image: "/assets/products/product-2.png",
      title: "Basic Slim-Fit T-shirt",
      color: "Black",
      size: "XL",
      ammount: 2,
      price: 69.99,
    },
  ];

  const calcTotalPrice = cartItems.reduce(
    (prevVal, currentVal) => prevVal + currentVal.price * currentVal.ammount,
    0
  );

  const nextStepHandle = () => <Checkout />;

  return (
    <>
      <div className='grid grid-cols-12 w-full gap-2 text-center md:text-start my-4'>
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
          <p>Ammount</p>
        </div>
        <div className=' col-span-1 md:col-span-3 text-grayish'>
          <p>Price</p>
        </div>
        <div className=' col-span-1 md:col-span-3 text-grayish'></div>
      </div>
      {cartItems.length ? (
        cartItems.map((cartItem) => {
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
      <div className='flex md:flex-col items-center justify-end gap-12 sm:gap-4 mt-20'>
        <p>Total Cost:</p>
        <p>${calcTotalPrice}</p>
        <button className='btn-secondary py-3'>
          Continue Shopping
        </button>
        <button className='btn-primary text-base py-3' onClick={nextStepHandle}>
          Next Step
        </button>
      </div>
    </>
  );
};

export default ShoppingCart;
