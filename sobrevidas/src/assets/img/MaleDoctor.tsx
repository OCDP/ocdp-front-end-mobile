import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

const MaleDoctor = ({size = 24, color = '#0398AB'}) => {
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
        cx="31.584"
        cy="37.25"
        r="42.862"
        fill={color}
        transform="translate(13.156 6.546) scale(1.16654)"
      />
      <Path
        fill="#fff"
        fillRule="nonzero"
        d="M482.726 485.783l-22.65-132.603c-2.441-14.287-12.576-25.764-26.453-29.95l-61.092-18.433a67.95 67.95 0 00-17.578-40.175 68.085 68.085 0 00-29.704-18.999 124.42 124.42 0 005.372-6.377c14.528-18.477 22.306-38.833 24.286-52.724h4.713c12.258 0 22.231-9.972 22.231-22.231v-11.396c0-8.181-4.602-15.594-11.523-19.441V106.05a7.498 7.498 0 00-14.995 0v30.764c-2.92.507-6.404 1.383-9.968 2.884a7.53 7.53 0 00-1.056.472c-.805.367-1.611.754-2.414 1.19V80.938c0-16.693-13.58-30.273-30.273-30.273h-20.695a31.105 31.105 0 00-19.637 7.005l-2.031 1.66a20.999 20.999 0 01-13.257 4.73c-4.819 0-9.528-1.68-13.258-4.73l-2.03-1.66a31.11 31.11 0 00-19.637-7.005H200.38c-16.693 0-30.273 13.58-30.273 30.273v60.422a38.473 38.473 0 00-2.414-1.19 7.519 7.519 0 00-1.055-.472c-3.564-1.501-7.049-2.377-9.968-2.884V59.025c0-24.278 19.752-44.03 44.03-44.03h110.601c24.279 0 44.03 19.752 44.03 44.03v11.786a7.498 7.498 0 1014.995 0V59.025C370.326 26.479 343.847 0 311.301 0H200.7c-32.547 0-59.025 26.479-59.025 59.025v74.43c-6.921 3.847-11.523 11.259-11.523 19.441v11.396c0 12.259 9.973 22.231 22.231 22.231h4.713c1.979 13.891 9.758 34.247 24.286 52.724a124.188 124.188 0 005.367 6.371c-25.98 8.252-44.926 31.61-47.277 59.179L78.378 323.23c-13.877 4.186-24.013 15.663-26.453 29.95l-9.198 53.849a7.497 7.497 0 0014.781 2.524l9.198-53.849c1.476-8.644 7.608-15.586 16.003-18.118l56.505-17.049v14.831c-12.952 2.384-23.973 11.281-28.512 23.608a38.026 38.026 0 00-2.226 10.182l-5.461 70.095a19.11 19.11 0 005.01 14.423 19.114 19.114 0 0013.989 6.116h9.348a7.497 7.497 0 100-14.995h-9.348a4.07 4.07 0 01-2.982-1.304 4.07 4.07 0 01-1.067-3.073l5.461-70.096a23.021 23.021 0 011.348-6.167c3.158-8.575 11.686-14.382 21.223-14.449l1.235-.009.172-.001c9.269 0 17.474 5.256 20.935 13.427a22.997 22.997 0 011.755 7.199l5.463 70.097a4.078 4.078 0 01-1.068 3.073 4.074 4.074 0 01-2.982 1.303h-9.348a7.497 7.497 0 100 14.995h9.348a19.108 19.108 0 0013.989-6.116 19.11 19.11 0 005.011-14.422l-5.463-70.096a37.974 37.974 0 00-2.898-11.884c-4.939-11.657-15.5-19.762-27.938-21.955v-19.306l25.774-7.777c2.345 4.939 6.992 15.612 16.197 38.619 9.277 23.214 20.808 52.969 31.867 81.895.079.243.17.48.272.712a9889.647 9889.647 0 0120.662 54.541 7.498 7.498 0 0014.04 0 9730.632 9730.632 0 0120.662-54.541c.103-.232.193-.47.272-.712 11.051-28.909 22.576-58.645 31.849-81.852 9.217-23.037 13.868-33.719 16.214-38.662l25.774 7.777v44.285c-17.858 3.469-31.385 19.219-31.385 38.077 0 21.391 17.403 38.795 38.795 38.795 21.392 0 38.795-17.403 38.795-38.795 0-18.796-13.438-34.508-31.21-38.045v-39.792l56.506 17.049c8.395 2.532 14.526 9.474 16.003 18.118l22.65 132.603a7.329 7.329 0 01-1.648 6.054 7.334 7.334 0 01-5.69 2.644H51.393a7.333 7.333 0 01-5.69-2.644 7.331 7.331 0 01-1.648-6.054l7.475-43.762a7.497 7.497 0 00-6.128-8.652c-4.08-.7-7.955 2.047-8.653 6.128l-7.475 43.762a22.4 22.4 0 004.968 18.248A22.398 22.398 0 0051.393 512h409.214a22.394 22.394 0 0017.151-7.969 22.4 22.4 0 004.968-18.248zM355.421 152.089c3.995-.996 7.202-.978 7.238-.977a7.664 7.664 0 003.664-.87c.334.831.531 1.724.531 2.654v11.396c0 3.99-3.246 7.236-7.236 7.236h-4.197v-19.439zm-198.842 19.439h-4.197c-3.99 0-7.236-3.246-7.236-7.236v-11.396c0-.93.198-1.823.531-2.653a7.646 7.646 0 003.664.869c.057.01 3.255-.008 7.238.981v19.435zm14.995 8.407v-19.698c2.272.681 4.757.588 7.051-.369a10.502 10.502 0 006.477-9.716V80.938c0-8.424 6.854-15.278 15.278-15.278h20.695c3.688 0 7.291 1.285 10.146 3.619l2.03 1.66A36.033 36.033 0 00256 79.054a36.039 36.039 0 0022.749-8.115l2.03-1.66a16.07 16.07 0 0110.146-3.619h20.695c8.424 0 15.278 6.854 15.278 15.278v69.215c0 4.26 2.542 8.074 6.477 9.716a10.471 10.471 0 007.051.375v19.691c0 10.947-7.568 32.205-21.594 50.043-4.646 5.909-10.618 12.257-17.971 17.805a7.51 7.51 0 00-.669.505c-11.391 8.422-26.038 14.874-44.192 14.874s-32.801-6.452-44.193-14.875a7.608 7.608 0 00-.667-.503c-7.353-5.549-13.325-11.897-17.972-17.806-14.025-17.837-21.594-39.096-21.594-50.043zM305.12 301.07L256 337.784l-49.12-36.714c4.871-6.191 7.6-14.138 7.6-21.23v-12.086c11.551 6.212 25.334 10.404 41.52 10.404 16.186 0 29.97-4.192 41.52-10.404v12.086c0 7.092 2.729 15.039 7.6 21.23zm-110.753-8.369a20.5 20.5 0 00-12.642-.636 9.418 9.418 0 00-.539.144l-25.903 7.816c4.381-21.542 21.873-38.688 44.202-42.009v21.824c0 4.704-2.1 9.567-5.118 12.861zm20.349 60.188l-.041-.104a2233.66 2233.66 0 00-1.328-3.353l-1.081-2.722-.075-.189a2891.71 2891.71 0 00-3.212-8.039l-.225-.56-.876-2.177-.316-.783c-.28-.694-.558-1.384-.832-2.059l-.243-.599a3020.388 3020.388 0 00-2.392-5.874l-.584-1.424-.219-.534-.168-.408c-.866-2.104-1.689-4.087-2.47-5.952l-.019-.045c-.416-.993-.823-1.963-1.214-2.887l-.599-1.412 42.245 31.574-17.652 7.499-.094.04-7.37 3.131-1.235-3.123zm17.89 45.908a7797.43 7797.43 0 00-4.468-11.569 6045.963 6045.963 0 00-6.708-17.251l2.798-1.189 11.432 13.289-3.054 16.72zm23.539 60.938a7.466 7.466 0 00-.767-1.259c-3.388-8.955-7.688-20.286-12.447-32.753l7-38.325h12.138l7 38.325a11871.808 11871.808 0 00-12.924 34.012zm8.736-87.331h-17.762l-8.405-9.77L256 355.291l17.286 7.343-8.405 9.77zm18.981 14.824a7797.43 7797.43 0 00-4.468 11.569l-3.054-16.721 11.432-13.289 2.798 1.189c-2.137 5.47-4.37 11.213-6.708 17.252zm28.718-72.048a777.44 777.44 0 00-1.15 2.733l-.154.368c-.389.93-.785 1.88-1.195 2.869l-.082.2c-.354.853-.717 1.733-1.086 2.63l-.203.492-.253.617-.499 1.216-.622 1.519-.204.5a1458.71 1458.71 0 00-1.606 3.951l-.257.635-.824 2.039-.326.809-.867 2.155-.247.615a2635.385 2635.385 0 00-3.167 7.925l-.108.272-1.074 2.704-.203.511a1786.318 1786.318 0 00-1.154 2.914l-1.248 3.16-7.377-3.134a5.938 5.938 0 01-.077-.033l-17.662-7.503 42.245-31.574c-.198.46-.398.93-.6 1.41zm18.234-22.97l-.004-.001c-.006-.002-.013-.003-.019-.006-4.35-1.305-8.99-1.089-13.157.498-3.019-3.294-5.118-8.157-5.118-12.861v-21.835a52.849 52.849 0 0144.232 42.029l-25.934-7.824zm58.187 106.165c0 13.124-10.677 23.8-23.8 23.8-13.123 0-23.8-10.676-23.8-23.8s10.677-23.8 23.8-23.8c13.123 0 23.8 10.676 23.8 23.8z"
        transform="matrix(.1262 0 0 .1262 50 50) translate(-256 -256)"
      />
    </Svg>
  );
};

export default MaleDoctor;
