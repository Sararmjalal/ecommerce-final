import {useEffect, useState} from "react";
import {TypesMenuProps} from "../../lib/interfaces";
import TypesList from "./TypesList";

export default function TypesMenu({
  types,
  setSelectedTypes,
  selectedTypes,
  outerIndex,
}: TypesMenuProps) {
  const [openTypes, setOpenTypes] = useState(false);

  return (
    <div>
      <label className='ml-1 font-light text-sm'>Type:</label>
      <div>
        <div
          className='text-gray-600 py-3 pl-2 bg-gray-100	rounded-xl outline-none mt-1 mb-4 text-sm cursor-pointer'
          onClick={() => setOpenTypes(!openTypes)}>
          {selectedTypes[outerIndex].name}
        </div>
        <div className='relative w-full'>
          {openTypes && (
            <>
              <div
                className='fixed top-0 left-0 w-screen h-screen z-[999]'
                onClick={() => setOpenTypes(false)}
              />
              <ul className='absolute bg-gray-100 text-gray-600 overflow-hidden rounded-xl z-[1000] w-full cursor-pointer'>
                {types.map((type) => (
                  <li
                    className='w-full py-4 pl-2  text-gray-600 outline-none text-sm hover:bg-gray-700 hover:text-white cursor-pointer'
                    onClick={() => {
                      const clone = [...selectedTypes];
                      clone[outerIndex] = type;
                      setSelectedTypes(clone);
                      setOpenTypes(false);
                    }}>
                    {type.name}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
