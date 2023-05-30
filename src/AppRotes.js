import { Route, Routes } from "react-router-dom"
import UserBlock from "./components/userBlock/userBlock"
import { LoginPage } from "./pages/loginPage"
import { MainPage } from "./pages/mainPage"

export const AppRoutes = () => {
    const basic = '/Insta-Like-Interface'
    //Вопрос для встречи
    
    return (

    <Routes>
        <Route path={`${basic}`} element={<MainPage />} />
        <Route path={`${basic}/login`} element={<LoginPage />} />
        <Route path={`${basic}/block`} element={<UserBlock />} />
    </Routes>
    )
}