import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import kr from "../../../language/Kr-kr.json";

const Topmenu: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const getActiveItem = useCallback(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes("/about")) return "about";
    if (path.includes("/work")) return "work";
    if (path.includes("/productlist")) return "products";
    return null;
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setHoveredItem(getActiveItem());
  }, [getActiveItem]);

  const handleMenuClick = (path: string, item: string) => {
    navigate(path);
  };

  return (
    <NavBarContainer isScrolled={!isHomePage}>
      <InnerContainer>
        <MenuBackground>
          <NavItem isActive={hoveredItem === "work"} onClick={() => handleMenuClick("/Work", "work")}>
            {kr.menukr.workkr}
          </NavItem>
          <NavItem isActive={hoveredItem === "about"} onClick={() => handleMenuClick("/About", "about")}>
            {kr.menukr.aboutkr}
          </NavItem>
          <NavItem isActive={hoveredItem === "products"} onClick={() => handleMenuClick("/ProductList", "products")}>
            {kr.menukr.productList}
          </NavItem>
          <NavItem isActive={false} onClick={() => {}}>Q&A</NavItem>
        </MenuBackground>
      </InnerContainer>
    </NavBarContainer>
  );
};

export default Topmenu;

const NavBarContainer = styled.header<{ isScrolled: boolean }>`
  position: fixed;
  /* HeroSection의 margin-top인 110px에서 높이의 절반을 빼서 중심을 맞춥니다 */
  top: calc(110px - (60px / 2)); 
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 600px;
  height: 55px;
  background: white;
  border-radius: 50px;
  /* 이미지 위에서 잘 보이도록 그림자를 더 진하게 적용합니다 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); 
  z-index: 2000; /* HeroSection(1)보다 높은 숫자로 설정 */
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
`;

const InnerContainer = styled.div`
  width: 100%;
  padding: 0 10px;
`;

const MenuBackground = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const NavItem = styled.div<{ isActive: boolean }>`
  padding: 12px 30px;
  border-radius: 40px;
  font-weight: 700;
  cursor: pointer;
  background: ${props => (props.isActive ? "#4d5154" : "transparent")};
  color: ${props => (props.isActive ? "white" : "#333")};
  transition: 0.3s;
`;