import React from "react";
import styled from "styled-components/native";
import { KeyboardAvoidingView } from "react-native";
import {
  Card,
  Button,
  Input,
  withStyles,
  Layout,
  Text,
} from "@ui-kitten/components";
import { buildStyledShadow } from "../../styles/BuildShadow";
import { map } from "../../assets/Icons";

const shadow = buildStyledShadow(16);

interface ContainerProps {
  themedStyle?: any;
}

export const Container = withStyles(
  styled(KeyboardAvoidingView).attrs({
    behavior: "padding",
  })<ContainerProps>`
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `
);

export const LoginInput = styled(Input).attrs({
  placeholder: "insira o CPF",
})`
  margin-bottom: 8px;
`;

export const PasswordInput = styled(Input).attrs({
  placeholder: "********",
})`
  margin-top: 8px;
`;

export const LoginButton = styled(Button).attrs({
  children: "Entrar",
  size: "large",
})`
  margin: 8px 0;
`;

export const PswdRecoveryButton = styled(Button).attrs({
  children: "Esqueceu sua senha?",
  status: "basic",
  appearance: "ghost",
  size: "small",
  icon: map,
})`
  margin-bottom: 4px;
  flex-direction: row-reverse;
  align-self: flex-end;
`;

export const RegisterButton = styled(Button).attrs({
  children: "Ainda não possui cadastro?",
  status: "warning",
  appearance: "ghost",
  size: "giant",
})`
  position: absolute;
  bottom: 0;
  width: 100%;
  border-radius: 0;
`;
