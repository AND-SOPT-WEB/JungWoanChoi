import styled from "@emotion/styled";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const postLogin = async () => {
    try {
      const response = await axios.post("http://211.188.53.75:8080/login", {
        username: username,
        password: password,
      });
      if (response.status === 200) {
        localStorage.setItem("tokenData", response.data.result.token);
        alert("로그인 성공");
        navigate("/hobby");
      }
      // console.log(response.data.result.token);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          alert("로그인이 실패되었습니다. 다시 확인해주세요");
        } else {
          alert("알 수 없는 오류가 발생했습니다.");
        }
      }
    }
  };

  return (
    <LoginSection>
      <LoginTitle>로그인</LoginTitle>
      <FormContainer>
        <label htmlFor="username">사용자 이름</label>
        <input
          type="text"
          id="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <StyledButton onClick={postLogin}>로그인</StyledButton>
        {/* 함수 이름을 직접 전달하는 방식 -> postLogin() 이렇게 쓰면 렌더링 시점에서 바로 호출됨 */}
        <StyledButton
          onClick={() => {
            navigate("/join");
          }}
        >
          회원가입
        </StyledButton>
      </FormContainer>
    </LoginSection>
  );
};

export default Login;

const LoginSection = styled.section`
  width: 40rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.color.lightgray1};
  margin: 20rem auto;
`;

const LoginTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledButton = styled.button`
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.primary04};
  color: ${({ theme }) => theme.color.white};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.2rem;

  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.color.primary03};
  }
`;
