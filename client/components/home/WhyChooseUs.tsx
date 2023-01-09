import {whyChooseUsProps} from "../../lib/staticData";
import WhyChooseUsCard from "./WhyChooseUsCard";

const WhyChooseUs = () => {
  return (
    <div className='main-container flex-col justify-center items-center lg:items-start'>
      <p className='head-text'>
        Why Should You Choose Us?
      </p>
      <div className='grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-10 w-full'>
        {whyChooseUsProps.map((item) => (
          <WhyChooseUsCard
            key={item.id}
            title={item.title}
            desc={item.desc}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
