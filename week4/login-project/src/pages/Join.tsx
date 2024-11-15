import { useState } from "react"; // 중괄호 있으니까 export
// import react from "react"; // default로 export 한 거 ...? // useState 하나 쓰려고 리액트 다 import 하는 거는 비효율적이라 이렇게 잘 안함
// import { JoinSection, JoinTitle } from "./test";
import styled from "@emotion/styled";
import JoinUsername from "../components/JoinUsername";
import JoinPassword from "../components/JoinPassword";
import JoinHobby from "../components/JoinHobby";
import axios from "axios";

const Join = () => {
  const [username, setUsername] = useState("");
  // const username = ""; 이거와 비슷함 -> 리액트에서 state 라는 변수를 이용하는 느낌
  // username = "책상"; // 이런 식으로 바꾸었는데, 리액트에서는 set 함수를 사용해서 바꾸는 것 !
  // setUsername("책상") 이렇게 해야 함

  // const 이름바꾸는 함수 = () => {setUsername("바꾸고싶은값")}
  // onChange={이름바꾸는함수} 이런 식으로 불가능, 그냥 틀린 문법!
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hobby, setHobby] = useState("");
  const [step, setStep] = useState(1);

  const postUser = async () => {
    //url 확인 잘하기 ! -> 경로는 서버 노션 페이지에서 확인
    //네트워크에서 fetch/XHR -> Payload Preview 확인할 수 있음
    try {
      const response = await axios.post("http://211.188.53.75:8080/user", {
        username: username,
        password: password,
        hobby: hobby,
      });
      if (response.status === 200) {
        alert(`회원가입 성공, 회원님 아이디: ${response.data.result.no}`);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          alert("회원가입이 제대로 되지 않았습니다");
        } else {
          alert("알 수 없는 오류 발생");
        }
      }
    }
  };

  // const alertProps = () => {
  //   alert(`회원가입이 잘 되었어요 ~~ ${username} ${password} ${hobby}`);
  // }; --> JoinHobby 컴포넌트 안에다가 안하고 여기에서 처리할 수도 있음 !

  return (
    <JoinSection>
      <JoinTitle>회원가입</JoinTitle>

      {step === 1 && (
        <JoinUsername
          step={step}
          username={username}
          setUsername={setUsername}
          setStep={setStep}
        />
      )}
      {/* 앞에 초록색 step은 임의적으로 지정한 애고 뒤에 애가 실제로 prop으로 넘겨줄 애 */}
      {step === 2 && (
        <JoinPassword
          step={step}
          password={password}
          setPassword={setPassword}
          setStep={setStep}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />
      )}

      {step === 3 && (
        <JoinHobby
          step={step}
          hobby={hobby}
          setHobby={setHobby}
          setStep={setStep}
          // username={username}
          // password={password}
          postUser={postUser}
          // alertProps = {alertProps}
        />
      )}
    </JoinSection>
  );
};

export default Join;

const JoinSection = styled.section`
  width: 40rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.color.lightgray1};
  margin: 20rem auto;
`;
//scpt -> theme 관련 단축어 외우기 !!!

const JoinTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
`;

export const FormContainer = styled.section`
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
