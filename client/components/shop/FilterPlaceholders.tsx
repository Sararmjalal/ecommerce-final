import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'

const FilterPlaceholders = ({ name, open, handleClick }:
  { name: string, open: boolean, handleClick: (open: boolean) => void }) => (
  <div
    className="flex items-center justify-between cursor-pointer"
    onClick={() => handleClick(!open)}
    style={{marginBottom: open ? "24px" : "0"}}
  >
    <p className='font-semibold text-sm'>{name.toUpperCase()}</p>
    {
      open ?
        <MdOutlineKeyboardArrowUp
          fontSize='25px'
          onClick={() => handleClick(!open)}
        />
        :
        <MdOutlineKeyboardArrowDown
          fontSize='25px'
          onClick={() => handleClick(!open)}
       />
    }
  </div>
)

export default FilterPlaceholders