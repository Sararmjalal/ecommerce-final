import {useQuery, dehydrate} from "@tanstack/react-query";
import {allProducts} from "../../../apis";
import ListItem from "../../../components/admin-panel/ListItem";
import Loading from "../../../components/main/Loading";
import { Product } from "../../../lib/interfaces";
import { queryClient } from "../../_app";

export async function getStaticProps() {
  await queryClient.prefetchQuery(['products'], allProducts)
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    }
  }
}

const Products = () => {
  const {data: products, isLoading} = useQuery({
    queryKey: ["products"],
    queryFn: async() => await allProducts(),
  });

  console.log(products)

  if(isLoading) return <Loading />
  return (
    <div>
    {
      !products[0] ?
      <p className='font-light'>No Product found.</p>
        :
        products.map((product:Product) => (
          <ListItem
            key={product._id}
            title={product.title}
            _id={product._id}
            isProduct={true}
            img={product.images[0]}
          />
      ))
    }
 </div>
  )
};

export default Products