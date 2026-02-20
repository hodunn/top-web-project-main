import React, { useState, useRef } from "react"; // useRef 추가
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import kr from "../../../language/Kr-kr.json";
import Topmenu from "./TopMenu";

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null); // 파일 인풋 제어용

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState(kr.catalog.categories[1]);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image || !name || !price) {
      alert("이미지, 제품명, 가격은 필수 항목입니다.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("link", link);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("제품이 등록되었습니다.");
        // [수정됨] 등록 후 관리자 리스트로 이동
        navigate("/ProductAdminList"); 
      } else {
        const errorData = await response.json();
        alert(`등록 실패: ${errorData.error || "서버 오류"}`);
      }
    } catch (error) {
      console.error("Upload Error:", error);
      alert("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <PageWrapper>
      <Topmenu />
      <ContentContainer>
        <PageHeader>
          <h1>{kr.addProduct.title}</h1>
          <p>{kr.addProduct.subtitle}</p>
        </PageHeader>

        <FormCard as="form" onSubmit={handleSubmit}>
          <FormGroup>
            <Label>카테고리</Label>
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
              {kr.catalog.categories.slice(1).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>{kr.addProduct.imgLabel}</Label>
            <UploadBox>
              {preview ? (
                <PreviewImage src={preview} alt="Preview" />
              ) : (
                <>
                  <UploadTitle>{kr.addProduct.imgUploadTitle}</UploadTitle>
                  <UploadDesc>{kr.addProduct.imgUploadDesc}</UploadDesc>
                </>
              )}
              <input 
                type="file" 
                ref={fileInputRef}
                hidden 
                accept="image/*"
                onChange={handleImageChange}
              />
              <FileButton type="button" onClick={() => fileInputRef.current?.click()}>
                {kr.addProduct.imgBtn}
              </FileButton>
            </UploadBox>
          </FormGroup>

          <FormGroup>
            <Label>{kr.addProduct.nameLabel}</Label>
            <Input 
              type="text" 
              placeholder={kr.addProduct.namePlaceholder} 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>

          <Row>
            <InputCol>
              <Label>{kr.addProduct.priceLabel}</Label>
              <PriceInputWrapper>
                <CurrencySymbol>₩</CurrencySymbol>
                <Input 
                  type="number" 
                  placeholder="0" 
                  style={{ paddingLeft: "35px" }} 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </PriceInputWrapper>
            </InputCol>
            <InputCol>
              <Label>{kr.addProduct.stockLabel}</Label>
              <Input 
                type="text" 
                placeholder={kr.addProduct.stockPlaceholder}
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </InputCol>
          </Row>

          <FormGroup>
            <LabelWrapper>
              <Label>{kr.addProduct.descLabel}</Label>
              <CharCount>{description.length} / 2000자</CharCount>
            </LabelWrapper>
            <TextArea
              placeholder={kr.addProduct.descPlaceholder}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>{kr.addProduct.linkLabel}</Label>
            <LinkInputWrapper>
              <LinkIcon>🔗</LinkIcon>
              <Input 
                type="text" 
                placeholder="https://example.com/product" 
                style={{ paddingLeft: "40px" }}
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </LinkInputWrapper>
          </FormGroup>

          <ActionButtons>
            <CancelButton type="button" onClick={() => navigate(-1)}>{kr.addProduct.cancelBtn}</CancelButton>
            <SubmitButton type="submit">{kr.addProduct.submitBtn}</SubmitButton>
          </ActionButtons>
        </FormCard>
      </ContentContainer>
    </PageWrapper>
  );
};

export default AddProduct;

/* 스타일 컴포넌트는 기존과 동일 (ime-mode: active 포함됨) */
const PageWrapper = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
  padding-top: 70px;
  padding-bottom: 50px;
  width: 100%;
`;
const ContentContainer = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 20px;
  box-sizing: border-box;
  @media (max-width: 480px) {
    padding: 20px 15px;
  }
`;
const PageHeader = styled.div`
  margin-bottom: 30px;
  h1 {
    font-size: 28px;
    font-weight: 800;
    color: #1a1a1a;
    margin-bottom: 10px;
  }
  p {
    color: #007bff;
    font-size: 14px;
  }
`;
const FormCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  border: 1px solid #edf2f7;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
  width: 100%;
  box-sizing: border-box;
`;
const FormGroup = styled.div`
  margin-bottom: 25px;
  width: 100%;
`;
const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;
const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CharCount = styled.span`
  font-size: 12px;
  color: #a0aec0;
`;
const UploadBox = styled.div`
  border: 1px dashed #cbd5e0;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  background-color: #ffffff;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
  margin-bottom: 15px;
  border-radius: 4px;
`;
const UploadTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 5px;
`;
const UploadDesc = styled.div`
  font-size: 13px;
  color: #718096;
  margin-bottom: 20px;
`;
const FileButton = styled.button`
  padding: 8px 20px;
  background-color: #edf2f7;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
  cursor: pointer;
  &:hover { background-color: #e2e8f0; }
`;
const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f7fafc;
  box-sizing: border-box;
  ime-mode: active;
  &::placeholder { color: #a0aec0; }
  &:focus { outline: none; border-color: #007bff; background-color: #fff; }
`;
const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f7fafc;
  &:focus { outline: none; border-color: #007bff; background-color: #fff; }
`;
const Row = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
  flex-wrap: wrap;
`;
const InputCol = styled.div`
  flex: 1;
  min-width: 200px;
`;
const PriceInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;
const CurrencySymbol = styled.span`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #4a5568;
  font-weight: 600;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f7fafc;
  resize: vertical;
  box-sizing: border-box;
  ime-mode: active;
  &::placeholder { color: #a0aec0; }
  &:focus { outline: none; border-color: #007bff; background-color: #fff; }
`;
const LinkInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;
const LinkIcon = styled.span`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
`;
const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 40px;
`;
const CancelButton = styled.button`
  padding: 12px 30px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
  cursor: pointer;
  &:hover { background: #f7fafc; }
`;
const SubmitButton = styled.button`
  padding: 12px 30px;
  background: #333d42;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  &:hover { background: #171b1d; }
`;