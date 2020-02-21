import { StyleSheet } from "react-native";

export default (elevation: number) =>
  StyleSheet.create({
    shadow: {
      elevation,
      shadowColor: "#000",
      shadowRadius: elevation,
      shadowOffset: {
        height: elevation / 2,
        width: 0
      },
      shadowOpacity: 0.1
    }
  });

export const buildStyledShadow = (elevation: number) => `
  elevation: ${elevation};
  shadow-color: #000;
  shadow-radius: ${elevation}px;
  shadow-offset: {
    height: ${elevation / 2}px
  };
  shadow-opacity: 0.1;
`
