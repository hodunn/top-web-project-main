import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import kr from "../../../language/Kr-kr.json";

const Bottommenu: React.FC = () => {
  const navigate = useNavigate();

  const handleMenuClick = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <FooterContainer>
      <InnerContainer>
        <BrandSection>
          <Logo
            src={process.env.PUBLIC_URL + "/assets/logo_image/logo3.png"}
            alt="Logo"
            onClick={() => handleMenuClick("/")}
          />
          <Description>{kr.footer.description}</Description>
        </BrandSection>

        <MenuSection>
          <Title>{kr.menukr.productList}</Title>
          <MenuItem onClick={() => handleMenuClick("/ProductList")}>보일러</MenuItem>
          <MenuItem onClick={() => handleMenuClick("/ProductList")}>히트 펌프</MenuItem>
          <MenuItem onClick={() => handleMenuClick("/ProductList")}>라디에이터</MenuItem>
          <MenuItem onClick={() => handleMenuClick("/ProductList")}>배관 자재</MenuItem>
        </MenuSection>

        <MenuSection>
          <Title>{kr.footer.support}</Title>
          <MenuItem>{kr.footer.technicalGuides}</MenuItem>
          <MenuItem>{kr.footer.warranty}</MenuItem>
          <MenuItem>{kr.footer.tradeAccounts}</MenuItem>
          <MenuItem>{kr.footer.delivery}</MenuItem>
        </MenuSection>
      </InnerContainer>

      <CopyrightArea>
        <p>{kr.footer.copyright}</p>
      </CopyrightArea>
    </FooterContainer>
  );
};

export default Bottommenu;

const FooterContainer = styled.footer`
  background-color: #ffffff;
  border-top: 1px solid #eaeaea;
  padding: 40px 0 20px 0;
  margin-top: auto;
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 10px;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Logo = styled.img`
  height: 32px;
  width: fit-content;
  cursor: pointer;
`;

const Description = styled.p`
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  max-width: 300px;
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h4`
  font-size: 15px;
  font-weight: 700;
  color: #333;
  margin-bottom: 5px;
`;

const MenuItem = styled.span`
  font-size: 13px;
  color: #555;
  cursor: pointer;
  &:hover {
    color: #007bff;
    text-decoration: underline;
  }
`;

const CopyrightArea = styled.div`
  max-width: 1280px;
  margin: 30px auto 0 auto;
  padding: 15px 10px;
  border-top: 1px solid #f1f1f1;
  text-align: center;
  font-size: 12px;
  color: #999;
`;