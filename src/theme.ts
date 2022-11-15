export default {
  colors: {
    text: "hsl(0, 0%, 0%)",
    navbar: "hsl(230, 90%, 50%)",
    muted: "hsl(0, 0%, 35%)",
    bgDark: "hsl(230, 30%, 75%)",
    bgMid: "hsl(230, 30%, 80%)",
    bgLight: "hsl(230, 30%, 85%)",
    accent: "hsl(340, 50%, 85%)",
  },
  // grayscale
  // colors: {
  //   text: "black",
  //   navbar: "#666666", // 0.3984375
  //   muted: "#777777", // 0.46484375
  //   bgDark: "#bdbdbd", // 0.73828125
  //   bgMid: "#cecece", // 0.8046875
  //   bgLight: "#d9d9d9", // 0.84765625
  //   accent: "white",
  // },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512].map((x) => x * 1.5),
  sizes: [0, 32, 64, 96, 256, 384, 676].map((x) => x * 1.5),
  fontSizes: [12, 14, 16, 24, 32, 48, 64, 96, 128].map((x) => x * 1.5),
  radii: [0, 6, 12, 18].map((x) => x * 1.5),
};
