// tsrafce 단축어 사용하기
import React from "react";
import { FormContainer } from "../pages/Join"; // 이렇게 사용하지는 않음 주로 ..

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
        onClick={() => {
          setStep((prev) => prev + 1);
          // prev 앞이랑 뒤는 이름 똑같아야 함 !
        }}
      >
        다음
      </button>
    </FormContainer>
  );
};

export default JoinUsername;
