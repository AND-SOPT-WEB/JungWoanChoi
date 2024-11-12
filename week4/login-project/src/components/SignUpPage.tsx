import React, { useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const SignUpPage: React.FC = () => {
  const [formStep, setFormStep] = useState(1);

  const handleNext = () => {
    setFormStep(formStep + 1);
  };

  return (
    <>
      <Title>회원가입</Title>

      {formStep === 1 && (
        <Form>
          <Name>이름</Name>
          <NameInput></NameInput>
          <NextButton onClick={handleNext}>다음</NextButton>
          <LinkToLoginPage>이미 회원? 로그인</LinkToLoginPage>
        </Form>
      )}

      {formStep === 2 && (
        <Form>
          <Name>비밀번호</Name>
          <PasswordInput></PasswordInput>
          <NextButton onClick={handleNext}>다음</NextButton>
          <LinkToLoginPage>이미 회원? 로그인</LinkToLoginPage>
        </Form>
      )}

      {formStep === 3 && (
        <Form>
          <Name>취미</Name>
          <HobbyInput></HobbyInput>
          <Link to="/">
            <NextButton onClick={handleNext}>회원가입</NextButton>
          </Link>
          <LinkToLoginPage>이미 회원? 로그인</LinkToLoginPage>
        </Form>
      )}
    </>
  );
};

const Title = styled.h1``;
const Form = styled.form``;
const NameInput = styled.input``;
const PasswordInput = styled.input``;
const HobbyInput = styled.input``;

const Name = styled.h1``;
const NextButton = styled.button``;
const LinkToLoginPage = styled.a``;

export default SignUpPage;
