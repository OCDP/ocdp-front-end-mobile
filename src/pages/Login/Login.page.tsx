import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  LoginCard,
  LoginButton,
  LoginInput,
  PasswordInput,
} from "./Login.page.styles";
import { Icon } from "@ui-kitten/components";
import api from "../../services/api";
import LottieView from "lottie-react-native";

import Logo from "../../assets/vectors/Logo.jsx";
import UsuarioLogadoContext from "../../contexts/UsuarioLogadoContext";
import AppContext, { useLoading } from "../../contexts/AppContext";

export default function ({ navigation }) {
  //ATENCAO PRIMARIA
  // const [login, setLogin] = useState("111.111.111-11");
  // const [pswd, setPswd] = useState("p@55w0Rd");

  //ATENCAO SECUNDARIA
  const [login, setLogin] = useState("222.222.222-22");
  const [pswd, setPswd] = useState("teste123");

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
      await api(login, pswd)
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

  return (
    <Container>
      <Logo size={200} />
      <LoginCard>
        <LoginInput value={login} onChangeText={setLogin} />
        <PasswordInput
          value={pswd}
          onChangeText={setPswd}
          icon={renderPasswordIcon}
          onIconPress={seePassowrd}
          secureTextEntry={secureTextEntry}
        />
        <LoginButton onPress={() => loginAction()} />
      </LoginCard>
      {2 > 3 && (
        <LottieView
          source={require("../../assets/animations/health.json")}
          autoPlay
          loop
        />
      )}
    </Container>
  );
}
