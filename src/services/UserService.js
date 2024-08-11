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

export {loginApi,getAllUsers,DeleteUser}