import {MdOutlineStickyNote2} from "react-icons/md";

const Description = ({description}:{description: string}) => {
  return (
    <div className='main-container justify-center'>
        <div className='flex flex-col items-center justify-center gap-9 md:gap-4'>
          <MdOutlineStickyNote2 className='w-14 h-16 text-grayish' />
          <p className='font-semibold'>Details and product description</p>
          <p dangerouslySetInnerHTML={{__html: description}} className='text-sm  md:text-center'></p>
        </div>
    </div>
  );
};

export default Description;
