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

export const userInit = (login, name, password, token, _id) => {
  localStorage.clear()

  localStorage.setItem('login', login)
  localStorage.setItem('name', name)
  localStorage.setItem('password', password)
  localStorage.setItem('token', token)
  localStorage.setItem('_id', _id)
}