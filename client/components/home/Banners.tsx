import React from "react";
import BannerCard from "./BannerCard";
import {bannersProps} from "../../lib/staticData";

const Banners = () => {
  return (
    <div className='main-container xl:flex-col gap-[34px] flex'>
      {bannersProps.map((banner) => (
        <BannerCard
          key={banner.id}
          badge={banner.badge}
          img={banner.img}
          title={banner.title}
          button={banner.button}
        />
      ))}
    </div>
  );
};

export default Banners;
