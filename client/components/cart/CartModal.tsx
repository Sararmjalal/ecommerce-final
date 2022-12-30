import React from "react";
import {AiFillDelete} from "react-icons/ai";

const CartModal = ({closeHandler} : {closeHandler: () => void}) => {
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
    <>
      <div className='modal-backdrop opacity-0' onClick={closeHandler} />
      <div className='absolute right-5 top-20 z-[1000] bg-white p-5 w-[500px] md:w-full md:right-0 shadow-md'>
        <p className='mb-7 text-grayish font-light text-2xl'>
          Products in your cart
        </p>
        <div className="max-h-[300px] overflow-y-auto mb-4">
        {cartItems ? (
          cartItems.map((item) => (
            <div key={item.id} className='grid grid-cols-6 items-center gap-5 mb-7'>
              <img
                src={item.image}
                alt=''
                className='w-20 h-24 object-cover col-span-2'
              />
              <div className="col-span-3">
                <p className='text-lg '>{item.title}</p>
                <p className='text-grayish mb-2 text-xs'>
                  {item.description.substring(0, 80)}
                </p>
                <p className='text-blueish'>
                  {item.ammount} * ${item.price}
                </p>
              </div>
              <AiFillDelete className='hover:text-reddish transition-all text-2xl cursor-pointer col-span-1' />
            </div>
          ))
        ) : (
          <p>There is no item in your cart.</p>
          )}
        </div>
        <div className='flex justify-between text-lg mb-5'>
          <span className="font-semibold">Subtotal</span>
          <span className="font-semibold">${calcTotalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <button className='btn-secondary py-2 mb-3 font-normal'>View Cart</button>
          <button className='btn-primary py-2 mb-3'>Proceed to Checkout</button>
        </div>
        <span className='underline text-xs cursor-pointer'>Reset Cart</span>
      </div>
    </>
  );
};

export default CartModal;
