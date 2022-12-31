const TypesList = ({
  itemType,
  register,
  outerIndex,
  setSelected,
  setOpenTypes,
}: any) => {
  return (
    <option
      {...register(`variables.${outerIndex}.type`)}
      value={itemType}
      className='w-full py-4 pl-2  text-gray-600 outline-none text-sm hover:bg-gray-700 hover:text-white cursor-pointer'
      onClick={() => {
        setSelected(itemType);
        setOpenTypes(false);
      }}>
      {itemType}
    </option>
  );
};

export default TypesList;
