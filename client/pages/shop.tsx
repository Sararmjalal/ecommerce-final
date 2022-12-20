import React, { useEffect, useState } from "react";
import GuideLink from "../components/main/GuideLink";
import FiltersSidebar from "../components/shop/Filters";

const Shop = () => {
  return (
    <div>
      <GuideLink
        args={[{
          name: "Shop",
          href: {
            pathname: '/shop'
          }
      }]}
      />
      <div className="grid grid-cols-4 lg:grid-cols-1">
        <div className="col-span-1">
          <FiltersSidebar />
        </div>
        <div className="col-span-3 lg:col-span-1">
        </div>
      </div>
    </div>
  )
}

export default Shop