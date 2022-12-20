import {useState} from "react";
import {BsCheck2} from "react-icons/bs";
import ColorCard from "../single-product/ColorCard";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const FiltersSidebar = () => {
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

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const colors = ["black", "#FFE3B7", "#2900FF", "white"];

  const prices = [50, 100, 200,500, 400, 387, 2000]

  const [data, setData] = useState({
    selectedCategory: categories[0].name,
    selectedSize: sizes[0],
    selectedColor: colors[0],
    priceRange: [prices.reduce((acc, cur) => acc > cur ? cur : acc),
    prices.reduce((acc, cur) => acc > cur ? acc : cur)]
  })

  return (
    <div className=' flex flex-col items-start gap-3 h-screen w-full'>
      <div className='w-full bg-black text-white p-4'>
        <p className='text-2xl'>Filters</p>
      </div>
      <div className='w-full border-[1px] border-grayborder p-6'>
        <p className='font-semibold text-sm mb-6'>PRODUCT CATEGORY</p>
        <ul className='flex flex-col gap-5 overflow-y-auto h-[200px]'>
          {categories.map(({name}) => {
            return (
              <li className='flex gap-5 items-center justify-start'>
                <div
                  className={`w-6 h-6 flex flex-col items-center justify-center cursor-pointer
                    ${
                      data.selectedCategory === name
                        ? "bg-black text-white"
                        : "bg-white border-[1px] border-grayborder"
                    }`}
                  onClick={() => setData({...data, selectedCategory: name})}>
                  {data.selectedCategory === name && <BsCheck2 />}
                </div>
                <p>{name}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className='w-full border-[1px] border-grayborder p-6'>
        <p className='font-semibold text-sm mb-6'>SIZE</p>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-wrap justify-center items-center'>
            {sizes.map(size => (
                <div
                  className={`w-10 h-10 flex flex-col items-center justify-center cursor-pointer
                    ${
                      data.selectedSize === size
                        ? "bg-black text-white"
                        : "bg-white border-[1px] border-grayborder"
                    }`}
                    onClick={() => setData({...data, selectedSize: size})}>
                  <p>{size}</p>
                </div>
            ))}
          </div>
        </div>
      </div>
      <div className='w-full border-[1px] border-grayborder p-6'>
        <p className='font-semibold text-sm mb-6'>PRICE</p>
        <div className='flex flex-col gap-5'>
          <div className="flex justify-between mb-3">
            <div className="py-1 px-3 bg-[#F4F4F4]">{data.priceRange[0]} USD</div>
            <div className="py-1 px-3 bg-[#F4F4F4]">{data.priceRange[1]} USD</div>
          </div>
          <div className="thisRange">
            <RangeSlider
              min={prices.reduce((acc, cur) => acc > cur ? cur : acc)}
              max={prices.reduce((acc, cur) => acc > cur ? acc : cur)}
              value={data.priceRange}
              step={10}
              onInput={(e:any) => setData({...data, priceRange: e})}
            />
          </div>
        </div>
      </div>
      <div className='w-full border-[1px] border-grayborder p-6'>
        <p className='font-semibold text-sm mb-6'>COLOR</p>
        <div className='flex flex-col gap-5'>
          <div className='flex justify-center gap-3 items-center flex-wrap'>
            {colors.map((color) => (
              <ColorCard
                color={color}
                handleSelect={(selectedColor:string) => setData({ ...data, selectedColor })}
                selectedColor={data.selectedColor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersSidebar;
