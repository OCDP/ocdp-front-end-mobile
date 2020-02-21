/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from "react";
import { Icon, Input, Layout } from "@ui-kitten/components";
import PageContainer from "../components/PageContainer";

const LoginPage = ({ navigation }) => {
  const [value, setValue] = React.useState("");
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = style => (
    <Icon {...style} name={secureTextEntry ? "eye-off" : "eye"} />
  );

  return (
    <PageContainer title="Login!" navigation={navigation}>
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Layout style={{ alignItems: "center" }}>
          <Input
            value={value}
            placeholder="********"
            icon={renderIcon}
            secureTextEntry={secureTextEntry}
            onIconPress={onIconPress}
            onChangeText={setValue}
          />
        </Layout>
      </Layout>
    </PageContainer>
  );
};

export default LoginPage;
