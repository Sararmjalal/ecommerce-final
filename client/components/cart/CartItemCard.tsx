import React from "react";
import Image from "next/image";
import {AiOutlineClose, AiOutlinePlus, AiOutlineMinus} from "react-icons/ai";
import { changeCart, myCart, removeFromCart } from "../../apis";
import { useMutation, useQuery } from "@tanstack/react-query"
import { singleProduct } from "../../apis";
import Loading from "../main/Loading";
import { CartItemCardProps, ChangeCartBody } from "../../lib/interfaces";
import { useDispatch } from "react-redux";
import { setCurrentCart } from "../../global-state/slice";

const CartItemCard = ({ thisProductId, quantity, thisVariables, userId }: CartItemCardProps) => {

  const dispatch = useDispatch()

  const changeQuantity = useMutation({
    mutationFn: async (cartInfo: ChangeCartBody) => await changeCart(cartInfo),
    onSuccess: async () => {
      const newCart = await myCart()
      dispatch(setCurrentCart(newCart['cart']))
    },
  })

  const removeMutation = useMutation({
    mutationFn: async () => await removeFromCart({
      productId: thisProductId,
      userId
    }),
    onSuccess: async () => {
      const newCart = await myCart()
      dispatch(setCurrentCart(newCart['cart']))
    },
  })

  const { data, isLoading } = useQuery({
    queryKey: ['products', thisProductId],
    queryFn: async() => await singleProduct(thisProductId)
  })

  const changeCartOnClick = (newQuantity: number) => {
    newQuantity == 0 ?
      removeMutation.mutate()
      :
    changeQuantity.mutate({
      quantity: newQuantity,
      userId,
      productId:thisProductId
    })
  }

  if(isLoading) return <Loading />
  return (
    <div className='grid grid-cols-12 gap-4 w-full text-center items-center my-4 border-[1px] border-grayborder rounded-lg p-2'>
      <div className=' col-span-4 md:col-span-12 '>
        <div className='flex items-center gap-10'>
          <div className='relative object-cover w-16 h-16'>
            <Image
              src={`${process.env.SERVER}/${data.images[0]}`}
              alt={data.title}
              fill
              className='rounded-full'
            />
          </div>
          <div className='flex flex-col items-start text-start'>
            <p>{data.title}</p>
          </div>
        </div>
      </div>
      <div className=' col-span-2 md:col-span-4'>
        {
          Object.keys(thisVariables).map(key => (
            key.toLowerCase() === 'color' && thisVariables[key].includes('#') &&
              <div key={key + thisVariables[key]} className="w-4 h-4 rounded-full m-auto" style={{background: thisVariables[key]}}></div>
          ))
        }
      </div>
      <div className='col-span-1 md:col-span-2'>
        {
          Object.keys(thisVariables).map(key => (
            key.toLowerCase() === 'size' &&
            <div key={key + thisVariables[key]} className="w-4 h-4 rounded-full m-auto">{thisVariables[key]}</div>
          ))
        }
      </div>
      <div className=' col-span-3 md:col-span-6'>
        <div className='flex justify-between mx-auto items-center px-7 md:px-2 py-3 w-32 md:w-20 h-12 border-[1px] border-grayborder rounded-full'>
          <AiOutlineMinus cursor={"pointer"} onClick={ () => changeCartOnClick(quantity - 1)} />
          <p className='font-bold'>{quantity}</p>
          <AiOutlinePlus cursor={"pointer"} onClick={ () => changeCartOnClick(quantity + 1)} />
        </div>
      </div>
      <div className=' col-span-1 md:col-span-3'>
        <p>${data.price * quantity}</p>
      </div>
      <div className=' col-span-1 md:col-span-3'>
        <AiOutlineClose className="cursor-pointer" onClick={() => removeMutation.mutate()}/>
      </div>
    </div>
  );
};

export default CartItemCard;
