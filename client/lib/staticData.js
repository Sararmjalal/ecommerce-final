import {FaShippingFast, FaRegSmileBeam, FaShieldAlt} from "react-icons/fa";
import {MdPayment, MdOutlineHighQuality} from "react-icons/md";
import ReactStars from "react-stars";

const bannersProps = [
  {
    id: 1,
    img: "/assets/site_images/banner-1.png",
    title: "New Arrivals are now in!",
    button: "SHOW COLLECTION",
    badge: false,
  },
  {
    id: 2,
    img: "/assets/site_images/banner-2.png",
    title: "Basic t-shirts $29.99",
    button: "MORE DETAILS",
    badge: false,
  },
  {
    id: 3,
    img: "/assets/site_images/banner-3.png",
    title: "Sale this summer",
    button: "VIEW ALL",
    badge: true,
  },
];

const pillsProps = [
  {
    id: 1,
    icon: <FaShippingFast color='#FBB03B' size={22} />,
    title: "Free Shipping",
    desc: "On purchases over $199",
  },
  {
    id: 2,
    icon: <FaRegSmileBeam color='#FBB03B' size={22} />,
    title: "99% Satisfied Customers",
    desc: "Our clients opinions speak for themselves",
  },
  {
    id: 3,
    icon: <FaShieldAlt color='#FBB03B' size={22} />,
    title: "Originality Guaranteed",
    desc: "30 days warranty for each product from our store",
  },
];

const homeProductsProps = [
  {
    id: 1,
    img: "/assets/products/product-1.png",
    title: "Loose Knit 3/4 Sleeve",
    price: 119.99,
    lastPrice: null,
    badge: false,
  },
  {
    id: 2,
    img: "/assets/products/product-2.png",
    title: "Basic Slim-fit T-shirt",
    price: 79.99,
    lastPrice: null,
    badge: false,
  },
  {
    id: 3,
    img: "/assets/products/product-3.png",
    title: "T-shirt Summer Vibes",
    price: 89.99,
    lastPrice: 119.99,
    badge: true,
  },
  {
    id: 4,
    img: "/assets/products/product-4.png",
    title: "Loose Textured T-shirt",
    price: 119.99,
    lastPrice: null,
    badge: false,
  },
];

const whyChooseUsProps = [
  {
    id: 1,
    icon: <FaShippingFast size={28} />,
    title: "Free Shipping",
    desc: "All purchases over $199 are eligible for free shipping via USPS First Class Mail.",
  },
  {
    id: 2,
    icon: <MdPayment size={28} color={"#FBB03B"} />,
    title: "Easy Payment",
    desc: "All payments are processed instantly over a secure payment protocol.",
  },
  {
    id: 3,
    icon: <FaShieldAlt size={28} />,
    title: "Money-Back Guarantee",
    desc: "If an item arrived damaged or you've changed your mind, you can send it back for a full refund.",
  },
  {
    id: 4,
    icon: <MdOutlineHighQuality size={28} />,
    title: "Finest Quality",
    desc: "Designed to last, each of our products has been crafted with the finest materials.",
  },
];

const commentData = [
  {
    id: 1,
    user: "Jon Doe",
    pic: "/assets/site_images/profile-1.png",
    rate: (
      <ReactStars
        count={5}
        value={1}
        size={24}
        color2={"#ffd700"}
        edit={false}
      />
    ),
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    id: 2,
    user: "Eveline Gosok",
    pic: "/assets/site_images/profile-2.png",
    rate: (
      <ReactStars
        count={5}
        value={1}
        size={24}
        color2={"#ffd700"}
        edit={false}
      />
    ),
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    id: 3,
    user: "Anne Okombo",
    pic: "/assets/site_images/profile-3.png",
    rate: (
      <ReactStars
        count={5}
        value={1}
        size={24}
        color2={"#ffd700"}
        edit={false}
      />
    ),
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
];

const menuItems = [
  {id: 1, title: " ", items: ["Sales", "Bestsellers", "Latest Arrivals"]},
  {
    id: 2,
    title: "SHOES",
    items: [
      "Lifestyle",
      "Running",
      "Soccer",
      "Basketball",
      "Football",
      "Golf",
      "Baseball",
    ],
  },
  {
    id: 3,
    title: "CLOTHING",
    items: [
      "Pants",
      "Hoodies & Sweatshirts",
      "Jackets & Vests",
      "Track Suits",
      "Short Sleeve Shirts",
      "T-Shirts",
      "Jerseys",
      "Shorts",
      "Jeans",
    ],
  },
  {
    id: 4,
    title: "ACCESSORIES",
    items: [
      "Backpacks",
      "Caps & Hats",
      "Watches",
      "Belts",
      "Bags",
      "Wallets & Cases",
      "Scarves",
      "Glasses",
    ],
  },
];

export {
  bannersProps,
  pillsProps,
  homeProductsProps,
  whyChooseUsProps,
  commentData,
  menuItems,
};
