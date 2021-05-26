import React from 'react';
import Svg, {Path, G} from 'react-native-svg';

const GroupUsers = ({size = 24, color = '#0398AB'}) => {
  return (
    <Svg height={size} width={size} x="0" y="0" viewBox="0 0 512 512">
      <Path
        fill={color}
        d="M217.21 353.387a59.463 59.463 0 00-29.026-16.614l-41.143-9.859-.017.027.017-.027v-25.117H96.799v25.198l-41.036 9.803C28.93 343.208 10 367.191 10 394.779V462h90.962L217.21 353.387z"
      />
      <Path
        fill="#FFB487"
        d="M148.12 301.797L148.12 327.592 122.046 390.047 96 327.681 96 301.797z"
      />
      <Path
        fill="#FFCDAC"
        d="M177.955 215.261v34.79c0 30.928-25.073 56-56.002 56-30.929 0-56.002-25.072-56.002-56v-34.79h112.004z"
      />
      <Path
        fill="#878791"
        d="M177.955 226.266v-13.481c0-30.928-25.073-56-56.002-56-30.929 0-56.002 25.072-56.002 56v13.481h38.603c24.174 0 47.895-6.563 68.631-18.988"
      />
      <Path
        fill={color}
        d="M294.79 353.387a59.463 59.463 0 0129.026-16.614l41.143-9.859.017.027-.017-.027v-25.117h50.242v25.198l41.036 9.803C483.07 343.208 502 367.191 502 394.779V462h-90.962L294.79 353.387z"
      />
      <Path
        fill={color}
        d="M220.953 352.403l-57.306 13.732c-37.348 8.95-63.685 42.343-63.685 80.747V502h311.87v-55.07c0-38.426-26.366-71.832-63.742-80.761l-57.157-13.654-69.98-.112z"
      />
      <G fill="#FFB487">
        <Path d="M416 301.797L416 327.681 389.954 390.047 363.88 327.592 363.88 301.797z" />
        <Path d="M256.01 432.738l37.31-84.708a30.798 30.798 0 01-4.347-15.792v-8.142h-65.966v8.143c0 5.72-1.572 11.124-4.333 15.769l37.336 84.73z" />
      </G>
      <Path
        fill="#FFCDAC"
        d="M334.001 191.525v53.819c0 43.078-34.922 78.001-78 78.001s-78-34.922-78-78.001v-53.819h156z"
      />
      <Path
        fill="#F5B955"
        d="M256 115.437c-43.079 0-78.001 34.922-78.001 78v18.777h38.137a85.697 85.697 0 0065.684-30.656l52.179 30.656v-18.777c.002-43.078-34.92-78-77.999-78z"
      />
      <Path
        fill="#FFCDAC"
        d="M334.045 215.261v34.79c0 30.928 25.073 56 56.002 56 30.929 0 56.002-25.072 56.002-56v-34.79H334.045z"
      />
      <Path
        fill="#878791"
        d="M334.045 226.266v-13.481c0-30.928 25.073-56 56.002-56 30.929 0 56.002 25.072 56.002 56v13.481h-38.603a133.527 133.527 0 01-68.631-18.988"
      />
      <Path d="M255.74 492c-2.631 0-5.211 1.07-7.07 2.93-1.86 1.86-2.93 4.44-2.93 7.07s1.069 5.21 2.93 7.07a10.072 10.072 0 007.07 2.93c2.63 0 5.21-1.07 7.069-2.93 1.86-1.86 2.931-4.44 2.931-7.07s-1.07-5.21-2.931-7.07a10.072 10.072 0 00-7.069-2.93z" />
      <Path d="M458.56 327.071l-33.358-7.969V305.87c18.516-11.703 30.848-32.342 30.848-55.818v-37.267c0-36.393-29.608-66-66.002-66-19.632 0-37.279 8.626-49.38 22.275-10.598-36.703-44.495-63.623-84.564-63.623h-.001c-40.134 0-74.077 27.005-84.616 63.798-12.104-13.75-29.816-22.45-49.532-22.45-36.394 0-66.002 29.608-66.002 66v37.267c0 23.477 12.332 44.116 30.848 55.818v13.232l-33.358 7.969C21.976 334.587 0 362.43 0 394.779V462c0 5.523 4.478 10 10 10h79.963v30c0 5.523 4.478 10 10 10h109.704c5.522 0 10-4.477 10-10s-4.478-10-10-10h-44.643v-44.012c0-5.523-4.478-10-10-10s-10 4.477-10 10V492h-35.062v-45.118c0-33.914 23.034-63.119 56.015-71.022l49.183-11.786 31.646 71.996a9.999 9.999 0 009.153 5.976h.001a10 10 0 009.154-5.975l31.614-71.891 49.04 11.715c33.011 7.885 56.065 37.096 56.065 71.034v11.159c-.511 1.202-.795 2.523-.795 3.911s.284 2.71.795 3.911V492h-34.857v-44.012c0-5.523-4.478-10-10-10s-10 4.477-10 10V492h-48.975c-5.522 0-10 4.477-10 10s4.478 10 10 10h113.832c5.522 0 10-4.477 10-10v-30H502c5.522 0 10-4.477 10-10v-67.221c0-32.349-21.976-60.192-53.44-67.708zm-53.336.464l-15.268 36.559-15.062-36.078a9.993 9.993 0 00.065-1.374v-12.35a65.899 65.899 0 0015.088 1.76c5.215 0 10.285-.627 15.154-1.776v12.718c0 .182.013.361.023.541zm-194.271 8.033a69.436 69.436 0 00-20.438-8.519l-33.474-8.021v-13.115a66.474 66.474 0 0020.667-20.607c7.539 14.729 19.11 27.063 33.245 35.547v14.715zM188.1 245.345v-23.13h28.138c25.524 0 49.715-10.088 67.587-27.941l40.221 23.629v29.789c-1.244 36.411-31.233 65.654-67.943 65.654-37.498-.001-68.003-30.506-68.003-68.001zm112.834 75.696c14.222-8.455 25.874-20.798 33.471-35.559a66.513 66.513 0 0020.554 20.431v13.115l-33.474 8.021a69.454 69.454 0 00-20.552 8.592v-14.6h.001zm89.113-24.989c-25.365 0-46.002-20.636-46.002-46v-1.632c.035-1.021.06-26.888.06-26.888a143.562 143.562 0 0063.342 14.735h28.603v13.786c-.001 25.364-20.638 45.999-46.003 45.999zm0-129.267c25.365 0 46.002 20.636 46.002 46v3.481h-28.603a123.556 123.556 0 01-61.548-16.426c5.606-19.082 23.276-33.055 44.149-33.055zM188.1 193.438c0-37.496 30.506-68 68.003-68 37.496 0 68.002 30.505 68.002 68v1.304l-37.115-21.805a10 10 0 00-12.73 2.199c-14.42 17.208-35.568 27.078-58.021 27.078H188.1v-8.776zM75.951 212.785c0-25.365 20.637-46 46.002-46 20.873 0 38.543 13.973 44.148 33.056a123.564 123.564 0 01-61.548 16.426H75.951V212.785zm0 23.481h28.603c22.032 0 43.727-5.076 63.401-14.763v28.549c0 25.365-20.637 46-46.002 46s-46.002-20.636-46.002-46v-13.786zm46.002 79.786c5.192 0 10.238-.622 15.088-1.76v12.07a9.653 9.653 0 00-.016.564c0 .315.03.628.06.941l-15.13 36.227-15.187-36.379c.017-.239.031-.478.031-.72v-12.718a65.95 65.95 0 0015.154 1.775zm-31.99 130.83V452H60v-44.429c0-5.523-4.478-10-10-10s-10 4.477-10 10V452H20v-57.221c0-23.055 15.662-42.898 38.087-48.255l31.698-7.573 20.688 49.555c-12.939 16.074-20.51 36.448-20.51 58.376zm71.354-90.471a94 94 0 00-16.906 5.812l9.74-23.322 31.703 7.597a49.558 49.558 0 017.174 2.314l-31.711 7.599zm94.645 50.788l-25.009-56.897v-20.624a87.713 87.713 0 0025.149 3.667c8.62 0 16.953-1.252 24.831-3.573v20.641l-24.971 56.786zm62.827-58.311a49.645 49.645 0 017.357-2.39l31.626-7.578 9.78 23.426a94.009 94.009 0 00-17.138-5.902l-31.625-7.556zM492 452h-20v-44.429c0-5.523-4.478-10-10-10s-10 4.477-10 10V452h-30.167v-5.07c0-21.899-7.546-42.245-20.448-58.305l20.753-49.692 31.775 7.591c22.425 5.357 38.087 25.2 38.087 48.255V452z" />
      <Path d="M222.46 231.25c-2.63 0-5.21 1.07-7.07 2.93-1.86 1.86-2.93 4.44-2.93 7.07s1.069 5.21 2.93 7.07 4.44 2.93 7.07 2.93c2.64 0 5.21-1.07 7.069-2.93 1.87-1.86 2.931-4.44 2.931-7.07s-1.061-5.21-2.931-7.07a10.072 10.072 0 00-7.069-2.93zM289.33 251.25c2.63 0 5.21-1.07 7.069-2.93 1.87-1.86 2.931-4.44 2.931-7.07s-1.061-5.21-2.931-7.07c-1.859-1.86-4.439-2.93-7.069-2.93s-5.21 1.07-7.07 2.93c-1.86 1.86-2.93 4.44-2.93 7.07s1.069 5.21 2.93 7.07 4.44 2.93 7.07 2.93zM275.247 267.842c-3.906-3.905-10.236-3.905-14.143 0-2.957 2.957-7.768 2.957-10.725 0-3.906-3.905-10.236-3.905-14.143 0-3.905 3.905-3.905 10.237 0 14.143 5.378 5.377 12.441 8.066 19.505 8.066 7.064 0 14.127-2.688 19.505-8.066 3.906-3.906 3.906-10.238.001-14.143zM406.62 74h6.859c5.522 0 10-4.477 10-10s-4.478-10-10-10h-6.859c-5.522 0-10 4.477-10 10s4.478 10 10 10zM455.141 74H462c5.522 0 10-4.477 10-10s-4.478-10-10-10h-6.859c-5.522 0-10 4.477-10 10s4.477 10 10 10zM434.311 101.69c5.522 0 10-4.477 10-10v-6.859c0-5.523-4.478-10-10-10s-10 4.477-10 10v6.859c0 5.523 4.477 10 10 10zM434.311 53.169c5.522 0 10-4.477 10-10V36.31c0-5.523-4.478-10-10-10s-10 4.477-10 10v6.859c0 5.523 4.477 10 10 10zM49.444 74h6.858c5.522 0 10-4.477 10-10s-4.478-10-10-10h-6.858c-5.522 0-10 4.477-10 10s4.478 10 10 10zM97.965 74h6.858c5.522 0 10-4.477 10-10s-4.478-10-10-10h-6.858c-5.522 0-10 4.477-10 10s4.477 10 10 10zM77.134 101.69c5.522 0 10-4.477 10-10v-6.859c0-5.523-4.478-10-10-10s-10 4.477-10 10v6.859c0 5.523 4.477 10 10 10zM77.134 53.169c5.522 0 10-4.477 10-10V36.31c0-5.523-4.478-10-10-10s-10 4.477-10 10v6.859c0 5.523 4.477 10 10 10zM256 84.397c5.522 0 10-4.477 10-10v-26.31c0-5.523-4.478-10-10-10s-10 4.477-10 10v26.31c0 5.523 4.478 10 10 10zM256 20c2.63 0 5.21-1.07 7.069-2.93C264.93 15.21 266 12.63 266 10s-1.07-5.21-2.931-7.07C261.21 1.07 258.63 0 256 0s-5.21 1.07-7.07 2.93C247.069 4.79 246 7.37 246 10s1.069 5.21 2.93 7.07S253.37 20 256 20zM206.813 54.262c1.953 1.953 4.512 2.929 7.071 2.929s5.118-.976 7.071-2.929c3.905-3.905 3.905-10.237 0-14.143l-14.634-14.634c-3.906-3.905-10.236-3.905-14.143 0-3.905 3.905-3.905 10.237 0 14.143l14.635 14.634zM297.626 57.13c2.56 0 5.118-.976 7.071-2.929l15.123-15.123c3.905-3.905 3.905-10.237 0-14.143-3.906-3.905-10.236-3.905-14.143 0l-15.123 15.123c-3.905 3.905-3.905 10.237 0 14.143a9.97 9.97 0 007.072 2.929z" />
    </Svg>
  );
};

export default GroupUsers;
