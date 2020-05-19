import styled from "styled-components/native";
import { Layout } from "@ui-kitten/components";
import { buildStyledShadow } from "../../styles/BuildShadow";
import { BlurView } from 'expo-blur';
import { Animated, Dimensions } from "react-native";

//chamar ${shadow} no styledcomponent
const shadow = buildStyledShadow(16);

const fadeHeight = Dimensions.get('window').height + 20;

export const BackgroundContainer = styled(Layout).attrs({
  level: "4",
})`
  flex: 1;
`;

export const ForegroundContainer = styled(Layout)`
  
  padding-top: ${({ noPadding }) => noPadding ? 0 : 16}px;
  flex: 1;
  position: relative;
`;

const BluredAnim = Animated.createAnimatedComponent(BlurView);

export const Fade = styled(BluredAnim).attrs({
  tint: "light",
  intensity: 95,
})`
  height: ${fadeHeight}px;
  width: 100%;
  z-index: 2;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  position: absolute;
  top: 0;
  left: 0;
`;
