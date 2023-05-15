export const userInfo = () => {
  let userData
  return userData = {
    token : localStorage.getItem('token'),
    _id : localStorage.getItem('_id'),
    login : localStorage.getItem('login'),
    name : localStorage.getItem('name'),
    password : localStorage.getItem('password'),
  } 
}