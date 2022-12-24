import GuideLink from "../components/main/GuideLink"
import { createAdmin } from "../apis";
const Test = () => {

  
  const thisProduct = {
    _id: 1,
    title: "T-shirt",
    price: 189.25,
    quantity: 2,
    isAvalible: false,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis, aut eius temporibus voluptate laborum et at quae deserunt voluptatem quo?",
    categoryId: 2,
    variables: {
      cpu: ["coreI7"],
      moreInfo: ["kheyli qashange too jibam ja mishe taze"],
      ports: ["hdmi", "wifi"],
    },
    images: [],
    averageScore: 0,
    scores: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(), 
  };

  return (
    <div>
      <GuideLink
        args={[
          {
            name: "dalam",
            href: {
              pathname: "/test",
            },
          },
          {
            name: "geee",
            href: {
              pathname: "/about",
            },
          },
          {
            name: "Its product",
            href: {
              pathname: "/product/[_id]",
              query: {
                _id: "geeee",
              },
            },
          },
        ]}
      />
      <div>salam</div>
    </div>
  );
}

export default Test