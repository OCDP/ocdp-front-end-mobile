import React from "react";
import {
  useStyleSheet,
  withStyles,
  Layout,
  Text,
  Icon
} from "@ui-kitten/components";
import Empty from "..//assets/vectors/EmptyContent.icon.jsx";
import { View } from "react-native";

const ImplementFutura = ({ navigation, title, textContent }) => {
  const styles = useStyleSheet({
    container: {
      flex: 1
    },
    boxText: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1
    },
    itemText: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center"
    }
  });

  return (
    <Layout level="1" style={styles.container}>
      <View style={styles.boxText}>
        <View style={{ marginVertical: 36 }}>
          <Empty size={150} />
        </View>
        <Text style={styles.itemText} appearance="hint">
          {title}
        </Text>
        <Text style={{ textAlign: "center" }} appearance="hint">
          {textContent}
        </Text>
      </View>
    </Layout>
  );
};

export default withStyles(ImplementFutura, theme => ({
  primary: theme["color-primary-500"],
  primaryTrans: theme["color-primary-transparent-500"]
}));