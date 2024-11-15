// tsrafce 단축어 사용하기
import React from "react";
import { FormContainer } from "../pages/Join";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

type JoinPasswordProps = {
  step: number;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
};

const JoinPassword = ({
  step,
  password,
  setPassword,
  setStep,
  confirmPassword,
  setConfirmPassword,
}: JoinPasswordProps) => {
  const isButtonDisabled =
    password.length < 1 ||
    password.length > 8 ||
    confirmPassword !== password ||
    confirmPassword.length < 1 ||
    confirmPassword.length > 8;

  const navigate = useNavigate();

  return (
    <FormContainer>
      <h3>{`현재 step: ${step}`}</h3>
      <label htmlFor="password">비밀번호</label>
      <input
        value={password}
        type="password"
        id="password"
        placeholder="비밀번호를 입력해주세요."
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <label htmlFor="confirmPassword">비밀번호 확인</label>
      <input
        type="password"
        value={confirmPassword}
        id="confirmPassword"
        placeholder="비밀번호 다시 입력해주세요"
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
      />
      <button
        onClick={() => {
          setStep(1);
        }}
      >
        이전
      </button>
      <button
        onClick={() => {
          setStep(3);
        }}
        disabled={isButtonDisabled}
      >
        다음
      </button>
      <p>
        이미 회원이신가요?
        <LoginLink
          onClick={() => {
            {
              navigate("/");
            }
          }}
        >
          로그인
        </LoginLink>
      </p>
    </FormContainer>
  );
};

const LoginLink = styled.span`
  color: ${({ theme }) => theme.color.primary03};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.primary04};
  }
`;

export default JoinPassword;
