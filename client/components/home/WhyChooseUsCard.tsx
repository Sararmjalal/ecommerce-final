import {Pill} from "../../lib/interfaces";

const WhyChooseUsCard = (props: Pill) => {
  return (
    <div className='flex flex-col justify-start gap-6'>
      <div
        className='w-16 h-16 rounded-lg flex justify-center items-center'
        style={props.title.includes("Payment") ? {backgroundColor: "#FFF3DF"} : {backgroundColor: "#F6F6F6"}}>
        {props.icon}
      </div>
      <p className='font-semibold'>{props.title}</p>
      <p className='text-grayish text-sm max-w-[212px] sm:max-w-full'>{props.desc}</p>
    </div>
  );
};

export default WhyChooseUsCard;
