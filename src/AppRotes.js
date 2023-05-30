import { Route, Routes } from "react-router-dom"
import Login from "./components/login/login"
import Main from "./components/main/main"

export const AppRoutes = () => {
    const basic = '/Insta-Like-Interface'
    //Вопрос для встречи
    
    return (

    <Routes>
        <Route path={`${basic}`} element={<Main />} />
        <Route path={`${basic}/login`} element={<Login />} />
    </Routes>
    )
}