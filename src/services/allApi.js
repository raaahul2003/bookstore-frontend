import apiService from "../api/apiService"
import AllBooks from "../user/pages/AllBooks"


//register api
export const registerAPI = async (userData) => {
    return await apiService('POST', '/register', userData)
}

// login api
export const loginAPI = async (userData) => {
    return await apiService('POST', '/login', userData)
}

// google login api
export const googleLoginAPI = async (userData) => {
    return await apiService('POST', '/google-login', userData)
}


// user profile update api
export const userUpdateAPI = async (userId, userData) => {
    return await apiService('PUT', `/user/edit/${userId}`, userData)
}

// add book api
export const addBookApi = async (bookDetails) => {
    return await apiService('POST', '/add-book', bookDetails)
}

// homePageBooks APi
export const homePageBooksAPI = async () => {
    return await apiService('GET', '/homebooks', {})
}


// AllBooks API
export const getBooksAPI = async (searchKey) => {
    return await apiService('GET', `/all-books?search=${searchKey}`, {})
}

// get user books API
export const getUserBooksAPI = async () => {
    return await apiService('GET', '/user-books', {})
}

// get user bought books API
export const getUserBoughtBooksAPI = async () => {
    return await apiService('GET', '/bought-books', {})
}


// single-book /:id
export const getSingleBookAPI = async (id) => {
    return await apiService('GET', `/single-book/${id}`, {})
}

// remove-book /:id
export const removeBookAPI = async (id) => {
    return await apiService('DELETE', `/remove-book/${id}`, {})
}

// make-payment /:id
export const paymentAPI = async (id) => {
    return await apiService('GET', `/make-payment/${id}`, {})
}

// verify-payment 
export const verifyPaymentAPI = async (reqBody) => {
    return await apiService('POST', `/verify-payment`, reqBody)
}


// get admin books API
export const booksAPI = async () => {
    return await apiService('GET', '/books', {})
}

// admin profile update api
export const adminUpdateAPI = async (userId, userData) => {
    return await apiService('PUT', `/admin/edit/${userId}`, userData)
}


// admin approve  api
export const approveAPI = async (userId) => {
    return await apiService('PUT', `/book-approve/${userId}`,{})
}

// all users api
export const allUsersAPI = async () => {
    return await apiService('GET', `/all-users`,{})
}

export const getAbstractAPI = async (title) => {
    return await apiService('POST', `/books-ai`,{title})
}