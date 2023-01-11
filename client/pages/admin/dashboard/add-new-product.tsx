import AddEditProductForm from "../../../components/admin-panel/product/AddEditForm";

const AddProduct = () => ( 
    <AddEditProductForm
      useFor='Add Product'
      defaultValues={{
        title: "",
        isAvailable: false,
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
