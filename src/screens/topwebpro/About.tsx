import React from "react";
import styled from "styled-components";
import Topmenu from "./menu/TopMenu";
import Bottommenu from "./menu/BottomMenu"; 
import kr from "../../language/Kr-kr.json";

const About: React.FC = () => {
  // clean(id: 3)을 제외한 3개의 데이터
  const imageCards = [
    { id: 1, src: process.env.PUBLIC_URL + "/assets/about_image/diag.jpg", title: kr.about.card1 },
    { id: 2, src: process.env.PUBLIC_URL + "/assets/about_image/work.jpg", title: kr.about.card2 },
    { id: 4, src: process.env.PUBLIC_URL + "/assets/about_image/care.jpg", title: kr.about.card4 },
  ];

  return (
    <PageWrapper>
      <Topmenu />
      
      <MainContainer>
        <IntroSection>
          <IntroTitle>
            <div>
              주식회사 <HighlightText>탑</HighlightText>을 소개합니다
            </div>
            <IntroSubHeader>난방설비 엔지니어링</IntroSubHeader>
          </IntroTitle>
          <IntroText>{kr.about.introMain}</IntroText>
          <SubIntroText>{kr.about.introSub}</SubIntroText>
        </IntroSection>

        {/* 카드 섹션 */}
        <ImageGridContainer>
          <ImageGridSection>
            {imageCards.map((card) => (
              <ImageCard key={card.id}>
                <CardImage src={card.src} alt={card.title} />
                <CardOverlay>
                  <CardTitle>{card.title}</CardTitle>
                </CardOverlay>
              </ImageCard>
            ))}
          </ImageGridSection>
        </ImageGridContainer>
      </MainContainer>

      <Bottommenu />
    </PageWrapper>
  );
};

export default About;

/* --- 스타일 정의 --- */

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`;

const MainContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 80px 20px;
`;

const IntroSection = styled.section`
  text-align: center;
  margin-bottom: 60px;
`;

const IntroTitle = styled.h2`
  font-size: 36px;
  font-weight: 800;
  color: #111;
  margin-bottom: 30px;
  line-height: 1.4;
`;

const HighlightText = styled.span` color: #3171c6; `;
const IntroSubHeader = styled.div`
  font-size: 14px;
  color: #3171c6;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 10px;
`;

const IntroText = styled.p`
  font-size: 17px;
  line-height: 1.8;
  color: #333;
  margin-bottom: 30px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

const SubIntroText = styled.p`
  font-size: 15px;
  line-height: 1.8;
  color: #555;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
`;

/* 카드 크기 조절을 위한 컨테이너 추가 */
const ImageGridContainer = styled.div`
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  width: 100%;
`;

const ImageGridSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  /* 전체 너비를 약 80%(4/5) 수준으로 제한하여 카드가 너무 커지지 않게 조절 */
  width: 100%;
  max-width: 960px; 

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 700px;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    max-width: 320px;
  }
`;

const ImageCard = styled.div`
  position: relative;
  /* 비율을 유지하면서 컨테이너 너비에 맞춰 크기 결정 */
  aspect-ratio: 4 / 5; 
  background-color: #f8f9fa;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  cursor: default;
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
  height: 50%;
  background: linear-gradient(to top, #ffffff 0%, transparent 100%);
  display: flex;
  align-items: flex-end;
  padding: 20px;
`;

const CardTitle = styled.h3`
  color: #2d2d2d;
  font-size: 17px;
  font-weight: 700;
  margin: 0;
`;