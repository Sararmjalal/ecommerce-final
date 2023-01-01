import React, {useRef} from "react";
import {useForm, useFieldArray} from "react-hook-form";
import {Editor} from "@tinymce/tinymce-react";
import {Editor as TinyMCEEditor} from "tinymce";

type Props = {};

const AddProduct = (props: Props) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm<AddCategoryFormValues>({
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
    mode: "onSubmit",
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

  return (
    <form>
      <div>
        <input
          placeholder='Product title...'
          className={`text-gray-600 w-full py-3 pl-2 bg-gray-100	rounded-xl outline-none mt-1 lg:mb-4 mb-8`}
          {...register(`title` as const, {
            required: true,
            maxLength: 50,
          })}
        />
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            placeholder: "Product Description...",
            height: 500,
          }}
        />
      </div>
    </form>
  );
};

export default AddProduct;
