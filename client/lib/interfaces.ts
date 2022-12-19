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

export interface SelectedProduct {
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
  pathname: string
  query?: {
    [key: string]: string
  }
}

export interface GuideLinkArg {
  name: string
  href: DynamicLink
}