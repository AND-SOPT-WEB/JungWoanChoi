// tsrafce 단축어 사용하기
import React from "react";
import { FormContainer } from "../pages/Join"; // 이렇게 사용하지는 않음 주로 ..
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

type JoinUsernameProps = {
  step: number;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const JoinUsername = ({
  step,
  username,
  setUsername,
  setStep,
}: JoinUsernameProps) => {
  const handleClick = (
    setStep: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (username != "") {
      setStep((prev) => prev + 1);
    } else {
      alert("입력해주세요");
    }
  };

  const isButtonDisabled = username.length < 1 || username.length > 8;
  const navigate = useNavigate();

  return (
    <FormContainer>
      <h3>{`현재 step: ${step}`}</h3>
      <label htmlFor="username">사용자 이름</label>
      <input
        // ref -> document.querySelector("input") 이거와 비슷함!
        value={username} // 이렇게 반드시 지정해줘야 함 !
        type="text"
        id="username"
        placeholder="사용자 이름을 입력해주세요."
        onChange={(e) => {
          // console.log(e.target.value); // target이 변경된 객체 바로 그 놈 ..
          setUsername(e.target.value);
        }}
      />
      <button
        // onClick={() => {
        //   alert(username);
        // }}
        onClick={() => handleClick(setStep)}
        disabled={isButtonDisabled}
      >
        다음
      </button>
      <p>
        이미 회원이신가요?{" "}
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

export default JoinUsername;
