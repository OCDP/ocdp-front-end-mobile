import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  LoginButton,
  LoginInput,
  PasswordInput
} from "./Login.page.styles";
import { Icon, useStyleSheet, Card, Layout, Text } from "@ui-kitten/components";
import api from "../../services/api";

import Logo from "../../assets/vectors/Logo.jsx";
import UsuarioLogadoContext from "../../contexts/UsuarioLogadoContext";
import { useLoading } from "../../contexts/AppContext";

export default function({ navigation }) {
  const [login, setLogin] = useState("admin");
  const [pswd, setPswd] = useState("p@55w0Rd");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { usuarioLogado, setUsuarioLogado } = useContext(UsuarioLogadoContext);
  const [, setLoading] = useLoading();

  const seePassowrd = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const renderPasswordIcon = style => (
    <Icon {...style} name={secureTextEntry ? "eye-off" : "eye"} />
  );

  const styles = useStyleSheet({
    cardStyles: {
      borderRadius: 8,
      marginTop: 36,
      width: "90%",
      maxWidth: 400,
      flexDirection: "column",
      justifyContent: "space-between"
    }
  });

  async function loginAction() {
    try {
      setLoading(true);
      let resp = await api(login, pswd).get(
        `/usuario/byCpf/${login}?cpf=${login}`
      );
      setUsuarioLogado(resp.data);
      setLoading(false);
      navigation.navigate("Home");
    } catch (err) {
      console.log(err);
      alert("Email ou senha incorreta!");
    }
  }

  const Header = (evaProps) => (
    <Layout {...evaProps}>
      <Text category="h6">Já possui cadastro?</Text>
      <Text category="h6">Faça o login agora</Text>
    </Layout>
  );

  return (
    <Container>
      <Logo size={200} />
      <Card header={Header} style={styles.cardStyles}>
        <LoginInput value={login} onChangeText={setLogin} />
        <PasswordInput
          value={pswd}
          onChangeText={setPswd}
          icon={renderPasswordIcon}
          onIconPress={seePassowrd}
          secureTextEntry={secureTextEntry}
        />
        <LoginButton onPress={() => loginAction()} />
      </Card>
    </Container>
  );
}
