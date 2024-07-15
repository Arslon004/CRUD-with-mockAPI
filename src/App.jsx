import { BrowserRouter, Route, Routes } from "react-router-dom"
import CategoryPage from "./pages/CategoryPage"
import LoginPage from "./pages/LoginPage"
import ProductPage from "./pages/ProductPage"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="" element={<CategoryPage/>}></Route>
      <Route path="login" element={<LoginPage/>}/>
      <Route path="product" element={<ProductPage/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
