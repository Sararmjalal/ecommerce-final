import {useState} from "react";
import {BsCheck2} from "react-icons/bs";
import ColorCard from "../single-product/ColorCard";

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

  const sizes = [
    {
      size: "XS",
    },
    {
      size: "S",
    },
    {
      size: "M",
    },
    {
      size: "L",
    },
    {
      size: "XL",
    },
    {
      size: "XXL",
    },
  ];

  const colors = ["black", "#FFE3B7", "#2900FF", "white"];

  const [selectedCategory, setSelectedCategory] = useState(
    categories[0]["name"]
  );

  const [selectedSize, setSelectedSize] = useState(sizes[0]["size"]);

  return (
    <div className=' flex flex-col items-start gap-3 h-screen w-full'>
      <div className='w-full bg-black text-white p-4'>
        <p className='text-2xl'>Fillters</p>
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
                      selectedCategory === name
                        ? "bg-black text-white"
                        : "bg-white border-[1px] border-grayborder"
                    }`}
                  onClick={() => setSelectedCategory(name)}>
                  {selectedCategory === name && <BsCheck2 />}
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
          <ul className='flex justify-center items-center overflow-y-auto'>
            {sizes.map(({size}) => (
              <li>
                <div
                  className={`w-10 h-10 flex flex-col items-center justify-center cursor-pointer
                    ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-white border-[1px] border-grayborder"
                    }`}
                  onClick={() => setSelectedSize(size)}>
                  <p>{size}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='w-full border-[1px] border-grayborder p-6'>
        <p className='font-semibold text-sm mb-6'>COLOR</p>
        <div className='flex flex-col gap-5'>
          <div className='flex justify-center gap-3 items-center'>
            {colors.map((color: string) => (
              <ColorCard color={color} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersSidebar;
