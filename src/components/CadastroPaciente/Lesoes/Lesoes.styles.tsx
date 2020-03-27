import styled from "styled-components/native";
import { buildStyledShadow } from "../../../styles/BuildShadow";
import { View } from "react-native";
import { Text } from "@ui-kitten/components";

//chamar ${shadow} no styledcomponent
const shadow = buildStyledShadow(16);

export const CardLesoes = styled(View)`
  background-color: #fcfcfc;
  border-radius: 8;
  ${shadow};
  border-radius: 8px;
  margin-top: 16px;
  margin-horizontal: 16px;
`;

export const TextHeader = styled(Text).attrs({ category: "p2" })`
  font-weight: bold;
`;
