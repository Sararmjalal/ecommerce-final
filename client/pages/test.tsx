import {useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";

// type Inputs = {
//   example: string;
//   exampleRequired: string;
// };
type Inputs = {
  name: string;
  type: string;
  _id: string;
};

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const clone = [...vars];
    clone.forEach(({_id, name, type}, index, ref) => {
      ref[index] = {
        ...ref[index],
        name: data[`name${_id}`],
        type: data[`type${_id}`],
      };
    });
    setVars(clone);
  };

  console.log(watch("example")); // watch input value by passing the name of it

  const [vars, setVars] = useState([
    {
      _id: "1",
      name: "",
      type: "",
    },
    {
      _id: "2",
      name: "",
      type: "",
    },
  ]);
  console.log(vars);

  return (
    <form onChange={(e) => console.log(e)} onSubmit={handleSubmit(onSubmit)}>
      {vars.map(({_id, name, type, options}, outterIndex) => {
        return (
          <div>
            <input className='input-primary' {...register("name" + _id)} />
            <input className='input-primary' {...register("type" + _id)} />
            <button
              onClick={() =>
                setVars([
                  ...vars,
                  {
                    _id: "3",
                    name: "",
                    type: "",
                  },
                ])
              }>
              Add variable
            </button>
          </div>
        );
      })}
      <input type='submit' />
    </form>
  );
}
