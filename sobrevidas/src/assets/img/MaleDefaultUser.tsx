import React from 'react';
import Svg, {Path, Circle, G} from 'react-native-svg';

const MaleDefaultUser = ({size = 24, color = '#0398AB'}) => {
  return (
    <Svg
      width={size}
      height={size}
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      clipRule="evenodd"
      viewBox="0 0 100 100">
      <Circle
        fill={color}
        cx="21.88"
        cy="35.725"
        r="51.761"
        transform="matrix(.96597 0 0 .96597 28.864 15.49)"
      />
      <G fill="#fff" fillRule="nonzero">
        <Path
          d="M299.287 255.5h-86.574c-85.147 0-154.418 69.272-154.418 154.418V512h395.41V409.918c0-85.146-69.271-154.418-154.418-154.418zM256 0c-65.843 0-119.409 53.567-119.409 119.41 0 65.842 53.566 119.409 119.409 119.409s119.409-53.567 119.409-119.41C375.409 53.567 321.843 0 256 0z"
          transform="matrix(.11996 0 0 .11996 50 50) translate(-256 -256)"
        />
      </G>
    </Svg>
  );
};

export default MaleDefaultUser;
