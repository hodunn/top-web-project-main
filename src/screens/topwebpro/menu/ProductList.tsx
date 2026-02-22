import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Topmenu from "./TopMenu";
import Bottommenu from "./BottomMenu";
import kr from "../../../language/Kr-kr.json";

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

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("전체 제품");
  const [currentPage, setCurrentPage] = useState(1);
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
        setProducts(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = activeFilter === "전체 제품"
    ? products
    : products.filter(p => p.category === activeFilter);

  const itemsPerPage = 16;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleProductClick = (link: string) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PageButton
          key={i}
          $isActive={currentPage === i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PageButton>
      );
    }
    return pages;
  };

  return (
    <PageWrapper>
      <Topmenu />
      <ContentContainer>
        <HeaderSection>
          <Title>{kr.catalog.title}</Title>
          <Subtitle>{kr.catalog.subtitle}</Subtitle>
          <SearchInputWrapper>
            <SearchInput placeholder={kr.menukr.searchPlaceholder} />
            <SearchIcon>🔍</SearchIcon>
          </SearchInputWrapper>
        </HeaderSection>

        <FilterContainer>
          {kr.catalog.categories.map((cat) => (
            <FilterButton
              key={cat}
              $isActive={activeFilter === cat}
              onClick={() => {
                setActiveFilter(cat);
                setCurrentPage(1);
              }}
            >
              {cat}
            </FilterButton>
          ))}
        </FilterContainer>

        {loading ? (
          <LoadingMessage>Loading...</LoadingMessage>
        ) : (
          <ProductGrid>
            {currentProducts.map((product) => (
              <ProductCard key={product.id} onClick={() => handleProductClick(product.link)}>
                <ImageWrapper>
                  <ProductImage 
                    src={product.image} 
                    alt={product.name} 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />
                </ImageWrapper>
                <CardContent>
                  <CategoryText>{product.category}</CategoryText>
                  <ProductName>{product.name}</ProductName>
                </CardContent>
              </ProductCard>
            ))}
          </ProductGrid>
        )}

        {totalPages > 0 && (
          <PaginationContainer>
            <PageButton 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
            >
              &lt;
            </PageButton>
            {renderPagination()}
            <PageButton 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </PageButton>
          </PaginationContainer>
        )}
      </ContentContainer>
      <Bottommenu />
    </PageWrapper>
  );
};

export default ProductList;

const PageWrapper = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 150px 50px 100px 50px;
  box-sizing: border-box;
  flex: 1;
`;

const HeaderSection = styled.div`
  margin-bottom: 40px;
  position: relative;
`;

const Title = styled.h1`
  font-size: 35px;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #5d6d7e;
  margin-bottom: 30px;
`;

const SearchInputWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  
  @media (max-width: 768px) {
    position: static;
    width: 100%;
    margin-top: 20px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 40px 12px 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background-color: #fff;
  font-size: 14px;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #a0aec0;
  pointer-events: none;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ $isActive: boolean }>`
  padding: 10px 20px;
  border-radius: 25px;
  border: 1px solid ${(props) => (props.$isActive ? "#333d42" : "#e2e8f0")};
  background-color: ${(props) => (props.$isActive ? "#333d42" : "#ffffff")};
  color: ${(props) => (props.$isActive ? "#ffffff" : "#4a5568")};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.$isActive ? "#21282c" : "#f7fafc")};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 60px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid transparent;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  background-color: #edf2f7;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const CategoryText = styled.div`
  font-size: 13px;
  color: #007bff;
  font-weight: 600;
  margin-bottom: 8px;
`;

const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.4;
  word-break: keep-all;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
`;

const PageButton = styled.button<{ $isActive?: boolean }>`
  min-width: 36px;
  height: 36px;
  padding: 0 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => (props.$isActive ? "#007bff" : "#e2e8f0")};
  border-radius: 8px;
  background-color: ${(props) => (props.$isActive ? "#007bff" : "#ffffff")};
  color: ${(props) => (props.$isActive ? "#ffffff" : "#4a5568")};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: ${(props) => (props.$isActive ? "#0056b3" : "#edf2f7")};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #f7fafc;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 16px;
`;