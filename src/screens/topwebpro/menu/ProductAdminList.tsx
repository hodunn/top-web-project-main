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

const ProductAdminList: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(kr.catalog.categories[0]);
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

  const filteredProducts = activeFilter === kr.catalog.categories[0]
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

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm("정말 삭제하시겠습니까? 복구할 수 없습니다.")) {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert("삭제되었습니다.");
          fetchProducts();
        } else {
          alert("삭제 실패");
        }
      } catch (error) {
        console.error(error);
      }
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
          <div>
            <Title>관리자 페이지</Title>
            <Subtitle>제품 등록 및 삭제 관리</Subtitle>
          </div>
          <UploadButton onClick={() => navigate("/AddProduct")}>
            + {kr.addProduct.submitBtn.replace("하기", "하기")}
          </UploadButton>
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
              <ProductCard key={product.id}>
                <ImageWrapper>
                  <ProductImage 
                    src={product.image} 
                    alt={product.name} 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />
                  <DeleteButton onClick={(e) => handleDelete(e, product.id)}>×</DeleteButton>
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

export default ProductAdminList;

const PageWrapper = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 60px;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 60px 20px;
  box-sizing: border-box;
  flex: 1;
`;

const HeaderSection = styled.div`
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #5d6d7e;
`;

const UploadButton = styled.button`
  padding: 12px 24px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #218838;
  }
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
  border: 1px solid transparent;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  position: relative;
  &:hover {
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

const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(220, 53, 69, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 10;

  &:hover {
    background: rgb(220, 53, 69);
    transform: scale(1.1);
  }
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