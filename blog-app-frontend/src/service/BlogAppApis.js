import axios from "axios"
import { DELETE_BLOG_API, GET_BLOGS_API, LOGIN_API, SAVE_BLOG_API, SAVE_USER_API, SUCCESS_RESPONSE } from "../util/ApiConstants"
import { setToken } from "../util/BlogAppUtil"
import { DEFAULT_ALL_BLOGS } from "../util/DefaultDataConstants"

export const register = (registrationData, navigate) => {
  axios.post(SAVE_USER_API, registrationData)
  .then(data => {
    JSON.stringify(data)
    if(data.data === SUCCESS_RESPONSE) {
      navigate("/");
    }
  })
  .catch(error => {
    navigate("error");
  })
}

export const login = (loginCredentials, navigate, setIsInvalid, setIsLoggedIn) => {
  axios.post(LOGIN_API, loginCredentials)
  .then(data => {
    JSON.stringify(data)
    if(data.data.email !== null && data.data.email === loginCredentials.email) {
      setToken(data.data)
      setIsLoggedIn(true);
      navigate("/home");
    } else {
      setIsInvalid(true);
    }
  })
  .catch(error => {
    setIsInvalid(true);
  })
}

export const getAllBlogs = (setAllBlogs) => {
  axios.get(GET_BLOGS_API)
  .then(data => {
    JSON.stringify(data)
    setAllBlogs(data.data)
  })
  .catch(error => {
    setAllBlogs(DEFAULT_ALL_BLOGS)
  })
}

export const saveComment = (blog, navigate) => {
  axios.post(SAVE_BLOG_API, blog)
  .then(data => {
    JSON.stringify(data)
    if(data.data === SUCCESS_RESPONSE) {
      navigate("/blog", {state: {blog}})
    }
  })
}

export const saveBlog = (blog, navigate) => {
  console.log(blog)
  axios.post(SAVE_BLOG_API, blog)
  .then(data => {
    JSON.stringify(data)
    if(data.data === SUCCESS_RESPONSE) {
      navigate("/home")
    }
  })
}

export const deleteBlog = (blogId, navigate) => {
  axios.delete(DELETE_BLOG_API + blogId)
  .then(data => {
    JSON.stringify(data)
    if(data.data === SUCCESS_RESPONSE) {
      navigate("/home")
    }
  })
}