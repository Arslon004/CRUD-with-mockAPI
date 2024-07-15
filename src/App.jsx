import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import CategoryPage from "./pages/CategoryPage"
import LoginPage from "./pages/LoginPage"
import ProductPage from "./pages/ProductPage"
import { TOKEN } from "./constants"
import { useState } from "react"

function App() {

 let [isLogin,setIsLogin]=useState(localStorage.getItem(TOKEN) ? true : false);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="" element={isLogin ?  <CategoryPage/> : (<Navigate to={`/login`}/>)}></Route>
      <Route path="login" element={<LoginPage setIsLogin={setIsLogin}/>}/>
      <Route path="product" element={<ProductPage/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
