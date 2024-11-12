import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  return (
    <>
      <Title>로그인</Title>
      <Form>
        <LoginInput></LoginInput>
        <PasswordInput></PasswordInput>
        <Link to="mypage">
          <LoginButton>로그인</LoginButton>
        </Link>
        <Link to="/signup-page">
          <SignUpButton>회원가입</SignUpButton>
        </Link>
      </Form>
    </>
  );
};

const Title = styled.h1``;
const Form = styled.form``;
const LoginInput = styled.input``;
const PasswordInput = styled.input``;
const LoginButton = styled.button`
  padding: 1rem;
`;
const SignUpButton = styled.button`
  padding: 1rem;
`;

export default LoginPage;
