import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const MyPage: React.FC = () => {
  return (
    <>
      <Header>
        <Title>마이페이지</Title>
        <Nav>
          <HobbyMenu>취미</HobbyMenu>
          <MyInfoMenu>내 정보</MyInfoMenu>
          <Link to="/">
            <Logout>로그아웃</Logout>
          </Link>
        </Nav>
      </Header>

      {/* 취미 / 내 정보 컴포넌트 각각 만들기 (한 페이지 안에서 구현하기) */}
    </>
  );
};

const Header = styled.header``;
const Title = styled.h1``;
const Nav = styled.nav``;
const HobbyMenu = styled.p``;
const MyInfoMenu = styled.p``;
const Logout = styled.p``;

export default MyPage;
