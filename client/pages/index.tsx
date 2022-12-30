import Head from "next/head";
import Banners from "../components/home/Banners";
import Hero from "../components/home/Hero";
import ProductsInToday from "../components/home/ProductsInToday";
import Selected from "../components/home/Selected";
import WhyChooseUs from "../components/home/WhyChooseUs";
import { useTitle } from "../lib";

export default function Home() {
  return (
    <div>
      <Head>
        <title>{useTitle('Home')}</title>
        <meta name='description' content='Developed by Hamidreza Hashemi and Sara Jalal' />
      </Head>
      <Hero />
      <Banners />
      <Selected />
      <WhyChooseUs />
      <ProductsInToday />
    </div>
  );
}
