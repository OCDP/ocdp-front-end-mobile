import styled from "styled-components/native";
import { buildStyledShadow } from "../../../styles/BuildShadow";
import { View } from "react-native";
import { Text, withStyles } from "@ui-kitten/components";

//chamar ${shadow} no styledcomponent
const shadow = buildStyledShadow(16);

export const HeaderContainer = withStyles(
  styled(View)`
    border-radius: 8;
    ${shadow};
    border-radius: 8px;
    margin-top: 16px;
    margin-horizontal: 16px;
  `
);

export const TextHeader = styled(Text).attrs({ category: "h6" })`
  font-weight: bold;
`;
