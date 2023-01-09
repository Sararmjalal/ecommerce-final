import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from "react-icons/bs";
import {pillsProps} from "../../lib/staticData";
import PillCard from "./PillCard";
import {useState} from "react";
import Image from "next/image";

const Hero = () => {
  const [sliderIndex, setSliderIndex] = useState(0);

  const images = [
    "/assets/site_images/hero1.png",
    "/assets/site_images/hero2.png",
    "/assets/site_images/hero3.png",
  ];

  const handleArrow = (direction: string) => {
    if (direction === "l") {
      setSliderIndex(sliderIndex !== 0 ? sliderIndex - 1 : 2);
    }
    if (direction === "r") {
      setSliderIndex(sliderIndex !== 2 ? sliderIndex + 1 : 0);
    }
  };

  return (
    <div className={`relative flex h-screen bg-black overflow-hidden `}>
      <div
        style={{transform: `translateX(${-100 * sliderIndex}vw)`}}
        className='w-[300vw] h-screen flex transition-all object-cover'>
        {images.map((img, i) => (
        <div key={i} className='relative w-[99.5vw] h-screen'>
          <Image
            className='opacity-70 object-top object-cover'
            fill
            src={img}
            alt='hero'
          />
        </div>
        ))}
      </div>
      <div className='h-screen px-72 lg:px-9 absolute flex flex-col justify-center items-start gap-16 xl:gap-8 w-full'>
        <h1 className='md:text-4xl text-6xl font-bold text-white w-[30%]'>
          Sale of the summer collection
        </h1>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-6 cursor-pointer'>
            <Image
              src={"/assets/icons/arrow-circle.png"}
              alt='arrow-circle'
              width={39}
              height={39}
            />
            <p className='text-white'>SHOP NOW</p>
          </div>
          <div className='flex items-center gap-4 w-40'>
            <BsFillArrowLeftSquareFill
              onClick={() => handleArrow("l")}
              className='text-white text-7xl md:text-5xl lg:text-4xl xl:text-3xl sm:text-3xl cursor-pointer hover:scale-110 transition-all opacity-70'
            />
            <BsFillArrowRightSquareFill
              onClick={() => handleArrow("r")}
              className='text-white text-7xl md:text-5xl lg:text-4xl xl:text-3xl sm:text-3xl cursor-pointer hover:scale-110 transition-all opacity-70'
            />
          </div>
        </div>
      </div>
      <div className='lg:hidden absolute pl-[298px] xl:pl-[150px] pr-[121px] py-9 flex justify-start items-start gap-24 xl:gap-12 bottom-0 w-[1220px] xl:w-[90%] h-[131px] bg-white rounded-tr-full'>
        {pillsProps.map((pill) => (
          <PillCard
            key={pill.id}
            icon={pill.icon}
            title={pill.title}
            desc={pill.desc}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
