import axios, { AxiosError } from "axios";

interface joinType {
  username: string;
  password: string;
  hobby: string;
}

export const postJoin = async (prop: joinType) => {
  try {
    const res = await axios.post("http://211.188.53.75:8080/user", prop);
    return res;
  } catch (err) {
    if (err instanceof AxiosError) {
      const response = err.response;
      if (response) {
        return response.data.code;
      }
    }
    throw err;
  }
};

// axios
//   .get("http://211.188.53.75:8080/login")
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error("에러 발생:", error);
//   });
