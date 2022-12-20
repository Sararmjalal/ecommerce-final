import { useState } from "react"
import SortingList from "./SortingList"

const FiltersTopbar = ({selectedCategory}: {selectedCategory: string}) => {

  const sortings = ['Popular', 'Lowest Price', 'Heighest Price']

  const [selected, setSelected] = useState(sortings[0])

  const [openSorting, setOpenSorting] = useState(false)

  return (
    <div className="flex justify-between items-center mb-8">
      <div className="text-2xl">{selectedCategory}</div>
      <div className="flex gap-4 items-center">
        <p className="sm:hidden">Sort:</p>
        <div>
          <div
            className="w-36 h-12 flex flex-col items-center justify-center rounded-full border-[1px] border-grayborder cursor-pointer"
            onClick={() => setOpenSorting(!openSorting)}
          >
          {selected}
        </div>
          <div className="relative w-full">
          {
              openSorting && 
              <>
                <div
                  className="fixed top-0 left-0 w-screen h-screen z-[999]"
                  onClick={() => setOpenSorting(false)}
                />
                <ul className="absolute bg-white z-[1000] w-full top-4 rounded-2xl overflow-hidden text-center cursor-pointer">
                    {
                      sortings.map(sortItem => (
                        <SortingList
                          key={sortItem.trim()}
                          sortItem={sortItem}
                          setSelected={setSelected}
                          setOpenSorting={setOpenSorting}
                        />
                      ))
                    }
                </ul>
              </>
          }
          </div>
        </div>
      </div>
    </div>
  )
}

export default FiltersTopbar