import React from "react";
import styled from "styled-components";
import Topmenu from "./menu/TopMenu";
import Bottommenu from "./menu/BottomMenu"; 
import kr from "../../language/Kr-kr.json"; // 언어 파일 불러오기

const About: React.FC = () => {
  // 상단 4개의 이미지 카드 데이터
  const imageCards = [
    { id: 1, src: process.env.PUBLIC_URL + "/assets/about_image/diag.jpg", title: kr.about.card1 },
    { id: 2, src: process.env.PUBLIC_URL + "/assets/about_image/work.jpg", title: kr.about.card2 },
    { id: 3, src: process.env.PUBLIC_URL + "/assets/about_image/clean.jpg", title: kr.about.card3 },
    { id: 4, src: process.env.PUBLIC_URL + "/assets/about_image/care.jpg", title: kr.about.card4 },
  ];

  return (
    <PageWrapper>
      <Topmenu />
      
      <MainContainer>
        {/* 1. 회사 소개 텍스트 섹션 */}
        <IntroSection>
          <IntroTitle>
            <div>
              주식회사 <HighlightText>탑</HighlightText>을 소개합니다
            </div>
            <IntroSubHeader>난방설비 엔지니어링</IntroSubHeader>
          </IntroTitle>
          <IntroText>
            {kr.about.introMain}
          </IntroText>
          <SubIntroText>
            {kr.about.introSub}
          </SubIntroText>
        </IntroSection>

        {/* 2. 이미지 그리드 섹션 */}
        <ImageGridSection>
          {imageCards.map((card) => (
            <ImageCard key={card.id}>
              {card.src ? (
                <CardImage src={card.src} alt={card.title} />
              ) : (
                <ImagePlaceholder>{card.title}</ImagePlaceholder>
              )}
              <CardOverlay>
                <CardTitle>{card.title}</CardTitle>
              </CardOverlay>
            </ImageCard>
          ))}
        </ImageGridSection>
      </MainContainer>

      <Bottommenu />
    </PageWrapper>
  );
};

export default About;

/* --- 스타일 정의 --- */

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #fdfefe;
  display: flex;
  flex-direction: column;
`;

const MainContainer = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1200px; 
  margin: 0 auto;
  padding: 120px 40px 100px 40px; 
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const IntroSection = styled.section`
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
`;

const IntroTitle = styled.h2`
  font-size: 48px;
  font-weight: 850;
  color: #2d2d2d;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

// "탑" 글자 전용 스타일 컴포넌트 생성 (우선순위 문제 해결)
const HighlightText = styled.span`
  color: #3171c6 !important;
  font-weight: 900;
  display: inline-block;
`;

const IntroSubHeader = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #666;
  margin-top: 5px;
  margin-bottom: 30px;
`;

const IntroText = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  word-break: keep-all;
  margin-bottom: 30px;
  font-weight: 500;
  text-align: justify;
  text-justify: inter-character;
  text-align-last: center;
`;

const SubIntroText = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #555;
  word-break: keep-all;
  max-width: 900px;
  margin: 0 auto;
  text-align: justify;
  text-justify: inter-character;
  text-align-last: center;
`;

const ImageGridSection = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ImageCard = styled.div`
  position: relative;
  aspect-ratio: 3 / 4;
  background-color: #f8f9fa;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(transparent, #f4f3f1);
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const CardTitle = styled.span`
  color: #2d2d2d;
  font-size: 16px;
  font-weight: 700;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #adb5bd;
  font-weight: 600;
  background: #f1f3f5;
`;