import React from "react";
import {whyChooseUsProps} from "../../lib/staticData";
import WhyChooseUsCard from "./WhyChooseUsCard";

const WhyChooseUs = () => {
  return (
    <div className='main-container flex-col justify-center items-center lg:items-start '>
      <p className='text-2xl md:text-xl sm:text-lg'>
        Why Should You Choose Us?
      </p>
      <div className='flex w-full md:flex-col justify-between lg:items-start items-center gap-9'>
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
