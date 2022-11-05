import { fontWeight } from "styled-system";

const colors = {
  gray1: "#707070",
  gray2: "#C0C0C0",
  gray25: "#D0D0D0",
  gray3: "#E0E0E0",
  black: "black",
  white: "white",
};
const space = [0, 4, 8, 16, 32, 64, 128, 256, 512, 640];
export default {
  colors,
  space,
  styles: {
    global: {
      body: {
        backgroundColor: colors.gray3,
        fontFamily: "Arial, Helvetica, sans serif",
        "& a": {
          color: "inherit",
          textDecoration: "inherit",
          fontStyle: "inherit",
        },
      },
    },
    h1: {
      textAlign: "center",
      fontWeight: "normal",
    },
    h2: {
      color: colors.gray1,
      css: {
        fontWeight: "normal",
        textDecoration: "underline",
        fontSize: "1.2em",
      },
    },
    overlayActionButton: {
      color: colors.gray1,
      backgroundColor: colors.white,
      textDecoration: "none",
      paddingBottom: space[1],
      paddingTop: space[1],
      paddingLeft: space[2],
      paddingRight: space[2],
    },
    actionButton: {
      color: colors.gray1,
      backgroundColor: colors.gray3,
      textDecoration: "none",
      paddingBottom: space[1],
      paddingTop: space[1],
      paddingLeft: space[2],
      paddingRight: space[2],
    },
    navigation: {
      zIndex: 10,
      position: "sticky",
      top: "0",
      backgroundColor: colors.gray1,
      "& a.active": {
        fontWeight: "bold",
        color: "white",
      },
      "& a": {
        color: colors.gray2,
      },
    },
  },
};
