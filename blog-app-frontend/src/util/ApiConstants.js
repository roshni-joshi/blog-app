import { getBaseURL } from "./BlogAppUtil"

export const BASE_URL = getBaseURL();
export const SUCCESS_RESPONSE = "success";
export const SAVE_USER_API = BASE_URL + "users";
export const LOGIN_API = BASE_URL + "login";
export const GET_BLOGS_API = BASE_URL + "blogs";
export const SAVE_BLOG_API = BASE_URL + "blogs";
export const DELETE_BLOG_API = BASE_URL + "blogs/";