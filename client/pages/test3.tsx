import * as React from "react";
import {useForm, useFieldArray} from "react-hook-form";

type FormValues = {
  name: string;
  variables: {
    name: string;
    type: string;
    options: {[key: number]: string}[];
  }[];
};

type VariableObject = {
  name: {
    type: string;
    options?: {[key: number]: string}[];
  };
};

export default function Test3() {
  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      variables: [
        {
          name: "",
          type: "",
          options: [""],
        },
      ],
    },
    mode: "onBlur",
  });

  const {
    fields: variables,
    append,
    remove,
    update,
  } = useFieldArray({
    control,
    name: "variables",
  });

  const onSubmit = (data: FormValues) => {
    const obj = {} as VariableObject;
    data.variables.forEach(({name, type, options}) => {
      obj[name as keyof VariableObject] = {
        type,
        ...(type !== "text" && {
          options: [...options],
        }),
      };
    });
    console.log(obj);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder='Category name'
          className='input-primary'
          {...register(`name` as const, {
            // required: true,
          })}
        />
        {variables.map((variable, outterIndex) => {
          return (
            <div key={variable.id}>
              <input
                className='input-primary'
                placeholder='var name'
                {...register(`variables.${outterIndex}.name`)}
              />
              <input
                className='input-primary'
                placeholder='type'
                {...register(`variables.${outterIndex}.type`)}
              />
              {variable.options.map((option, innerIndex) => {
                return (
                  <input
                    className='input-primary'
                    placeholder='option'
                    {...register(
                      `variables.${outterIndex}.options.${innerIndex}`
                    )}
                  />
                );
              })}
              <button
                className='btn-primary mt-5'
                type='button'
                onClick={() => {
                  const thisVariable = getValues(`variables.${outterIndex}`);
                  thisVariable.options.push("");
                  update(outterIndex, thisVariable);
                }}>
                Add Option
              </button>
              <button
                className='btn-primary mt-5'
                type='button'
                onClick={() => {
                  const thisVariable = getValues(`variables.${outterIndex}`);
                  thisVariable.options.splice(outterIndex, 1);
                  update(outterIndex, thisVariable);
                }}>
                Delete Option
              </button>

              <button
                className={variables.length !== 1 ? "block" : "hidden"}
                type='button'
                onClick={() => remove(outterIndex)}>
                Delete
              </button>
            </div>
          );
        })}
        <button
          className='btn-primary mt-5'
          type='button'
          onClick={() =>
            append({
              name: "",
              type: "",
              options: [""],
            })
          }>
          ADD VARIABLE
        </button>
        <input type='submit' className='btn-primary bg-blueish mt-4' />
      </form>
    </div>
  );
}
