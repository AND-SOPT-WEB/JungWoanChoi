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
    const response = await axios.get(
      `http://211.188.53.75:8080/user/${number}/hobby`,
      {
        headers: {
          token: localStorage.getItem("tokenData"),
        },
      }
    );
    setHobby(response.data.result.hobby);
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
  };

  return (
    <Wrapper>
      <Header>
        <h1>마이페이지</h1>
        <p
          onClick={() => {
            setMenu(1);
          }}
        >
          취미
        </p>
        <p
          onClick={() => {
            setMenu(2);
            // setMenu((prev) => prev + 1);
          }}
        >
          내 정보
        </p>
        <p
          onClick={() => {
            navigate("/");
          }}
        >
          로그아웃
        </p>
      </Header>

      {menu === 1 && (
        <UserInfoContainer>
          <div>
            <h3>내 취미</h3>
            <p>{`${myHobby}`}</p>
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
            <p>{`취미: ${hobby}`}</p>
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
          <button onClick={postUserUpdate}>수정하기</button>
        </MyInformationContainer>
      )}
    </Wrapper>
  );
};

export default Mypage;

const Header = styled.header`
  display: flex;
  gap: 1rem;
`;

const UserInfoContainer = styled.div`
  width: 40rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.color.lightgray1};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MyInformationContainer = styled.div`
  width: 40rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Wrapper = styled.div``;
