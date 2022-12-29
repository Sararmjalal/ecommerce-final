import {Dispatch, SetStateAction} from "react";

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
  id?: number;
  img: string;
  title: string;
  price: number;
  lastPrice: null | number;
  badge: boolean;
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

export interface ProductBody {
  title: string;
  price: string;
  quantity: string;
  description: string;
  isAvalible: boolean;
  images: string[];
  categoryId?: string;
  variables?: Object;
}

export interface Product extends ProductBody {
  _id: string;
  averageScore: number;
  scores: Object;
  createdAt: string;
  updatedAt: string;
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
  name: string
  path: string
}

export interface DashboardMenuProps {
  menu: MenuProps[]
  logoutFunc: () => void
}

export interface LayoutProps {
  children: JSX.Element | JSX.Element[]
  userMenu: MenuProps[]
}