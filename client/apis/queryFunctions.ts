import { getRequest } from "./baseConfig";

const myAddresses = async () => await getRequest('/address/list', true)

const myOrders = async () => await getRequest('/order/my-orders', true)

const myCart = async () => await getRequest('/cart', true)

const categories = async () => await getRequest('/category')

const comments = async (productId: string) => await getRequest(`/comment/${productId}`)

const allProducts = async () => await getRequest('/product')

const topProducts = async () => await getRequest('/product/top-products')

const singleProduct = async (productId: string) => await getRequest(`/product/${productId}`)

export default {myAddresses, myOrders, myCart, categories, comments, allProducts, topProducts, singleProduct}