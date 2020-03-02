import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  LoginCard,
  LoginButton,
  LoginInput,
  PasswordInput
} from "./Login.page.styles";
import { Icon, Text, Button } from "@ui-kitten/components";
import AppContext from "../../contexts/AppContext";
import api from "../../services/api";
import * as SecureStore from "expo-secure-store";
import { CommonActions } from "@react-navigation/native";
import { Alert } from "react-native";
import PageContainer from "../../components/PageContainer";
import Logo from "../../assets/vectors/Logo.jsx";

export default function({ navigation }) {
  const [login, setLogin] = useState("");
  const [pswd, setPswd] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const seePassowrd = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const renderPasswordIcon = style => (
    <Icon {...style} name={secureTextEntry ? "eye-off" : "eye"} />
  );

  return (
    <Container>
      <Logo size={200}/>
      <LoginCard>
        <LoginInput value={login} onChangeText={setLogin} />
        <PasswordInput
          value={pswd}
          onChangeText={setPswd}
          icon={renderPasswordIcon}
          onIconPress={seePassowrd}
          secureTextEntry={secureTextEntry}
        />
        <LoginButton onPress={() => navigation.navigate("Home")} />
      </LoginCard>
    </Container>
  );
}
