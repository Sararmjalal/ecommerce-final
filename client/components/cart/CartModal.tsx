import React from "react";
import {AiFillDelete} from "react-icons/ai";

const CartModal = () => {
  const cartItems = [
    {
      id: 1,
      image: "/assets/products/product-1.png",
      title: "T-shirt Summer Vibes",
      color: "White",
      size: "XL",
      ammount: 2,
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque provident quisquam impedit iusto, consequuntur est fugit ducimus autem totam natus aperiam quam nisi minima facilis fuga? Eos velit porro optio.",
      price: 89.99,
    },
    {
      id: 2,
      image: "/assets/products/product-2.png",
      title: "Basic Slim-Fit T-shirt",
      color: "Black",
      size: "XL",
      ammount: 1,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis sit facere similique modi a. Esse fuga delectus facere sunt quam.",
      price: 69.99,
    },
  ];

  const calcTotalPrice = cartItems.reduce(
    (prevVal, currentVal) => prevVal + currentVal.price * currentVal.ammount,
    0
  );

  return (
    <div className='absolute right-5 top-20 z-[1000] bg-white p-5 '>
      <p className='mb-7 text-grayish font-light text-2xl'>
        Products in your cart
      </p>
      {cartItems ? (
        cartItems.map((item) => (
          <div key={item.id} className='flex items-center gap-5 mb-7'>
            <img src={item.image} alt='' className='w-20 h-24 object-cover ' />
            <div>
              <p className='text-lg '>{item.title}</p>
              <p className='text-grayish mb-2 text-xs'>
                {item.description.substring(0, 80)}
              </p>
              <p className='text-blueish'>
                {item.ammount} * ${item.price}
              </p>
            </div>
            <AiFillDelete className='hover:text-reddish transition-all text-2xl cursor-pointer' />
          </div>
        ))
      ) : (
        <p>There is no item in your cart.</p>
      )}
      <div className='flex justify-between text-lg mb-5'>
        <span>SUBTOTAL</span>
        <span>${calcTotalPrice.toFixed(2)}</span>
      </div>
      <button className='btn-primary'>PROCEED TO CHECKOUT</button>
      <span className='text-reddish text-xs cursor-pointer'>Reset Cart</span>
    </div>
  );
};

export default CartModal;
