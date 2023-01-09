import {bannersProps} from "../../lib/staticData";
import BannerCard from "./BannerCard";

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
