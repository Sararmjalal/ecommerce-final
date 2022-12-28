import Link from "next/link"

const UserMenu = ({ userMenu, closeHandler, confirmHandler }: any) => {
  return(
      <>
      <div className="modal-backdrop opacity-0" onClick={closeHandler}></div>
        <ul className='absolute bg-white z-[1000] w-[140px] right-0 top-8 rounded-2xl overflow-hidden text-center cursor-pointer shadow-lg'>
          {userMenu.map(({ name, path }:any) => (
            <Link href={path} passHref>
                <li
                className="w-full p-3 border-b-[1px] text-black border-grayborder hover:bg-black hover:text-white"
                onClick={closeHandler}>
                {name}
                </li> 
            </Link>
          ))}
        <li
          className="w-full p-3 border-b-[1px] text-black border-grayborder hover:bg-black hover:text-white hover:border-black"
          onClick={confirmHandler}>
          Logout
        </li>
        </ul>
        </>
    )
}
  

export default UserMenu