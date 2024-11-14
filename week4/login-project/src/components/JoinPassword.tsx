// tsrafce 단축어 사용하기
import React from "react";
import { FormContainer } from "../pages/Join";

type JoinPasswordProps = {
  step: number;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const JoinPassword = ({
  step,
  password,
  setPassword,
  setStep,
}: JoinPasswordProps) => {
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
      <button>이전</button>
      <button
        onClick={() => {
          setStep(3);
        }}
      >
        다음
      </button>
    </FormContainer>
  );
};

export default JoinPassword;
