import {useQuery, dehydrate} from "@tanstack/react-query";
import {allCategories} from "../../../apis";
import ListItem from "../../../components/admin-panel/ListItem";
import Loading from "../../../components/main/Loading";
import { Category } from "../../../lib/interfaces";
import { queryClient } from "../../_app";

export async function getStaticProps() {
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
    <div>
      {
        !categories[0] ?
        <p className='font-light'>No Category found.</p>
          :
          categories.map((category:Category) => (
            <ListItem
              key={category._id}
              title={category.name}
              _id={category._id}
              isCategory={true}
              categories={categories}
            />
        ))
      }
   </div>
  )
};

export default Categories;
