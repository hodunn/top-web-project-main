import React from "react";
import styled from "styled-components";
import Topmenu from "./menu/TopMenu";
import Bottommenu from "./menu/BottomMenu"; 
import kr from "../../language/Kr-kr.json";

// 컴포넌트 이름을 소문자 contact에서 대문자 Contact로 변경
const Contact: React.FC = () => {
  return (
    <PageWrapper>
      <Topmenu />
      <MainContainer>
        <h1>Contact Page</h1>
        {/* 내용을 여기에 추가하세요 */}
      </MainContainer>
      <Bottommenu />
    </PageWrapper>
  );
};

export default Contact;

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContainer = styled.main`
  flex: 1;
  padding-top: 100px;
  max-width: 1200px;
  margin: 0 auto;
`;