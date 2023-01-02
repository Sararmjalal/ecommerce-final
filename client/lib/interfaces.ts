import {Dispatch, SetStateAction} from "react";
import { UseFieldArrayRemove, UseFormSetValue } from "react-hook-form";

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

export interface Category {
  name: string;
  variables: CategoryVariableObject;
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

export interface ProductBody {
  title: string;
  price: string;
  quantity: string;
  description: string;
  isAvalible: boolean;
  images: string[];
  categoryId: string;
  variables: CategoryVariableObject;
}

export interface ProductBodyForm {
  title: string;
  price: string;
  quantity: string;
  description: string;
  isAvalible: boolean;
  images: {
    url: unknown
  }[]
  categoryId: string;
  variables: {
    name: string;
    type: string;
    options: string[];
  }[];
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
}

export interface UploadModalProps extends UploadBoxProps {
  setValue: UseFormSetValue<ProductBodyForm>
  closeHandler: () => void
}