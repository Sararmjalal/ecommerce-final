import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import Head from "next/head";
import Banners from "../components/home/Banners";
import Hero from "../components/home/Hero";
import ProductsInToday from "../components/home/ProductsInToday";
import TopProducts from "../components/home/TopProducts";
import WhyChooseUs from "../components/home/WhyChooseUs";
import { useTitle } from "../lib";
import { topProducts, allProducts } from "../apis";

export async function getStaticProps() {

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['topProducts'], topProducts)
  
  await queryClient.prefetchQuery(['products'], allProducts)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default function Home() {

  const { data: topProduct } = useQuery({ queryKey: ['topProducts'], queryFn: topProducts })

  const { data: products } = useQuery({ queryKey: ['products'], queryFn: allProducts })

  return (
    <div>
      <Head>
        <title>{useTitle('Home')}</title>
        <meta name='description' content='Developed by Hamidreza Hashemi and Sara Jalal' />
      </Head>
      <Hero />
      <Banners />
      <TopProducts products={topProduct}/>
      <WhyChooseUs />
      <ProductsInToday products={products} />
    </div>
  );
}