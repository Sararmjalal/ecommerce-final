import GuideLink from "../components/main/GuideLink"
import { createAdmin } from "../apis";
import {useState} from 'react'
import ConfirmModal from "../components/modals/Confirm";

const Test = () => {

  const [step, setStep] = useState("1");
  const [value, setValue] = useState("");
  const [adad, setAdad] = useState("1");

  function handleSteps() {
    if (value !== adad) return alert("nmishe beri baadi");
    setStep(String(Number(step) + 1));
    setAdad(String(Number(adad) + 1));
  }

  return (
    <div>
      <h1>inja logine</h1>
      <h2>Step {step}</h2>
      <p>
        age tooye input adad
        {adad}
        ro befresti be baadi miri
      </p>
      <input
        className='input-primary'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSteps()}
      />
    </div>
  );
}

export default Test