import { useMutation, useQuery } from "@tanstack/react-query"
import { myCart, removeFromCart, singleProduct } from "../../apis"
import { AiFillDelete } from "react-icons/ai"
import Image from "next/image"
import { useDispatch } from "react-redux"
import { setCurrentCart } from "../../global-state/slice"
import { CartItemProps } from "../../lib/interfaces"

const CartItem = ({ productId, thisAmount, userId }: CartItemProps) => {
  
  const dispatch = useDispatch()
  
  const { data, isLoading } = useQuery({
    queryKey: ['products', productId],
    queryFn: async() => await singleProduct(productId)
  })

  const removeItem = useMutation({
    mutationFn: async () => await removeFromCart({ productId, userId }),
    onSuccess: async() => {
      const newCart = await myCart()
      dispatch(setCurrentCart(newCart['cart']))
    }
  })

  if (isLoading) return <></>
  return (
    <div className='grid grid-cols-5 items-center gap-5 mb-7'>
      <div className="relative w-20 h-20 rounded-2xl col-span-1">
        <Image
          fill
          src={`${process.env.SERVER}/${data.images[0]}`}
          alt='product in cart'
          className="object-cover rounded-full"
        />
      </div>
    <div className="col-span-3">
      <p className='text-lg '>{data.title}</p>
      <p className='text-grayish mb-2 text-xs' dangerouslySetInnerHTML={{__html:data.description.substring(0,80)}} />
      <p className='text-blueish'>
        {thisAmount} * ${data.price}
      </p>
    </div>
    <AiFillDelete onClick={() => removeItem.mutate()} className='text-2xl cursor-pointer col-span-1 w-max ml-auto' />
  </div>
  )

}

export default CartItem