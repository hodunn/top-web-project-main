import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Home from "./screens/topwebpro/Home";
import About from "./screens/topwebpro/About";
import Work from "./screens/topwebpro/work"; // 1. work 파일 임포트 추가 20일에 넣었음
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
        <HashShim />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} /> 
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/productlist" element={<ProductList />} />
            <Route path="/productAdminlist" element={<ProductAdminList />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;