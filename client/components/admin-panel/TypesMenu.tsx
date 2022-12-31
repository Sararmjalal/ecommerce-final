import {useState} from "react";
import TypesList from "./TypesList";

export default function TypesMenu(props: any) {
  const {register, outerIndex} = props;
  const types = ["Text", "Select", "Multi Select"];
  const [selected, setSelected] = useState(types[0]);
  const [openTypes, setOpenTypes] = useState(false);

  return (
    <div>
      <label className='ml-1 font-light text-sm'>Type:</label>
      <div>
        <div
          className='text-gray-600 py-3 pl-2 bg-gray-100	rounded-xl outline-none mt-1 mb-4 text-sm cursor-pointer'
          onClick={() => setOpenTypes(!openTypes)}>
          {selected}
        </div>
        <div className='relative w-full'>
          {openTypes && (
            <>
              <div
                className='fixed top-0 left-0 w-screen h-screen z-[999]'
                onClick={() => setOpenTypes(false)}
              />
              <select
                {...register(`variables.${outerIndex}.type`)}
                className='absolute bg-gray-100 text-gray-600 overflow-hidden rounded-xl z-[1000] w-full top-4 text-center cursor-pointer'>
                {types.map((itemType) => (
                  <TypesList
                    key={itemType.trim()}
                    itemType={itemType}
                    setSelected={setSelected}
                    setOpenTypes={setOpenTypes}
                    register={register}
                    outerIndex={outerIndex}
                  />
                ))}
              </select>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
