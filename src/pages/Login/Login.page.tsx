import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  LoginCard,
  LoginButton,
  LoginInput,
  PasswordInput
} from "./Login.page.styles";
import { Icon } from "@ui-kitten/components";
import api from "../../services/api";

import Logo from "../../assets/vectors/Logo.jsx";
import UsuarioLogadoContext from "../../contexts/UsuarioLogadoContext";

export default function({ navigation }) {
  const [login, setLogin] = useState("");
  const [pswd, setPswd] = useState();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { usuarioLogado, setUsuarioLogado } = useContext(UsuarioLogadoContext);

  const seePassowrd = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const renderPasswordIcon = style => (
    <Icon {...style} name={secureTextEntry ? "eye-off" : "eye"} />
  );

  async function loginAction() {
    try {
      let resp = await api(login, pswd).get(
        `/usuario/byCpf/${login}?cpf=${login}`
      );
      console.log("resposta >>> ", resp.data);
      setUsuarioLogado(resp.data);
      await console.log("usuario logado >>>> ", usuarioLogado);
      navigation.navigate("Home");
    } catch (err) {
      console.log(err);
      alert("Email ou senha incorreta!");
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
    </Container>
  );
}
