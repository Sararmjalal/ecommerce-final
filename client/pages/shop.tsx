import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import React, { useLayoutEffect, useState } from "react";
import GuideLink from "../components/main/GuideLink";
import FiltersSidebar from "../components/shop/FiltersSidebar";
import FiltersTopbar from "../components/shop/FiltersTopbar";
import ProductCard from "../components/home/ProductCard";
import Head from "next/head";
import { useTitle } from "../lib";
import { allProducts } from "../apis";
import { Product } from "../lib/interfaces";
import { homeProductsProps } from "../lib/staticData";

export async function getStaticProps() {

  const queryClient = new QueryClient()
  
  await queryClient.prefetchQuery(['products'], allProducts)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const Shop = () => {

  const { data: products } = useQuery({ queryKey: ['products'], queryFn: allProducts })

  const categories = [
    {
      name: "T-shirts",
    },
    {
      name: "Sweatshirts",
    },
    {
      name: "Tank Tops",
    },
    {
      name: "Dress Shirts",
    },
    {
      name: "Dalam",
    },
    {
      name: "bazam dalam",
    },
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const colors = ["black", "#FFE3B7", "#2900FF", "white"];

  const prices = [50, 100, 200, 500, 400, 387, 2000];

  const [filteredData, setFilteredData] = useState({
    products: homeProductsProps,
    selectedCategory: categories[0].name,
    catFilterOpen: false,
    selectedSize: sizes[0],
    sizeFilterOpen: false,
    selectedColor: colors[0],
    colorFilterOpen: false,
    priceRange: [
      prices.reduce((acc, cur) => (acc > cur ? cur : acc)),
      prices.reduce((acc, cur) => (acc > cur ? acc : cur)),
    ],
    priceFilterOpen: false,
  });

  useLayoutEffect(() => {
    setFilteredData({
      ...filteredData,
      catFilterOpen: screen.width > 1023,
      sizeFilterOpen: screen.width > 1023,
      colorFilterOpen: screen.width > 1023,
      priceFilterOpen: screen.width > 1023,
    });
  }, []);

  return (
    <div>
      <Head>
        <title>{useTitle('Shop')}</title>
        <meta name='description' content='Developed by Hamidreza Hashemi and Sara Jalal' />
      </Head>
      <GuideLink
        args={[
          {
            name: "Shop",
            href: {
              pathname: "/shop",
            },
          },
        ]}
      />
      <div className='grid grid-cols-4 lg:grid-cols-1 gap-10'>
        <div className='col-span-1'>
          <FiltersSidebar
            categories={categories}
            sizes={sizes}
            colors={colors}
            prices={prices}
            data={filteredData}
            setData={setFilteredData}
          />
        </div>
        <div className='col-span-3 lg:col-span-1 '>
          <FiltersTopbar
            selectedCategory={filteredData.selectedCategory}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
          />
          {
            filteredData.products[0] ?
            <div className='grid grid-cols-3 gap-16 sm:gap-8 sm:grid-cols-1 md:grid-cols-2'>
              {filteredData.products.map((product) => {
                return (
                  <ProductCard
                    key={product._id}
                    img={product.img}
                    title={product.title}
                    price={product.price}
                    _id={product._id}
                  />
                );
              })}
            </div>
                :
            <p className="text-lg text-center font-semibold mt-20 mb-28">No products available yet!</p>
          }
        </div>
      </div>
    </div>
  );
};

export default Shop;
