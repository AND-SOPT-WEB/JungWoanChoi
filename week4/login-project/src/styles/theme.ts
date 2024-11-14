// 프로젝트 전반에서 많이 쓰이는 스타일 속성들
// 전역 상태로 사용되는 느낌
const theme = {
  color: {
    primary01: "#E9EED9",
    primary02: "#CBD2A4",
    primary03: "#9A7E6F",
    primary04: "#54473F",

    white: "#FFFFFF",
    black: "#000000",
    red: "#ff2c2c",
    lightgray1: "#DFE2E7",
    lightgray2: "#D9D9D9",
    lightgray3: "#C4C4C4",
    lightgray4: "#B6B6B6",
    midgray1: "#9FA4AE",
    midgray2: "#F1F1F1",
    midgray3: "#6B6F77",
    darkgray: "#3E3F45",
  },
};

export type ColorType = typeof theme.color;

export default theme;
