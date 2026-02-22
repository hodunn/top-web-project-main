import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Topmenu from "./menu/TopMenu";
import kr from "../../language/Kr-kr.json";
import Bottommenu from "./menu/BottomMenu";

interface Product {
  id: string;
  image: string;
  category: string;
  name: string;
  price: number;
  stock: string;
  description: string;
  link: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data.slice(0, 4));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMore = () => {
    navigate("/ProductList");
  };

  const handleProductClick = (link: string) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <HomeWrapper>
      <Topmenu />
      
      <HeroSection>
        <HeroContent>
          <SubTitle>{kr.home.subTitle}</SubTitle>
          <HeroTitle>
            <div>
              공간의 가치를 더하는 <HighlightText> 정밀 난방 솔루션</HighlightText>
            </div>
          </HeroTitle>
          
          <DescriptionContainer>
            <SubhighlightText>{kr.home.subhighlightText}</SubhighlightText>
            <DetailText>
              {kr.home.detailText.split('\n').map((line, i) => (
                <span key={i}>{line}<br/></span>
              ))}
            </DetailText>
            <ClosingText>{kr.home.closingText}</ClosingText>
          </DescriptionContainer>

          <PhoneNumber>{kr.home.phoneNumber}</PhoneNumber>
        </HeroContent>

        <HeroImageWrapper>
          <HeroImage 
            src={process.env.PUBLIC_URL + "/assets/home_image/mainimage.jpg"} 
            alt="난방 수리 작업 현장" 
          />
        </HeroImageWrapper>
      </HeroSection>

      <FeatureSection>
        <SectionHeader>
          <h2>{kr.home.whyTitle}</h2>
          <p>{kr.home.whyDesc}</p>
        </SectionHeader>

        <FeatureGrid>
          <FeatureCard>
            <IconBox>🗑️</IconBox>
            <h3>{kr.home.feature1Title}</h3>
            <p>{kr.home.feature1Desc}</p>
          </FeatureCard>
          <FeatureCard>
            <IconBox>⚙️</IconBox>
            <h3>{kr.home.feature2Title}</h3>
            <p>{kr.home.feature2Desc}</p>
          </FeatureCard>
          <FeatureCard>
            <IconBox>🛠️</IconBox>
            <h3>{kr.home.feature3Title}</h3>
            <p>{kr.home.feature3Desc}</p>
          </FeatureCard>
        </FeatureGrid>

        <CallTextContainer>
          <CallText>
            {kr.home.callText}<br/>
            {kr.home.phoneNumber}
          </CallText>
        </CallTextContainer>
      </FeatureSection>

      <ProductSection>
        <ProductHeader>
          <h2>{kr.home.mainProducts}</h2>
          <MoreLink onClick={handleViewMore}>{kr.home.viewMore}</MoreLink>
        </ProductHeader>
        
        {loading ? (
           <EmptyMessage>제품 정보를 불러오는 중입니다...</EmptyMessage>
        ) : products.length > 0 ? (
          <ProductGrid>
            {products.map((product) => (
              <ProductCard key={product.id} onClick={() => handleProductClick(product.link)}>
                <ProductImageContainer>
                  <ProductImage 
                    src={product.image} 
                    alt={product.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x300?text=No+Image";
                    }}
                  />
                </ProductImageContainer>
                <ProductInfo>
                  <CategoryTag>{product.category}</CategoryTag>
                  <ProductName>{product.name}</ProductName>
                  <ProductPrice>
                    {product.price ? `${product.price.toLocaleString()}원` : kr.home.priceContact}
                  </ProductPrice>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductGrid>
        ) : (
          <EmptyContainer>
            <EmptyMessage>아직 등록된 제품이 없습니다.</EmptyMessage>
          </EmptyContainer>
        )}
      </ProductSection>

      <Bottommenu/>
    </HomeWrapper>
  );
};

export default Home;

const HomeWrapper = styled.div`
  padding-top: 30px;
  background-color: #f8f9fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeroSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 180px 50px 180px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  @media (max-width: 992px) { flex-direction: column; text-align: center; padding: 60px 20px; }
`;

const HeroContent = styled.div`
  flex: 1.2;
`;

const SubTitle = styled.p`
  font-size: 15px;
  color: #2d2d2d;
  margin-bottom: 15px;
  font-weight: 600;
  letter-spacing: -0.5px;
`;

const HeroTitle = styled.h1`
  font-size: 50px;
  font-weight: 900;
  line-height: 1.2;
  margin-bottom: 35px;
  color: #2d2d2d;
  letter-spacing: -2px;
  word-break: keep-all;
  @media (max-width: 768px) { font-size: 38px; }
`;

const HighlightText = styled.span`
  color: #3171c6 !important;
  font-weight: 900;
  display: inline-block;
`;

const DescriptionContainer = styled.div`
  margin-bottom: 40px;
`;

const SubhighlightText = styled.p`
  font-size: 17px;
  font-weight: 700;
  color: #2d2d2d;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
`;

const DetailText = styled.p`
  font-size: 15px;
  color: #2d2d2d;
  line-height: 1.7;
  margin-bottom: 12px;
  word-break: keep-all;
  font-weight: 400;
`;

const ClosingText = styled.p`
  font-size: 15px;
  color: #555;
  font-weight: 500;
`;

const PhoneNumber = styled.div`
  font-size: 44px;
  font-weight: 900;
  color: #34292a;
  letter-spacing: -1.5px;
  @media (max-width: 768px) { font-size: 32px; }
`;

const HeroImageWrapper = styled.div`
  flex: 2.0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const HeroImage = styled.img`
  width: 100%;
  max-width: 600px;
  border-radius: 5px;
  object-fit: cover;
`;

const FeatureSection = styled.section`
  max-width: 1280px;
  margin: 20px auto;
  padding: 50px 30px;
  background: #ffffff;
  border-radius: 40px;
  display: flex;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  flex-direction: column;
  align-items: center;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  h2 { font-size: 32px; font-weight: 800; margin-bottom: 15px; letter-spacing: -1px; }
  p { color: #666; font-size: 16px; font-weight: 500; }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  width: 100%;
  margin-bottom: 20px;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const FeatureCard = styled.div`
  padding: 45px 30px;
  background: #f8f9fa;
  border-radius: 24px;
  text-align: center;
  transition: all 0.3s ease;
`;

const IconBox = styled.div` font-size: 42px; `;

const CallTextContainer = styled.div`
  width: 100%;
  text-align: center;
  padding: 30px 0;
`;

const CallText = styled.p`
  font-size: 18px;
  color: #000;
  font-weight: 800;
  line-height: 1.6;
`;

const ProductSection = styled.section`
  max-width: 1280px;
  margin: 100px auto;
  padding: 0 20px;
  min-height: 300px;
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
  h2 { font-size: 28px; font-weight: 800; letter-spacing: -1px; }
`;

const MoreLink = styled.span` 
  color: #333; 
  font-weight: 700;
  font-size: 15px;
  cursor: pointer; 
  text-decoration: underline;
  text-underline-offset: 4px;
  &:hover { color: #000; }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover { transform: translateY(-8px); }
`;

const ProductImageContainer = styled.div` 
  background: #f4f4f4; 
  aspect-ratio: 1; 
  display: flex; 
  align-items: center; 
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
`;

const ProductImage = styled.img` 
  width: 100%; 
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s; 
  ${ProductCard}:hover & { transform: scale(1.05); } 
`;

const ProductInfo = styled.div` padding: 20px 5px; `;

const CategoryTag = styled.div` font-size: 13px; color: #888; font-weight: 600; margin-bottom: 8px; `;

const ProductName = styled.h4` 
  font-size: 16px; 
  margin-bottom: 10px; 
  color: #111; 
  font-weight: 800; 
  letter-spacing: -0.5px; 
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProductPrice = styled.p` font-size: 18px; font-weight: 900; color: #000; `;

const EmptyContainer = styled.div`
  width: 100%;
  padding: 60px 0;
  background-color: #f9f9f9;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #888;
  font-size: 16px;
  font-weight: 500;
`;