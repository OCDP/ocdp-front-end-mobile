import React from 'react';
import Svg, {Path} from 'react-native-svg';

const Check = ({size = 100}) => {
  return (
    <Svg x="0" y="0" width={size} height={size} viewBox="0 0 367.805 367.805">
      <Path
        fill="#3BB54A"
        d="M183.903.001c101.566 0 183.902 82.336 183.902 183.902s-82.336 183.902-183.902 183.902S.001 285.469.001 183.903C-.288 82.625 81.579.29 182.856.001h1.047z"
      />
      <Path
        fill="#D4E1F4"
        d="M285.78 133.225L155.168 263.837 82.025 191.217 111.805 161.96 155.168 204.801 256.001 103.968z"
      />
    </Svg>
  );
};

export default Check;
