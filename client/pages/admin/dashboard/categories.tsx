import {QueryClient, dehydrate, useQuery} from "@tanstack/react-query";
import React, {useState} from "react";
import Loading from "../../../components/main/Loading";
import ConfirmModal from "../../../components/modals/Confirm";
import {allCategories} from "../../../apis";
import {Category} from "../../../lib/interfaces";

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["categories"], allCategories);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

type Props = {};

const Categories = (props: Props) => {
  const {data: categories} = useQuery({
    queryKey: ["categories"],
    queryFn: allCategories,
  });

  const [cats, setCats] = useState(categories);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(categories);

  if (loading) return <Loading />;
  return (
    <div>
      <h1 className='text-lg text-gray-700 font-semibold mb-4'>
        All Categories
      </h1>
      {cats.length === 0 ? (
        <p className='font-light'>No categories found.</p>
      ) : (
        cats.map((category: Category) => {
          return (
            <div className='flex items-center bg-gray-100 py-6 my-2 px-4 rounded-xl border-[1px] border-gray-200 '>
              <div className='w-[65%]'>
                <p className='font-light hover:text-violet-700 w-max'>
                  {category.name}
                </p>
              </div>
              <div className='font-light text-sm text-right w-[35%]'>
                <button
                  className='ml-1 hover:text-violet-700'
                  onClick={() => setOpenConfirm(true)}>
                  Remove
                </button>
              </div>
            </div>
          );
        })
      )}
      {openConfirm && (
        <ConfirmModal
          mode='remove'
          closeHandler={() => setOpenConfirm(false)}
          okHandler={() => {
            console.log("Category Removed");
          }}
        />
      )}
    </div>
  );
};

export default Categories;
