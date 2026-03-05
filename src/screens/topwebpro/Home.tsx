import React from "react";
import styled from "styled-components";
import Topmenu from "./menu/TopMenu";
import kr from "../../language/Kr-kr.json";
import Bottommenu from "./menu/BottomMenu";

const Home: React.FC = () => {
  return (
    <HomeWrapper>
      <Topmenu />
      
      <HeroSection>
        <MainLogo 
          src={process.env.PUBLIC_URL + "/assets/logo_image/logo2.png"} 
          alt="Logo"
          onError={(e) => (e.currentTarget.style.display = 'none')} 
        />
        
        <HeroContent>
          <MainTitle>
            {kr.home.heroTitle.split('\n').map((line, i) => (
              <React.Fragment key={i}>{line}<br/></React.Fragment>
            ))}
          </MainTitle>
          <SubTitleText>{kr.home.subhighlightText}</SubTitleText>
        </HeroContent>
      </HeroSection>

      <Bottommenu/>
    </HomeWrapper>
  );
};

export default Home;

const HomeWrapper = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const HeroSection = styled.section`
  width: 90%;
  max-width: 1200px;
  height: 650px;
  margin: 110px auto 50px; /* TopMenu의 기준이 되는 여백 */
  position: relative;
  /* 중요: 메뉴바가 이미지 위로 겹쳐야 하므로 hidden을 해제합니다 */
  overflow: visible; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1; /* 메뉴바(2000)보다 아래에 배치 */

  /* 배경 이미지의 라운드 처리는 별도의 가상 요소에 부여합니다 */
  &::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: url("/assets/home_image/mainimage4.jpg") no-repeat center center;
    background-size: cover;
    filter: brightness(0.6);
    z-index: -1;
    border-radius: 40px; /* 이미지의 둥근 모서리 적용 */
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }
`;

const MainLogo = styled.img`
  width: 100px;
  margin-bottom: 20px;
  filter: brightness(0) invert(1); 
`;

const HeroContent = styled.div`
  color: white;
`;

const MainTitle = styled.h1`
  font-size: 38px;
  font-weight: 800;
  line-height: 1.4;
  letter-spacing: -1px;
`;

const SubTitleText = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin-top: 15px;
`;