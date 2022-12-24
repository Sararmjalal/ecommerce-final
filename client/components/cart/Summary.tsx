import React from "react";
import CartItemCard from "./CartItemCard";
import Image from "next/image";

const Summary = () => {
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

  const paymentIcons = [
    "assets/icons/paypal.png",
    "assets/icons/visa.png",
    "assets/icons/mastercard.png",
    "assets/icons/maestro.png",
    "assets/icons/discover.png",
    "assets/icons/ideal.png",
  ];

  const calcTotalPrice = cartItems.reduce(
    (prevVal, currentVal) => prevVal + currentVal.price * currentVal.ammount,
    0
  );
  return (
    <div className='flex flex-col gap-6'>
      <div className='grid grid-cols-12 gap-4 w-full'>
        {/* <div className=' w-full'> */}
        <span>Payment Methods:</span>
        <div className='col-span-5 md:col-span-12 grid grid-cols-3 '>
          {paymentIcons.map((icon) => (
            <div className='relative col-span-1 w-32 md:w-20 xl:w-28 h-14 p-2 border-[1px] border-grayborder sm:border-none rounded-full mb-4 flex items-center justify-center'>
              <Image src={icon} alt='icon' width={40} height={20} />
            </div>
          ))}
        </div>
        <div className='col-span-3 md:col-span-4 bg-blueish'>w</div>
        <div className='col-span-4 md:col-span-8 bg-blueish'>w</div>
        {/* </div> */}
      </div>
      <div className='flex flex-col'>
        <p>Your cart</p>
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
      </div>
    </div>
  );
};

export default Summary;
