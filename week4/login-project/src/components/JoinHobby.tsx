// tsrafce 단축어 사용하기
import React from "react";
import { FormContainer } from "../pages/Join";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

type JoinHobbyProps = {
  step: number;
  hobby: string;
  setHobby: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  //   username: string;
  //   password: string;
  postUser: () => void;
};

const JoinHobby = ({
  step,
  hobby,
  setHobby,
  //   username,
  //   password,
  postUser,
}: JoinHobbyProps) => {
  const navigate = useNavigate();
  const isButtonDisabled = hobby.length < 1 || hobby.length > 8;
  return (
    <FormContainer>
      <h3>{`현재 step: ${step}`}</h3>
      <label htmlFor="hobby">취미</label>
      <input
        type="text"
        id="hobby"
        placeholder="취미를 입력해주세요."
        value={hobby}
        onChange={(e) => {
          setHobby(e.target.value);
          //여기가 부모 컴포넌트에서 state 사용하는 곳
        }}
      />
      <button
        onClick={() => {
          postUser();
          navigate("/");
        }}
        disabled={isButtonDisabled}
      >
        회원가입
      </button>
      {/* //여기를 눌렀을 때만 network에 변화가 있는 것! */}
      <p>
        이미 회원이신가요?{" "}
        <LoginLink
          onClick={() => {
            navigate("/");
          }}
        >
          로그인
        </LoginLink>
      </p>
    </FormContainer>
  );
};

// step은 여기에서만 사용하는 state가 아니기 때문에 부모 컴포넌트에서 관리해야 함!
// setHobby는 여기서 사용해도 됨

export default JoinHobby;

const LoginLink = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.color.primary03};
  &:hover {
    color: ${({ theme }) => theme.color.primary04};
  }
`;
