import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import kr from "../../../language/Kr-kr.json";

const Topmenu: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const getActiveItem = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes("/about")) return "about";
    if (path.includes("/work")) return "work";
    if (path.includes("/productlist") || path.includes("/products")) return "products";
    return null;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setHoveredItem(getActiveItem());
  }, [location.pathname]);

  const handleMenuClick = (path: string, item: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setHoveredItem(item);
  };

  return (
    <NavBarContainer isScrolled={isScrolled || !isHomePage}>
      <InnerContainer>
        <LeftSection>
          <Logo
            src={process.env.PUBLIC_URL + "/assets/logo_image/logo2.png"}
            alt="Logo"
            onClick={() => handleMenuClick("/", "home")}
          />
          
          <DesktopNavItems>
            <MenuBackground>
              <NavItem
                isActive={hoveredItem === "about"}
                onMouseEnter={() => setHoveredItem("about")}
                onMouseLeave={() => setHoveredItem(getActiveItem())}
                onClick={() => handleMenuClick("/About", "about")}
              >
                {kr.menukr.aboutkr}
              </NavItem>
              <NavItem
                isActive={hoveredItem === "work"}
                onMouseEnter={() => setHoveredItem("work")}
                onMouseLeave={() => setHoveredItem(getActiveItem())}
                onClick={() => handleMenuClick("/Work", "work")}
              >
                {kr.menukr.workkr}
              </NavItem>
              <NavItem
                isActive={hoveredItem === "products"}
                onMouseEnter={() => setHoveredItem("products")}
                onMouseLeave={() => setHoveredItem(getActiveItem())}
                onClick={() => handleMenuClick("/ProductList", "products")}
              >
                {kr.menukr.productList}
              </NavItem>
              <HoverHighlight hoveredItem={hoveredItem} />
            </MenuBackground>
          </DesktopNavItems>
        </LeftSection>

        <RightSection>
          <SearchArea>
            <SearchInput placeholder={kr.menukr.searchPlaceholder} />
            <SearchIcon>🔍</SearchIcon>
          </SearchArea>

          <MobileToggleButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? "✕" : "☰"}
          </MobileToggleButton>
        </RightSection>
      </InnerContainer>

      {isMobileMenuOpen && (
        <MobileMenu>
          <MobileNavItem onClick={() => handleMenuClick("/About", "about")}>{kr.menukr.aboutkr}</MobileNavItem>
          <MobileNavItem onClick={() => handleMenuClick("/Work", "work")}>{kr.menukr.workkr}</MobileNavItem>
          <MobileNavItem onClick={() => handleMenuClick("/ProductList", "products")}>{kr.menukr.productList}</MobileNavItem>
        </MobileMenu>
      )}
    </NavBarContainer>
  );
};

export default Topmenu;

/* --- 스타일 정의 --- */

const NavBarContainer = styled.header<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: #ffffff;
  border-bottom: 1px solid #eaeaea; 
  z-index: 2000;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 45px;
  cursor: pointer;
  margin-right: 35px; 
`;

const DesktopNavItems = styled.nav`
  display: flex;
  align-items: center;
  @media (max-width: 1024px) { display: none; }
`;

const MenuBackground = styled.div`
  position: relative;
  display: flex;
  background-color: #333d42;
  border-radius: 50px;
  padding: 4px; 
  min-width: 300px; /* 3개 항목에 맞춰 너비 조정 */
  align-items: center;
`;

const NavItem = styled.div<{ isActive: boolean }>`
  position: relative;
  flex: 1;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  z-index: 2;
  transition: color 0.3s ease;
  color: ${(props) => (props.isActive ? "#333d42" : "#ffffff")};
`;

const HoverHighlight = styled.div<{ hoveredItem: string | null }>`
  position: absolute;
  top: 4px;
  left: 4px;
  /* 3개 메뉴이므로 전체 너비에서 여백을 고려한 정확한 1/3 너비 설정 */
  width: calc((100% - 8px) / 3); 
  height: calc(100% - 8px);
  background-color: #ffffff;
  border-radius: 40px;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  opacity: ${(props) => (props.hoveredItem ? 1 : 0)};
  z-index: 1;

  /* translateX 값을 100%, 200%로 설정하면 
    해당 요소의 너비만큼 정확히 한 칸, 두 칸 이동합니다.
  */
  transform: ${(props) => {
    switch (props.hoveredItem) {
      case "about": return "translateX(0%)";
      case "work": return "translateX(100%)";
      case "products": return "translateX(200%)";
      default: return "translateX(0%)";
    }
  }};
`;

const SearchArea = styled.div`
  position: relative;
  flex: 0 1 220px;
  @media (max-width: 768px) { display: none; }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 15px;
  background: #f1f3f5;
  border: none;
  border-radius: 4px;
  font-size: 13px;
`;

const SearchIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #999;
`;

const MobileToggleButton = styled.div`
  display: none;
  font-size: 24px;
  cursor: pointer;
  margin-left: 15px;
  @media (max-width: 1024px) { display: block; }
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  z-index: 1999;
`;

const MobileNavItem = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  font-size: 16px;
  cursor: pointer;
`;