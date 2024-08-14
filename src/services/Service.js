import axios from "axios"

const loginApi = (username,password) => {
    return axios.post('https://fakestoreapi.com/auth/login',{username,password})
}
const getAllUsers = () => {
    return {axios: axios.get(`https://fakestoreapi.com/users`),url: `https://fakestoreapi.com/users`}
}

const DeleteUser = (id) => {
    return axios.delete(`https://fakestoreapi.com/users/${id}`)
}
const DeleteCart = (id) => {
    return axios.delete(`https://fakestoreapi.com/carts/${id}`)
}
const DeleteProduct = (id) => {
    return axios.delete(`https://fakestoreapi.com/products/${id}`)
}
const getAllCarts = () => {
    return {axios: axios.get(`https://fakestoreapi.com/carts`),url: `https://fakestoreapi.com/carts`}
}
const getAllProducts = () => {
    return {axios: axios.get(`https://fakestoreapi.com/products`),url: `https://fakestoreapi.com/products`}
}
const getProduct = (id) => {
   return axios.get(`https://fakestoreapi.com/products/${id}`)
}
const addProduct = (item) => {
    return axios.post(`https://fakestoreapi.com/products`,item)
 }
 const updateProduct = (item) => {
    return axios.post(`https://fakestoreapi.com/products`,item)
 }


export {loginApi,getAllUsers,DeleteUser,getAllCarts,getProduct,DeleteCart,
            getAllProducts,DeleteProduct,addProduct}