import React, {useState} from "react";
import Image from "next/image";
import ColorCard from "./ColorCard";
import {AiOutlinePlus, AiOutlineMinus, AiOutlineHeart} from "react-icons/ai";
import { AddCartBody, Product } from "../../lib/interfaces";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addToCart, myCart } from "../../apis";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setCurrentCart } from "../../global-state/slice";
import ThirdVariable from "../admin-panel/categories/ThirdVariable";
import { toast } from "react-toastify";

const ProductCard = ({ product, setProduct }: { product: Product, setProduct:(newValue: Product)=> void }) => {

  const thisUser = useSelector(selectUser);
  const dispatch = useDispatch()
  const [singleProductData, setSingleProductData] = useState({
    selectedImg: 0,
  });
  
  const [quantity, setQuantity] = useState(1)

  const addCart = useMutation({
    mutationFn: async (body: AddCartBody) => await addToCart(body),
    onSuccess: async () => {
      toast.success('Added to cart successfully')
      const thisCart = await myCart()
      dispatch(setCurrentCart(thisCart['cart']))
    }
  })

  const onSubmit = () => {
    if (!thisUser) return toast.error('Please login before shopping!')

    const thisVariables: any = {}
    Array.isArray(product.variables) &&
      product.variables.forEach((variable: any) => {
        variable.options.forEach((option: any) => {
          if (option.isSelected) thisVariables[variable.name] = option.name
        })
      })
    
      addCart.mutate({
        productId: product._id,
        userId: thisUser._id,
        quantity,
        thisVariables,
      })
  }

  return (
    <div className='grid grid-cols-2 md:grid-cols-1 gap-40 md:gap-8'>
      <div>
        <Image
          src={`${process.env.SERVER}/${product.images[singleProductData.selectedImg]}`}
          alt='product-img'
          width={505}
          height={505}
          className='object-cover aspect-square object-top mb-2'
        />
        <div className='grid grid-cols-4 w-full gap-2'>
          {product.images.map((img, i) => (
            <Image
              onClick={() => setSingleProductData({...singleProductData, selectedImg: i})}
              src={`${process.env.SERVER}/${img}`}
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
          <p className='mt-4 text-3xl font-light md:text-lg'>
            {product.title}
          </p>
          <div className='flex justify-start items-center gap-6 text-3xl md:text-lg'>
            <p className=' text-grayish '>${product.price}</p>
          </div>
          {Array.isArray(product.variables) &&
          product.variables.map((variable: any) => (
            variable.name.toLowerCase() === 'color' ? (
              <div className='w-full border-[1px] border-grayborder p-6 mt-8'>
            <p className='font-semibold text-sm mb-6'>COLOR</p>
            <div className='flex flex-col gap-5'>
              <div className='flex justify-center gap-3 items-center'>
          {variable.options.map((color: {name: string, isSelected: boolean}, index: number, ref: {name: string, isSelected: boolean}[]) => (
            <ColorCard
             color={color.name}
              handleSelect={(selectedOption) => {
                ref.forEach(item => {
                  if (selectedOption === color.name) return item.isSelected = true
                  item.isSelected = false
                })
              }}
              selectedColor={color.isSelected ? color.name : ''}
             />
            ))}
              </div>
            </div>
              </div>
            ) : (
                variable.name.toLowerCase() === 'size' ? (
                  <div className='w-full border-[1px] border-grayborder p-6'>
                  <p className='font-semibold text-sm mb-6'>SIZE</p>
                  <div className='flex flex-col gap-5'>
                    <div className='flex justify-center items-center overflow-y-auto'>
                      {variable.options.map((size: {name: string, isSelected: boolean}, index: number, ref: {name: string, isSelected: boolean}[] ) => (
                        <div
                          className={`w-10 h-10 flex flex-col items-center justify-center cursor-pointer
                        ${
                          size.isSelected 
                            ? "bg-black text-white"
                            : "bg-white border-[1px] border-grayborder"
                        }`}
                          onClick={() => {
                            ref.forEach((element : {name: string, isSelected: boolean}) => {
                              element.isSelected = element.name === size.name
                            })
                            setProduct({...product})
                          }}>
                          <p>{size.name}</p>
                        </div>
                      ))} 
                    </div>
                  </div>
                </div>
                ) : (
                    variable.options.map((otherOption: {name: string, isSelected: boolean}, index: number , ref:{name: string, isSelected: boolean}[] ) => (
                  <div className='w-full border-[1px] border-grayborder p-6'>
                  <p className='font-semibold text-sm mb-6'>{otherOption.name.toUpperCase()}</p>
                  <div className='flex flex-col gap-5'>
                    <div className='flex justify-center items-center overflow-y-auto'>
                     <ThirdVariable
                      otherOption={otherOption}
                      handleSelect={(selectedOption: string ) => {
                        ref.forEach((element: {name: string, isSelected: boolean}) => {
                        element.isSelected = element.name === selectedOption
                      })
                      setProduct({...product})
                    }}
                            />
                    </div>
                  </div>
                </div>
                    ))
                ))     
            ))
          }
          <div className='flex flex-col justify-start mt-8 text-sm font-light'>
            <div className='flex flex-col justify-start mt-8 text-sm font-light'>
              <p className=' mb-2'>Quantity:</p>
              <div className='flex justify-start items-center gap-4 w-full'>
                <div className='flex justify-between items-center px-7 md:px-2 py-3 w-32 md:w-20 h-12 border-[1px] border-grayish rounded-full'>
                  <AiOutlineMinus
                    cursor={"pointer"}
                    onClick={() => setQuantity((prev) => prev === 1 ? 1 : prev - 1)}
                  />
                  <p className='font-bold'>{quantity}</p>
                  <AiOutlinePlus
                    cursor={"pointer"}
                    onClick={() => setQuantity((prev) => prev === product.quantity? product.quantity : prev + 1)}
                  />
                </div>
                {product.isAvailable ? (
                  <button onClick={onSubmit} className='btn-secondary border-[1px] py-3 border-grayish hover:border-primary md:px-2 xs:text-[10px]'>
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
                {quantity === product.quantity && <p className="text-xs ml-4 text-reddish">Only { quantity } left in stock!</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
