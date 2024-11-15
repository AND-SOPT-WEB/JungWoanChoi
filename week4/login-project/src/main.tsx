import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Global, ThemeProvider } from "@emotion/react";
// emotion 라이브러리에서 가져옴
import GlobalStyle from "./styles/global.ts"; // 내가 만든 파일
import theme from "./styles/theme.ts";
// themeprovider
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Global styles={GlobalStyle} />
      <App />
    </ThemeProvider>
  </StrictMode>
);

//가장 최상단 파일 -> app 컴포넌트를 부름
// 글로벌 스타일을 지정하고
// app에다가 해도 됨 전체적으로 감쌀 때 사용
// 글로벌 스타일 -> 전반적으로 적용하는 스타일
// 글로벌 스타일 문법 => emotion 라이브러리가 보여줌

// theme={theme} => {} 안에 들어있는게 themeprovide가 제공하는 객체
// provider 안에 있는 애들이 다 theme에 접근할 수 있게 됨
