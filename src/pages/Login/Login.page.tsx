import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  LoginCard,
  LoginButton,
  LoginInput,
  PasswordInput,
} from "./Login.page.styles";
import { Icon } from "@ui-kitten/components";
import apiFunc from "../../services/api";

import Logo from "../../assets/vectors/Logo.jsx";
import UsuarioLogadoContext from "../../contexts/UsuarioLogadoContext";
import AppContext, { useLoading } from "../../contexts/AppContext";
import LoginValues from '../../LoginValues'

export default function ({ navigation }) {
  // senha primaria: p@55w0Rd
  // senha secundaria: teste123

  const [login, setLogin] = useState(LoginValues().usuario);
  const [pswd, setPswd] = useState(LoginValues().senha);

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { setUsuarioLogado } = useContext(UsuarioLogadoContext);
  const [, setLoading] = useLoading();

  const seePassowrd = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const renderPasswordIcon = (style) => (
    <Icon {...style} name={secureTextEntry ? "eye-off" : "eye"} />
  );

  async function loginAction() {
    try {
      setLoading(true);
      await apiFunc(login, pswd)
        .get(`/usuario/byCpf/${login}?cpf=${login}`)
        .then((resp) => {
          resp.data.senhaUsuario = pswd;
          setUsuarioLogado(resp.data);
          setLoading(false);
          navigation.navigate("Introducao");
        });
    } catch (err) {
      console.log(err);
      alert("Email ou senha incorreta!");
      setLoading(false);
    }
  }

  const validateCpf = (cpf) => {
    let cpfMask: string = "00000000000";
    cpfMask = cpfMask.replace(/[^\d]/g, "");
    setLogin(cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"));
  };

  return (
    <Container>
      <Logo size={200} />
      <LoginCard>
        <LoginInput value={login} onChangeText={validateCpf} />
        <PasswordInput
          value={pswd}
          onChangeText={setPswd}
          icon={renderPasswordIcon}
          onIconPress={seePassowrd}
          secureTextEntry={secureTextEntry}
        />
        <LoginButton onPress={() => loginAction()} />
      </LoginCard>
    </Container>
  );
}
