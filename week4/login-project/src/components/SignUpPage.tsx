import React, { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { postJoin } from "../api/ApiLogin";

const SignUpPage: React.FC = () => {
  const [formStep, setFormStep] = useState(1);
  const [username, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [hobby, setHobby] = useState("");
  const navigate = useNavigate();

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault(); // 기본 동작 방지

    if (formStep === 1 && !username) {
      alert("이름을 입력해주세요.");
      return;
    }
    if (formStep === 2 && !password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (formStep === 3 && !hobby) {
      alert("취미를 입력해주세요.");
      return;
    }

    setFormStep(formStep + 1);
  };
  const handleSubmit = async () => {
    const res = await postJoin({ username, password, hobby });
    console.log(res);
  };

  return (
    <>
      <Title>회원가입</Title>

      {formStep === 1 && (
        <Form>
          <Name>이름</Name>
          <NameInput
            required
            type="text"
            value={username}
            onChange={(e) => setuserName(e.target.value)}
            placeholder="이름을 입력해주세요"
          />
          <NextButton onClick={handleNext} type="submit">
            다음
          </NextButton>
          <LinkToLoginPage>이미 회원? 로그인</LinkToLoginPage>
        </Form>
      )}

      {formStep === 2 && (
        <Form>
          <Name>비밀번호</Name>
          <PasswordInput
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
          />
          <NextButton onClick={handleNext} type="submit">
            다음
          </NextButton>
          <LinkToLoginPage>이미 회원? 로그인</LinkToLoginPage>
        </Form>
      )}

      {formStep === 3 && (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <Name>취미</Name>
          <HobbyInput
            required
            type="text"
            value={hobby}
            onChange={(e) => setHobby(e.target.value)}
            placeholder="취미를 입력해주세요"
          />
          <NextButton onClick={handleSubmit} type="submit">
            회원가입
          </NextButton>
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
