import React, {useState} from "react";
import {AiOutlineClose} from "react-icons/ai";

const Test2 = () => {
  const [category, setCategory] = useState({
    name: "",
    variables: [
      {
        name: "",
        type: "",
        options: [""],
      },
    ],
  });

  const addVariable = (e) => {
    let temp = {...category};
    temp.variables.push({
      name: "",
      type: "",
      options: [""],
    });
    setCategory(temp);
  };

  const addOption = (e, i) => {
    let temp = {...category};
    temp.variables[i].options.push("");
    setCategory(temp);
  };

  const deleteVariable = (e, i) => {
    let temp = {...category};
    temp.variables.splice(i, 1);
    setCategory(temp);
  };

  const deleteOption = (e, i, j) => {
    let temp = {...category};
    temp.variables[i].options.splice(j, 1);
    setCategory(temp);
  };

  const handleNameChange = (e) => {
    let temp = {...category};
    temp[e.target.name] = e.target.value;
    setCategory(temp);
  };

  const handleVariableChange = (e, i) => {
    let temp = {...category};
    temp.variables[i][e.target.name] = e.target.value;
    setCategory(temp);
  };

  const handleOptionChange = (e, i, j) => {
    let temp = {...category};
    temp.variables[i].options[j] = e.target.value;
    setCategory(temp);
  };

  const submit = (e) => {
    console.log(category);
  };

  const transformToObject = () => {
    const obj = {};
    category.variables.forEach((item) => {
      obj[item.name] = {
        type: item.type,
        ...(item.type !== "text" && {
          options: item.options,
        }),
      };
    });
    console.log(obj);
  };

  transformToObject();

  return (
    <div className='p-12 w-[60%] m-auto'>
      <h2 className='text-center px-8'>Category Details</h2>
      <input
        name='name'
        className='input-primary'
        placeholder='Name of the category'
        onChange={handleNameChange}
        value={category.name}
      />
      {category.variables.map((variable, i) => (
        <div className='p-6'>
          <span className='text-lg'>Variable {i + 1}: </span>
          <input
            name='name'
            className='input-primary'
            placeholder='name of variable'
            onChange={(e) => handleVariableChange(e, i)}
            value={category.variables[i].name}
          />
          <select className='p-3 border border-grayish rounded-lg m-3'>
            <option>Choose Type</option>
            <option onChange={(e) => handleVariableChange(e, i)} value='text'>
              Text
            </option>
            <option onChange={(e) => handleVariableChange(e, i)} value='select'>
              Select
            </option>
            <option
              onChange={(e) => handleVariableChange(e, i)}
              value='multiselect'>
              Multi Select
            </option>
          </select>
          <button className='ml-3' onClick={(e) => deleteVariable(e, i)}>
            <AiOutlineClose className='text-xl' />
          </button>
          {variable.options.map((option, j) => (
            <div className='p-3'>
              <span className='text-lg'>Option {j + 1}: </span>
              <input
                name='option'
                className='input-primary'
                placeholder='Option'
                onChange={(e) => handleOptionChange(e, i, j)}
                value={category.variables[i].options[j]}
              />
              <button className='ml-3' onClick={(e) => deleteOption(e, i, j)}>
                <AiOutlineClose className='text-xl' />
              </button>
            </div>
          ))}
          <button
            className='btn-primary bg-green-500'
            onClick={(e) => addOption(e, i)}>
            Add Option
          </button>
        </div>
      ))}
      <button className='btn-primary bg-green-800' onClick={addVariable}>
        Add Variable
      </button>
      <br />
      <br />
      <button className='btn-primary bg-blue-400' onClick={submit}>
        Submit
      </button>
    </div>
  );
};

export default Test2;
