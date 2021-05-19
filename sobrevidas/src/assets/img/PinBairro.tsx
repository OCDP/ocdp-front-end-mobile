import React from 'react';
import Svg, {Path} from 'react-native-svg';

const Logo = ({size = 24}) => {
  return (
    <Svg x="0" y="0" width={size} height={size} viewBox="0 0 512 512">
      <Path
        fill="#0398AB"
        d="M256 110.062c-52.412 0-95.053 42.641-95.053 95.053s42.641 95.053 95.053 95.053 95.053-42.641 95.053-95.053-42.64-95.053-95.053-95.053zm0 150.084c-30.344 0-55.031-24.687-55.031-55.031s24.687-55.031 55.031-55.031 55.031 24.687 55.031 55.031-24.687 55.031-55.031 55.031z"
      />
      <Path
        fill="#0398AB"
        d="M256 0C142.899 0 50.885 92.015 50.885 205.115v5.67c0 57.2 32.794 123.856 97.474 198.113 46.888 53.832 93.121 91.368 95.065 92.94L256 512l12.576-10.161c1.945-1.572 48.178-39.108 95.065-92.94 64.679-74.258 97.474-140.913 97.474-198.113v-5.67C461.115 92.015 369.101 0 256 0zm165.093 210.786c0 96.665-124.551 213.68-165.093 249.202-40.553-35.533-165.093-152.544-165.093-249.202v-5.67c0-91.032 74.061-165.093 165.093-165.093s165.093 74.061 165.093 165.093v5.67z"
      />
    </Svg>
  );
};

export default Logo;
