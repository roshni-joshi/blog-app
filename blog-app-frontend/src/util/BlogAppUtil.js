export const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (emailRegex.test(email)) {
      return true
    } else {
      return false
    }
}

export const getBaseURL = () => {
  const { hostname, protocol } = window.location;
  const url = `${protocol}//${hostname}:8080/`;
  return url;
}

export const setToken = (userData) => {
  sessionStorage.setItem('user', JSON.stringify(userData));
}

export const getUser = () => {
  return JSON.parse(sessionStorage.getItem("user"));
}

export const logout = () => {
  sessionStorage.removeItem("user")
}