import React, {useState} from "react";
import GuideLink from "../components/main/GuideLink";
import ShoppingCart from "../components/cart/ShoppingCart";
import Checkout from "../components/cart/Checkout";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {MdOutlineLocalShipping} from "react-icons/md";
import Head from "next/head";
import { useTitle } from "../lib";
import { useSelector } from "react-redux";
import { selectCart } from "../global-state/slice";
import { toast } from "react-toastify";

const Cart = () => {

  const [checkoutStep, setCheckoutStep] = useState("shoppingcart");

  const thisCart = useSelector(selectCart)

  const handleCheckout = () => {
    if (!thisCart || !thisCart.items[0]) return toast.error('You cant go on without having an empty cart!')
    setCheckoutStep('checkout')
  }

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
              className={`${checkoutStep === "shoppingcart" ? "flex items-center justify-center w-9 h-9 bg-primary rounded-full text-white cursor-pointer"
                :
                "flex items-center justify-center text-grayish  w-9 h-9 cursor-pointer"}`}
                onClick={() => setCheckoutStep("shoppingcart")}>
              <AiOutlineShoppingCart />
            </div>
            {
              thisCart && thisCart.items && thisCart.items[0] &&
              <>
                <div className='w-16 h-[1px] bg-grayborder'></div>
                <div
                  className={`${
                    checkoutStep === "checkout" ? "flex items-center justify-center w-9 h-9 bg-primary rounded-full text-white cursor-pointer"
                      : "flex items-center justify-center text-grayish  w-9 h-9 cursor-pointer"}`}
                    onClick={handleCheckout}>
                  <MdOutlineLocalShipping />
                </div>
              </>    
            }
          </div>
        </div>
        {checkoutStep === "shoppingcart" ? <ShoppingCart handleCheckout={handleCheckout} /> : <Checkout />}
      </div>
    </div>
  );
};

export default Cart;
