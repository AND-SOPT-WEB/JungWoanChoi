import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
  const [number, setNumber] = useState("");
  const [hobby, setHobby] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newHobby, setNewHobby] = useState("");
  const [myHobby, setMyHobby] = useState("");
  const [menu, setMenu] = useState(1);
  const navigate = useNavigate();

  const searchHobby = async () => {
    try {
      const response = await axios.get(
        `http://211.188.53.75:8080/user/${number}/hobby`,
        {
          headers: {
            token: localStorage.getItem("tokenData"),
          },
        }
      );
      setHobby(response.data.result.hobby);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert("알 수 없는 오류가 떴습니다");
      }
    }
    // console.log(response);
  };

  const searcMyHobby = async () => {
    const response = await axios.get(
      `http://211.188.53.75:8080/user/my-hobby`,
      {
        headers: {
          token: localStorage.getItem("tokenData"),
        },
      }
    );
    setMyHobby(response.data.result.hobby);
  };

  useEffect(() => {
    searcMyHobby();
  }, []);

  const postUserUpdate = async () => {
    try {
      const response = await axios.put(
        "http://211.188.53.75:8080/user",
        {
          password: newPassword,
          hobby: newHobby,
        },
        {
          headers: {
            token: localStorage.getItem("tokenData"),
          },
        }
      );
      console.log(response);
      setNewHobby("");
      setNewPassword("");
      alert("정보가 성공적으로 수정되었어요");
      searcMyHobby();
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          alert(`에러: ${error.response.status}`);
        } else {
          alert("알 수 없는 오류 발생");
        }
      }
    }
  };

  const isButtonDisabled =
    newHobby.length < 1 ||
    newHobby.length > 8 ||
    newPassword.length < 1 ||
    newHobby.length > 8;

  return (
    <Wrapper>
      <Header>
        <StyledMenuButton isActive={menu === 0}>마이페이지</StyledMenuButton>
        <StyledMenuButton isActive={menu === 1} onClick={() => setMenu(1)}>
          취미
        </StyledMenuButton>
        <StyledMenuButton isActive={menu === 2} onClick={() => setMenu(2)}>
          내 정보
        </StyledMenuButton>
        <StyledMenuButton onClick={() => navigate("/")}>
          로그아웃
        </StyledMenuButton>
      </Header>

      {menu === 1 && (
        <UserInfoContainer>
          <div>
            <h3>내 취미</h3>
            <p>{`-> ${myHobby}`}</p>
          </div>
          <input
            type="text"
            placeholder="사용자 번호를 입력해주세요."
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />
          <button onClick={searchHobby}>찾기</button>
          <div>
            <h3>사용자 취미</h3>
            <p>{`-> ${hobby}`}</p>
          </div>
        </UserInfoContainer>
      )}

      {menu === 2 && (
        <MyInformationContainer>
          <h2>내 정보 수정하기</h2>
          <label htmlFor="newPassword">새 비밀번호</label>
          <input
            value={newPassword}
            type="text"
            id="newPassword"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <label htmlFor="newHobby">새 취미</label>
          <input
            value={newHobby}
            type="text"
            id="newHobby"
            onChange={(e) => {
              setNewHobby(e.target.value);
            }}
          />
          <button onClick={postUserUpdate} disabled={isButtonDisabled}>
            수정하기
          </button>
        </MyInformationContainer>
      )}
    </Wrapper>
  );
};

export default Mypage;

const Header = styled.header`
  width: 40rem;
  display: flex;
  gap: 1rem;
  margin: 20rem auto 0;
  background-color: ${({ theme }) => theme.color.midgray2};
  font-size: 1.5rem;
`;

const StyledMenuButton = styled.p<{ isActive?: boolean }>`
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.color.primary01 : "transparent"};
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};

  &:hover {
    background-color: ${({ theme }) => theme.color.lightgray2};
  }

  &:last-child {
    margin-left: auto;
  }
`;

const UserInfoContainer = styled.div`
  width: 40rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.color.lightgray1};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
  font-size: 1.5rem;
`;

const MyInformationContainer = styled.div`
  font-size: 1.5rem;
  width: 40rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.color.lightgray1};
`;

const Wrapper = styled.div``;
