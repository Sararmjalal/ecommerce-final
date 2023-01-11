import {Dispatch, SetStateAction} from "react";
import { FieldArrayWithId, FieldErrorsImpl, UseFieldArrayMove, UseFieldArrayRemove, UseFieldArrayUpdate, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

export interface Pill {
  id?: number;
  icon: JSX.Element;
  title: string;
  desc: string;
}

export interface Banner {
  id?: number;
  img: string;
  title: string;
  button: string;
  badge: boolean;
}

export interface ProductCards {
  _id: string;
  key: string;
  images: string[];
  title: string;
  price: number;
}

export interface DynamicLink {
  pathname: string;
  query?: {
    [key: string]: string;
  };
}

export interface GuideLinkArg {
  name: string;
  href: DynamicLink;
}

export interface SortingListProps {
  sortItem: string;
  setSelected: Dispatch<SetStateAction<string>>;
  setOpenSorting: Dispatch<SetStateAction<boolean>>;
}

export interface Location {
  address: string;
  postalcode: string;
  geo: {
    lat: string;
    lon: string;
  };
}

export interface Receiver {
  name: string;
  phone: string;
}

export interface AddressData {
  location: Location;
  receiver: Receiver;
}

export interface User {
  _id: string;
  name: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface GlobalState {
  [key: string]: null | User;
}

export interface Form {
  [key: string]: {
    value: string;
    msg: string;
  };
}

export interface ConfirmModalProps {
  mode: string;
  closeHandler: () => void;
  okHandler: () => void;
}

export interface MenuProps {
  name: string;
  path: string;
}

export interface DashboardMenuProps {
  menu: MenuProps[];
  logoutFunc: () => void;
}

export interface LayoutProps {
  children: JSX.Element | JSX.Element[];
  userMenu: MenuProps[];
}

export type OtpProps = {
  value: string;
  valueLength: number;
  onChangeHandler: (value: string) => void;
  onKeyDownFunction: () => void
};


// CATEGORY TYPES ==============================================
export interface FilterData {
  products: Product[]
  selectedCategory: string,
  catFilterOpen: boolean,
  selectedSize: string,
  sizeFilterOpen: boolean,
  selectedColor: string,
  colorFilterOpen: boolean,
  priceRange: number[]
  priceFilterOpen: boolean,
}

export interface FilterSidebarProps {
  data: FilterData,
  setData: React.Dispatch<React.SetStateAction<FilterData>>,
  categories: Category[],
  sizes: string[],
  prices: number[],
  colors: string[]
}


// CATEGORY TYPES ==============================================
export type AddCategoryFormValues = {
  name: string;
  variables: {
    name: string;
    type: string;
    options: string[];
  }[];
};

export type CategoryVariableObject = {
  name: {
    type: string;
    options?: {[key: number]: string}[];
  };
};

export interface CreateCategoryBody {
  name: string;
  variables: CategoryVariableObject;
}

export interface Category extends CreateCategoryBody {
  _id: string
  createdAt: string
  updatedAt: string
  del: boolean
}

export interface ProductCategory extends Category {
  isSelected: boolean
  vars: CategoryVariableObject[] 
}

export interface TypesMenuProps {
  types: {
    name: string;
    value: string;
  }[];
  selectedTypes: {
    name: string;
    value: string;
  }[];
  setSelectedTypes: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        value: string;
      }[]
    >
  >;
  outerIndex: number;
}

export interface OptionsFormProps {
  errors: Partial<FieldErrorsImpl<{
    name: string;
    variables: {
        name: string;
        type: string;
        options: string[];
    }[];
}>>
  outerIndex: number
  innerIndex?: number
  register: UseFormRegister<AddCategoryFormValues>
  selectedTypes: {
    name: string;
    value: string;
  }[];
  variable: FieldArrayWithId<AddCategoryFormValues, "variables", "id">
  getValues:  UseFormGetValues<AddCategoryFormValues>
  update: UseFieldArrayUpdate<AddCategoryFormValues, "variables">
}

export interface VariablesFormProps extends OptionsFormProps {
  types:{
    name: string;
    value: string;
  }[]
  remove: UseFieldArrayRemove
  variables: FieldArrayWithId<AddCategoryFormValues, "variables", "id">[]
  setSelectedTypes:  React.Dispatch<React.SetStateAction<{
    name: string;
    value: string;
}[]>>
}

// PRODUCT TYPES ==============================================
export interface AddProductDefaultValues{
  title: string,
  isAvailable: boolean,
  cats: [],
  thisCategory: {},
  images: [],
  openUpload: false,
  files: [],
  description: string
}

export interface EditProductDefaultValues extends AddProductDefaultValues {
  price: number,
  quantity: number,
}

export interface AddEditProductForm {
  defaultValues: AddProductDefaultValues | EditProductDefaultValues
  useFor: string,
  productId?: string
}


export interface ProductBodyVariables {
  [key: string]: string[]
}

export interface ThisCategory extends Category {
  vars?: {
    name: string;
    type: string;
    options: { name: string, isSelected: boolean }[];
    isSelected:boolean
  }[];
  isSelected?: boolean
}

export interface ProductWithVars extends Product {
  vars?: { name: string, options: {name:string}[] }[]
}

export interface ProductBodyForm {
  title: string;
  price: number; 
  quantity: number;
  isAvailable: boolean;
  cats: ThisCategory[];
  images: {
    id:number,
    url: string,
    dataUrl:string,
    file: File | string
  }[]
  thisCategory: ThisCategory
  openUpload: boolean
  description: string
}

export interface ProductBody {
  title: string;
  price: number;
  quantity: number;
  description: string;
  isAvailable: boolean;
  images: string[];
  categoryId: string;
  variables: ProductBodyVariables | {}[];
}

export interface Product extends ProductBody {
  _id: string;
  averageScore: number;
  scores: Object;
  createdAt: string;
  updatedAt: string;
}

export interface EditProductNewData {
  thisCategory: ThisCategory,
  thisProduct: ProductWithVars,
  status: string
}

export interface UploadBoxProps {
  removeImg: UseFieldArrayRemove
  images: {
    id:number,
    url: string,
    dataUrl:string,
    file: File | string
  }[]
  moveImg: UseFieldArrayMove
}

export interface UploadModalProps extends UploadBoxProps {
  setValue: UseFormSetValue<ProductBodyForm>
  closeHandler: () => void
}

export interface ReadAllFilesProps {
  files: FileList | null
  useFor: string
  images: {
    id:number,
    url: string,
    dataUrl:string,
    file: File | string
  }[]
  setImages: UseFormSetValue<ProductBodyForm>
}

export interface ImagesBoxProps {
  useFor: string,
  images: {
    id:number,
    url: string,
    dataUrl:string,
    file: File | string
  }[]
  title: string,
  handleOpenUpload: () => void,
  setValue: UseFormSetValue<ProductBodyForm>
}

export interface CatListProps {
  cat: ThisCategory,
  i: number,
  thisCategory: ThisCategory,
  onCategorySelect: (i :number) => void
}

export interface DashboardListProps {
  _id:string,
  title:string,
  isProduct?:boolean,
  isCategory?:boolean,
  isUser?:boolean,
  img?: string
}
  
export interface VarListProps {
  thisVariable: {
    name: string
    type: string
    options?: { name: string, isSelected: boolean }[]
  }
  outerIndex: number
  onOptionSelect: (outerIndex: number, innerIndex: number, thisType:string) => void
  length: number
  register: UseFormRegister<ProductBodyForm>
}

export interface SingleProductVars {
  name: string,
  vals: string[],
  isSelected: boolean
}

// CART TYPES ==============================================
export interface CartBody {
  productId: string,
  userId: string | undefined
}

export interface PaginationBody {
  page: number
  limit: number
} 


// ADDRESS TYPES ==============================================
export interface AddressBody {
  location: {
    address: string,
    postalcode: string,
      geo: {
        lat: number,
        lon: number
      }
    },
    receiver: {
      name: string,
      phone: string
    }
  }

  export interface AddAddressFormValues {
    address: string,
    postalcode: string,
    geo: {
      lat: string,
      lon: string
    }
    receiver: {
      name: string,
      phone: string
    }
  }

  
  // COMMENT TYPES ==============================================
  export interface AddCommentBody {
    productId: string,
  text: string | null
}

export interface CommentData {
    commentText: string,
    score: number,
    openCommentSection: boolean
}

export interface AddCommentProps {
  onSubmit: () => void,
  setCommentsData: React.Dispatch<React.SetStateAction<{
    commentText: string;
    score: number;
    openCommentSection: boolean;
  }>>
  commentsData: CommentData

}

export interface CommentShape {
  user: string,
  text: string,
}

export interface Comment {
  _id: string,
  createdAt: string,
  productId: string,
  text: string,
  userId: string,
}


// RATE TYPES ==============================================
export interface AddRateBody {
  productId: string,
  score: number
}

// USER TYPES ==============================================
export interface ThisUser {
  authObj: {
    code: string,
    date: string
  }
  createdAt: string
  name: string
  phone: string
  updatedAt: string
  _id: string
}
