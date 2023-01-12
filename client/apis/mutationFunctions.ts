import {postRequest} from "./baseConfig";
import { Location, Receiver, AddressData, ProductBody, CreateCategoryBody, PaginationBody, AddressBody, AddCommentBody, AddRateBody, RemoveCartBody, AddCartBody, ChangeCartBody} from "../lib/interfaces";

export const createAdmin = async (name: string, phone: string) => await postRequest("/admin/create", {name, phone}, "admin");

export const adminLoginOne = async (phone: string) => await postRequest("/admin/login-step-one", {phone});

export const adminLoginTwo = async (phone: string, code: string) => await postRequest("/admin/login-step-two", {phone, code});

export const adminInfo = async () => await postRequest("/admin/me", {}, "admin");

export const addressByUser = async (userId: string) => await postRequest("/address/userList", {userId}, "admin");

export const createCategory = async (category: CreateCategoryBody) => await postRequest("/category/create", category, "admin");
 
export const createProduct = async (body: ProductBody) => await postRequest("/product/create", body, "admin");

export const editProduct = async (productId: string, data: ProductBody) => await postRequest("/product/edit", {productId, data}, "admin");

export const allUsers = async (body: PaginationBody | string) => await postRequest("/user/allusers", body);

export const userSignupOne = async (phone: string, name: string) => await postRequest("/user/sign-up-one", {phone, name});

export const userSignupTwo = async (phone: string, code: string) => await postRequest("/user/sign-up-two", {phone, code});

export const userLoginOne = async (phone: string) => await postRequest("/user/login-one", {phone});

export const userLoginTwo = async (phone: string, code: string) => await postRequest("/user/login-two", {phone, code});

export const userInfo = async () => await postRequest("/user/me", {}, "user");

export const createAddress = async (body:AddressBody) => await postRequest("/address/create", body, "user");

export const editAddress = async (addressId: string, data: AddressData) => await postRequest(`/address/edit/${addressId}`, {data}, "user");

export const deleteAddress = async (addressId: string) => await postRequest("/address/delete", {_id: addressId}, "user");

export const addToCart = async (body: AddCartBody) => await postRequest("/cart/add", body, "user");

export const removeFromCart = async (body: RemoveCartBody) => await postRequest("/cart/remove", body, "user");

export const changeCart = async (body:ChangeCartBody) => await postRequest("/cart/change", body, "user")

export const checkout = async () => await postRequest("/order/check-out", {}, "user");

export const submitComment = async (body: AddCommentBody) => await postRequest("/comment/submit", body, "user");

export const submitRate = async (body: AddRateBody) => await postRequest("/rate/submit", body, "user"); 

export const upload = async (formData: FormData) => await postRequest('/file/upload-reserve', formData, 'admin')
