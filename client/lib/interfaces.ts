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
  img: string;
  title: string;
  price: string;
}

export interface CommentShape {
  id?: number;
  user: string;
  pic: string;
  rate: any;
  text: string;
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
  title: "",
  isAvalible: false,
  cats: [],
  thisCategory: {},
  images: [] | {url:string}[],
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
  useFor: string
}

export interface ProductBody {
  title: string;
  price: number;
  quantity: number;
  description: string;
  isAvalible: boolean;
  images: string[];
  categoryId: string;
  variables: ProductBodyVariables;
}

export interface ProductBodyVariables {
  [key: string]: string[]
}

export interface ThisCategory extends Category {
  vars: {
    name: string;
    type: string;
    options: { name: string, isSelected: boolean }[];
    isSelected:boolean
  }[];
  isSelected: boolean
}

export interface ProductBodyForm {
  title: string;
  price: number; 
  quantity: number;
  isAvalible: boolean;
  cats: ThisCategory[];
  images: {
    url: unknown
  }[]
  thisCategory: ThisCategory
  openUpload: boolean
  files: File[]
  description: string
}

export interface Product extends ProductBody {
  _id: string;
  averageScore: number;
  scores: Object;
  createdAt: string;
  updatedAt: string;
}

export interface UploadBoxProps {
  removeImg: UseFieldArrayRemove
  images: { url: unknown }[]
  moveImg: UseFieldArrayMove
}

export interface UploadModalProps extends UploadBoxProps {
  setValue: UseFormSetValue<ProductBodyForm>
  closeHandler: () => void
  files: File[]
}

export interface ReadAllFilesProps {
  files: FileList | null
  useFor: string
  images: {
    url: unknown
  }[]
  setImages: UseFormSetValue<ProductBodyForm>
}

export interface ImagesBoxProps {
  useFor: string,
  images: {
    url: unknown
  }[],
  title: string,
  handleOpenUpload: () => void,
  setValue: UseFormSetValue<ProductBodyForm>
  files: File[]
}

export interface CatListProps {
  cat: ThisCategory,
  i: number,
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


// CART TYPES ==============================================
export interface CartBody {
  productId: string,
  userId: string
}

export interface PaginationBody {
  page: number
  limit: number
}