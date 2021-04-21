import {StyleSheet} from 'react-native';

export default (elevation: number) =>
  StyleSheet.create({
    shadow: {
      elevation,
      shadowColor: '#000',
      shadowRadius: elevation,
      shadowOffset: {
        height: elevation / 2,
        width: 0,
      },
      shadowOpacity: 0.1,
    },
  });

export const buildStyledShadow = (elevation: number) => `
  elevation: ${elevation};\n
  shadow-color: #000;\n
  shadow-radius: ${elevation}px;\n
  shadow-offset: {\n
    height: ${elevation / 2}px\n
  };\n
  shadow-opacity: 0.1;\n
`;
