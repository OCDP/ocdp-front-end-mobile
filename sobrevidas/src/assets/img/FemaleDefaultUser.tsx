import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

const FemaleDefaultUser = ({size = 24, color = '#0398AB'}) => {
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
      <Path
        fill="#fff"
        fillRule="nonzero"
        d="M386.848 323.52l-70.016-14.048c-7.424-1.504-12.832-8.096-12.832-15.68V275.52c69.92-6.656 80-20.96 80-35.52 0-43.04-28.608-142.976-33.344-159.232-.576-25.12-5.184-39.264-16.672-51.616-8.128-8.8-20.064-10.848-29.696-12.48-3.776-.672-8.992-1.536-10.912-2.592C276.32 4.832 259.456.384 239.328 0c-42.144 1.728-93.952 28.544-111.68 77.568C126.368 82.144 96 190.368 96 240c0 20.704 23.424 31.616 80 36.608v17.184c0 7.584-5.408 14.176-12.864 15.68l-69.92 14.016C48.48 332.288 16 371.872 16 417.6V448c0 17.632 14.368 32 32 32h384c17.632 0 32-14.368 32-32v-30.4c0-45.728-32.48-85.312-77.152-94.08z"
        transform="matrix(.13705 0 0 .13705 17.107 17.107)"
      />
    </Svg>
  );
};

export default FemaleDefaultUser;
