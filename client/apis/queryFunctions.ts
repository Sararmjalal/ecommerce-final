import { getRequest } from "./baseConfig";

export const myAddresses = async () => await getRequest('/address/list', true)

export const myOrders = async () => await getRequest('/order/my-orders', true)

export const myCart = async () => await getRequest('/cart', true)

export const allCategories = async () => await getRequest("/category");

export const comments = async (productId: string) => await getRequest(`/comment/${productId}`)

export const allProducts = async () => await getRequest('/product')

export const topProducts = async () => await getRequest('/product/top-products')

export const singleProduct = async (productId: string) => await getRequest(`/product/${productId}`)

