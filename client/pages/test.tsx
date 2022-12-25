import GuideLink from "../components/main/GuideLink"
import { createAdmin } from "../apis";
import {useState} from 'react'
import ConfirmModal from "../components/modals/Confirm";

const Test = () => {

  const [open, setOpen] = useState(false)
  
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
      <button onClick={() => setOpen(true)}>Mno baz kon</button>
      {
        open && <ConfirmModal
          mode="logout"
          closeHandler={() => setOpen(false)}
        />
      }
    </div>
  );
}

export default Test