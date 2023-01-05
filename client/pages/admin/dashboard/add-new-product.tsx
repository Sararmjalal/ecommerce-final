import AddEditProductForm from "../../../components/admin-panel/product/AddEditForm";

const AddProduct = () => ( 
    <AddEditProductForm
      useFor='Add Product'
      defaultValues={{
        title: "",
        isAvalible: false,
        cats: [],
        thisCategory: {},
        images: [],
        openUpload: false,
        files: [],
        description: ''
      }}
    />
  )


export default AddProduct;
