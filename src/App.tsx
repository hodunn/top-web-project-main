import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// 1. 아래 import 문이 누락되어 에러가 발생한 것입니다. 반드시 추가해주세요!
import ScrollToTop from "./components/ScrollToTop"; 

import Home from "./screens/topwebpro/Home";
import About from "./screens/topwebpro/About";
import Work from "./screens/topwebpro/work"; 
import AddProduct from "./screens/topwebpro/menu/AddProduct";
import ProductList from "./screens/topwebpro/menu/ProductList";
import ProductAdminList from "./screens/topwebpro/menu/ProductAdminList";

function HashShim() {
  const navigate = useNavigate();
  useEffect(() => {
    const h = window.location.hash;
    if (h && h.startsWith("#/")) {
      navigate(h.slice(1), { replace: true });
    }
  }, [navigate]);
  return null;
}

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Router>
        {/* 이제 ScrollToTop을 정상적으로 인식합니다 */}
        <ScrollToTop /> 
        <HashShim />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} /> 
            <Route path="/productlist" element={<ProductList />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/productAdminlist" element={<ProductAdminList />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;