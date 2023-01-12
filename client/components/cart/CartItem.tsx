import { useQuery } from "@tanstack/react-query"
import { singleProduct } from "../../apis"
import { AiFillDelete } from "react-icons/ai"

const CartItem = ({ productId, thisAmount }: {productId: string, thisAmount:number}) => {
  
  const { data, isLoading } = useQuery({
    queryKey: ['products', productId],
    queryFn: async() => await singleProduct(productId)
  })

  if (isLoading) return <></>
  return (
    <div key={data._id} className='grid grid-cols-6 items-center gap-5 mb-7'>
    <img
      src={data.images[0]}
      alt=''
      className='w-20 h-24 object-cover col-span-2'
    />
    <div className="col-span-3">
      <p className='text-lg '>{data.title}</p>
      <p className='text-grayish mb-2 text-xs'>
        {data.description.substring(0, 80)}
      </p>
      <p className='text-blueish'>
        {thisAmount} * ${data.price}
      </p>
    </div>
    <AiFillDelete className='hover:text-reddish transition-all text-2xl cursor-pointer col-span-1' />
  </div>
  )

}

export default CartItem