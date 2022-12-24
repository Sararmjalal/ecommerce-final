import { postRequest } from "./baseConfig";
import { Location, Receiver, AddressData } from "../lib/interfaces";

const createAdmin = async (name: string, phone: string) => await postRequest('/admin/create', { name, phone }, 'admin')

const adminLoginOne = async (phone: string) => await postRequest('/admin/login-step-one', { phone })

const adminLoginTwo = async (phone: string, code: string) => await postRequest('/admin/login-step-two', { phone, code })

const adminInfo = async () => await postRequest('/admin/me', {}, 'admin')

const addressByUser = async (userId: string) => await postRequest('/address/userList', { userId }, 'admin')

const allUsers = async(page:number, limit: number) => await postRequest('/user/allusers', {page, limit}, 'admin')

const userSignupOne = async (phone: string, name: string) => await postRequest('/user/sign-up-one', { phone, name })

const userSignupTwo = async (phone: string, code: string) => await postRequest('/user/sign-up-two', { phone, code })

const userLoginOne = async (phone: string) => await postRequest('/user/login-one', { phone })

const userLoginTwo = async (phone: string, code: string) => await postRequest('/user/login-two', { phone, code })

const userInfo = async () => await postRequest('/user/me', {}, 'user')

const createAddress = async (location:Location, receiver: Receiver) => await postRequest("/address/create", { location, receiver }, 'user')

const editAddress = async (addressId: string, data: AddressData) => await postRequest(`/address/edit/${addressId}`, {data}, 'user')

const deleteAddress = async (addressId: string) => await postRequest('/address/delete', { _id: addressId }, 'user')

const addToCart = async (productId: string, userId: string) => await postRequest('/cart/add', { productId, userId }, 'user')

const removeFromCart = async (productId: string, userId: string) => await postRequest('/cart/remove', { productId, userId }, 'user')

const changeCart = async (productId: string, userId: string, quantity: number) => await postRequest('/cart/change', { productId, userId, quantity }, 'user')

const checkout = async () => await postRequest('/order/check-out', {}, 'user')

const submitComment = async (productId: string, text: string) => await postRequest('/comment/submit', { productId, text }, 'user')

const submitRate = async (productId: string, score: number) => await postRequest('/rate/submit', { productId, score }, 'user')

export default {
  createAdmin, adminLoginOne, adminLoginTwo, adminInfo, addressByUser, allUsers,
  userSignupOne, userSignupTwo, userLoginOne, userLoginTwo,
  userInfo, createAddress, editAddress, deleteAddress,
  addToCart, removeFromCart, changeCart,
  checkout, submitComment, submitRate
}