import { Route, Routes } from "react-router-dom"
import Main from "./components/main/main"

export const AppRoutes = () => {
    const basic = '/Insta-Like-Interface'
    //Вопрос для встречи
    
    return (

    <Routes>
        <Route path={`${basic}`} element={<Main />} />
    </Routes>
    )
}