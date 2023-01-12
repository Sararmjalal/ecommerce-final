import React from "react";
import {AiFillDelete} from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectCart, selectUser } from "../../global-state/slice";
import CartItem from "./CartItem";

const CartModal = ({ closeHandler }: { closeHandler: () => void }) => {
  
  const thisCart = useSelector(selectCart)

  const thisUser = useSelector(selectUser)

  return (
    <>
      <div className='modal-backdrop opacity-0' onClick={closeHandler} />
      <div className='absolute right-5 top-20 z-[1000] bg-white p-5 w-[500px] md:w-full md:right-0 shadow-md'>
        <p className='mb-7 text-grayish font-light text-2xl'>
          Products in your cart
        </p>
          <div className="max-h-[300px] overflow-y-auto mb-4">
          {thisUser?._id && thisCart?.items[0] ? 
            <>
              <div className="px-2">
                {
                thisCart.items.map((item) => (
                <CartItem
                    productId={item.productId}
                    userId={thisUser._id}
                    thisAmount={item.quantity}
                />
              ))}
              <div className='flex justify-between text-lg mb-5'>
                <span className="font-semibold">Subtotal:</span>
                <span className="font-semibold">${thisCart.total}</span>
              </div>
              </div>
              <div className="flex justify-between">
                <button className='btn-secondary py-2 font-normal'>View Cart</button>
                <button className='btn-primary py-2'>Proceed to Checkout</button>
              </div>
            </>
         :
          <p>There is no item in your cart.</p>
          }
        </div>
      </div>
    </>
  );
};

export default CartModal;
