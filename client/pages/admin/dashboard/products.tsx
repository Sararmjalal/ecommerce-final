import {QueryClient, useQuery, dehydrate} from "@tanstack/react-query";
import {allProducts} from "../../../apis";
import List from "../../../components/admin-panel/List";
import Loading from "../../../components/main/Loading";

export async function getStaticProps() {
  const queryClient = new QueryClient
  await queryClient.prefetchQuery(['categories'], allProducts)
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    }
  }
}

const Products = () => {
  const {data: products, isLoading} = useQuery({
    queryKey: ["categories"],
    queryFn: allProducts,
  });

  if(isLoading) return <Loading />
  return (
    <List
    name='products'
    data={products}
    />
  )
};

export default Products