import React, {useState} from "react";
import GuideLink from "../components/main/GuideLink";
import ShoppingCart from "../components/cart/ShoppingCart";
import Checkout from "../components/cart/Checkout";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {MdOutlineLocalShipping} from "react-icons/md";
import Head from "next/head";
import { useTitle } from "../lib";
import { dehydrate, useQuery, useMutation } from "@tanstack/react-query";
import { myCart, changeCart } from "../apis";
import { CartBody } from "../lib/interfaces";
import { queryClient } from "./_app";


export async function getStaticProps() {
  await queryClient.prefetchQuery(['cart'], myCart)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}


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


const Cart = () => {
  const { data: cart } = useQuery({ queryKey: ['cart'], queryFn: myCart })

  const [checkoutStep, setCheckoutStep] = useState("shoppingcart");

  console.log(cart)
  return (
    <div>
      <Head>
        <title>{useTitle('Cart')}</title>
        <meta name='description' content='Developed by Hamidreza Hashemi and Sara Jalal' />
      </Head>
      <GuideLink
        args={[
          {
            name: "Cart",
            href: {
              pathname: "/cart",
            },
          },
        ]}
      />
      <div className='main-container flex-col'>
        <div className='flex sm:flex-col justify-between items-center sm:justify-center mb-16 sm:mb-10'>
          <p className='text-xl font-semibold'>
            {checkoutStep === "shoppingcart" ? "Shopping Cart" : "Shipping and Delivery"}
          </p>
          <div className='flex items-center gap-4 md:mt-4'>
            <div
              className={`${checkoutStep === "shoppingcart" ? "flex items-center justify-center w-9 h-9 bg-primary rounded-full text-white cursor-pointer": "flex items-center justify-center text-grayish  w-9 h-9 cursor-pointer"}`}
                onClick={() => setCheckoutStep("shoppingcart")}>
              <AiOutlineShoppingCart />
            </div>
            <div className='w-16 h-[1px] bg-grayborder'></div>
            <div
              className={`${
                checkoutStep === "checkout" ? "flex items-center justify-center w-9 h-9 bg-primary rounded-full text-white cursor-pointer" : "flex items-center justify-center text-grayish  w-9 h-9 cursor-pointer" }`}
                onClick={() => setCheckoutStep("checkout")}>
              <MdOutlineLocalShipping />
            </div>
          </div>
        </div>
        {checkoutStep === "shoppingcart" ? <ShoppingCart cartItems={cartItems} setCheckoutStep={setCheckoutStep} /> : <Checkout />}
      </div>
    </div>
  );
};

export default Cart;
