import {QueryClient, useQuery, dehydrate} from "@tanstack/react-query";
import {allCategories} from "../../../apis";
import List from "../../../components/admin-panel/List";
import Loading from "../../../components/main/Loading";

export async function getStaticProps() {
  const queryClient = new QueryClient
  await queryClient.prefetchQuery(['categories'], allCategories)
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    }
  }
}

const Categories = () => {
  const {data: categories, isLoading} = useQuery({
    queryKey: ["categories"],
    queryFn: allCategories,
  });

  if(isLoading) return <Loading />
  return (
    <List
    name='categories'
    data={categories}
    />
  )
};

export default Categories;
