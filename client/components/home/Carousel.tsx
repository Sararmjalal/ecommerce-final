import { Product } from "../../lib/interfaces"
import ProductCard from './ProductCard'

const Carousel = ({ products }: {products: Product[]}) => (
    products?.length ? 
    <div className='grid grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 items-center gap-16 sm:gap-8'>
      {products.map((product) => (
      <ProductCard
          key={product._id}
          _id={product._id}
        img={product.images[0]}
        title={product.title}
        price={product.price}
      />
    ))}
    </div>
      :
    <p className="text-lg text-center font-semibold mt-20 mb-28">No products available yet!</p>
)

export default Carousel