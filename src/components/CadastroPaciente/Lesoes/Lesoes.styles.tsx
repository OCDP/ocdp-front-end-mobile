import styled from "styled-components/native";
import { buildStyledShadow } from "../../../styles/BuildShadow";
import { View } from "react-native";
import { Text, withStyles } from "@ui-kitten/components";

//chamar ${shadow} no styledcomponent
const shadow = buildStyledShadow(16);

export const CardLesoes = withStyles(
  styled(View)`
    border-radius: 8;
    ${shadow};
    border-radius: 8px;
    margin-top: 16px;
    margin-horizontal: 16px;
    background-color: ${({ themedStyle }) => themedStyle.bgColor};
  `,
  (theme) => ({ bgColor: theme["background-basic-color-4"] })
);

export const TextHeader = styled(Text).attrs({ category: "p2" })`
  font-weight: bold;
`;
