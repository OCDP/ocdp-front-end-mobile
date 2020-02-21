import React from "react";
import { Button, Layout } from "@ui-kitten/components";
import PageContainer from "../components/PageContainer";
import ListarPacientes from "../components/CadastroPaciente/ListarPacientes";

const HomeScreen = ({ navigation }) => {

  return (
    <PageContainer title="bem vindo!" navigation={navigation}>
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Layout style={{ alignItems: "center" }}>
          <Button onPress={() => navigation.navigate("CadastrarPaciente")}>
            adicionar novo paciente
          </Button>
          <ListarPacientes navigation={navigation} />
        </Layout>
      </Layout>
    </PageContainer>
  );
};
export default HomeScreen;
