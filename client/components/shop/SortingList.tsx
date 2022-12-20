import { SortingListProps } from "../../lib/interfaces"

const SortingList = ({sortItem, setSelected, setOpenSorting}: SortingListProps) => {
  return (
    <li
      className="w-full p-3 border-b-[1px] border-grayborder hover:bg-black hover:text-white"
      onClick={() => {
        setSelected(sortItem)
        setOpenSorting(false)
      }}>
      {sortItem}
  </li>
)
}

export default SortingList