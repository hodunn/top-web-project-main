import React from "react";
import styled from "styled-components";
import Topmenu from "./menu/TopMenu";
import Bottommenu from "./menu/BottomMenu";
import kr from "../../language/Kr-kr.json";

const Work: React.FC = () => {
  const workItems = [
    { 
      id: 1, 
      title: kr.work.item1.title, 
      image: "/assets/work_image/work1.jpg", 
      description: kr.work.item1.desc,
      link: "https://blog.naver.com/rlaskgus04/224135262112" 
    },
    { 
      id: 2, 
      title: kr.work.item2.title, 
      image: "/assets/work_image/work2.jpg", 
      description: kr.work.item2.desc, 
      link: "https://blog.naver.com/rlaskgus04/223942904938" 
    },
    { 
      id: 3, 
      title: kr.work.item3.title, 
      image: "/assets/work_image/work3.jpg", 
      description: kr.work.item3.desc, 
      link: "https://blog.naver.com/rlaskgus04/221587297558" 
    },
    { 
      id: 4, 
      title: kr.work.item4.title, 
      image: "/assets/work_image/work4.jpg", 
      description: kr.work.item4.desc, 
      link: "https://blog.naver.com/rlaskgus04/221753752665" 
    },
    { 
      id: 5, 
      title: kr.work.item5.title, 
      image: "/assets/work_image/work5.jpg", 
      description: kr.work.item5.desc, 
      link: "https://blog.naver.com/rlaskgus04/224177587321" 
    },
    { 
      id: 6, 
      title: kr.work.item6.title, 
      image: "/assets/work_image/work6.jpg", 
      description: kr.work.item6.desc, 
      link: "https://blog.naver.com/rlaskgus04/224014459323" 
    }
  ];

  // 클릭 이벤트 핸들러: 링크가 있을 경우 새 창으로 연결
  const handleCardClick = (url: string) => {
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <PageWrapper>
      <Topmenu />
      <MainContainer>
        <HeaderSection>
          <Title>{kr.work.mainTitle}</Title>
          <Subtitle>{kr.work.subTitle}</Subtitle>
        </HeaderSection>

        <GridSection>
          {workItems.map((item) => (
            <WorkCard key={item.id} onClick={() => handleCardClick(item.link)}>
              <CardTitleBox>
                <CardTitle>{item.title}</CardTitle>
              </CardTitleBox>
              
              <ImageWrapper>
                <WorkImage src={item.image} alt={item.title} />
              </ImageWrapper>
              
              <CardContent>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </WorkCard>
          ))}
        </GridSection>
      </MainContainer>
      <Bottommenu />
    </PageWrapper>
  );
};

export default Work;

/* --- 스타일 정의 --- */

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 80px 20px;
`;

const HeaderSection = styled.div`
  text-align: left;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: #1a1c1e;
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #3171c6;
  line-height: 1.5;
  margin: 0;
  text-align: justify;
  word-break: break-all;
  letter-spacing: -0.02em;
`;

const GridSection = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 650px) {
    grid-template-columns: 1fr;
    margin-top: 30px;
  }
`;

const WorkCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #eee;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px #bcd2e7;
  }
`;

const CardTitleBox = styled.div`
  padding: 20px 20px 17px 20px;
  background-color: #ffffff;
`;

const CardTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: #1a1c1e;
  margin: 0;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
`;

const WorkImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 17px 20px 22px 20px;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
  text-align: justify;
  text-justify: inter-character;
  word-break: break-all;
  text-align-last: left;
`;