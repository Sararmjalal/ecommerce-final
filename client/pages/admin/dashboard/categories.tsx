import {useQuery} from "@tanstack/react-query";
import {allCategories} from "../../../apis";
import Loading from "../../../components/main/Loading";
import {Category} from "../../../lib/interfaces";

const Categories = () => {
  const {data: categories, isLoading} = useQuery({
    queryKey: ["categories"],
    queryFn: allCategories,
  });

  if(isLoading) return <Loading />
  return (
    <div>
      <h1 className='text-lg text-gray-700 font-semibold mb-4'>
        All Categories
      </h1>
      {categories.length === 0 ? (
        <p className='font-light'>No categories found.</p>
      ) : (
        categories.map((category: Category) => {
          return (
            <div className='flex items-center bg-gray-100 py-6 my-2 px-4 rounded-xl border-[1px] border-gray-200 '>
              <div className='w-[65%]'>
                <p className='font-light hover:text-primary w-max'>
                  {category.name}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Categories;
