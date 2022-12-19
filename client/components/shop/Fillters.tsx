import { useEffect, useState } from "react"
import {BsCheck2} from "react-icons/bs"

const FiltersSidebar = () => {
  
  const categories = [
    {
      name: 'T-shirts',
    },
    {
    name: 'Sweatshirts'
    },
    {
    name: "Tank Tops"
  },
  {
    name: 'Dress Shirts'
    },
    {
      name: 'Dalam'
    }, 
    {
      name: "bazam dalam"
    }
  ]

  const [selectedCategory, setSelectedCategory] = useState(categories[0]['name'])

  return (
    <div className=" flex flex-col items-start gap-3 h-screen w-full">
      <div className="w-full bg-black text-white p-4">
        <p className="text-2xl">Fillters</p>
      </div>
      <div className="w-full border-[1px] border-grayborder p-6">
        <p className="font-semibold text-sm mb-6">PRODUCT CATEGORY</p>
        <ul className="flex flex-col gap-5 overflow-y-auto h-[200px]">
          {
            categories.map(({ name }) => {
              return (
                <li className="flex gap-5 items-center justify-start">
                  <div
                    className={`w-6 h-6 flex flex-col items-center justify-center cursor-pointer
                    ${selectedCategory === name ? "bg-black text-white" : "bg-white border-[1px] border-grayborder"}`}
                    onClick={() => setSelectedCategory(name)}
                  >
                    {selectedCategory === name && <BsCheck2 />}
                  </div>
                  <p>{name}</p>
                </li>
              )
            })
          }
        </ul>
      </div>
      <div className="w-full border-[1px] border-grayborder p-6">
        <p className="font-semibold text-sm mb-6">SIZE</p>
        <div className="flex flex-col gap-5">
        <ul className="flex flex-col gap-5 overflow-y-auto h-[200px]">
        </ul>
        </div>
      </div>
    </div>
  )
}

export default FiltersSidebar