import React from "react";
import { StyleSheet, View } from "react-native";
import { Spinner, Text } from "@ui-kitten/components";

export interface LoadingModalProps {
  callback: () => void;
  timeout?: number;
  text?: string;
}

export const LoadingModal = ({
  callback,
  timeout,
  text
}: LoadingModalProps) => {
  React.useEffect(() => {
    setTimeout(callback, timeout || 3000);
  }, []);

  const renderLoading = () => (
    <View style={styles.loading}>
      <Spinner />
      <Text category="c1" status="primary" style={styles.loadingText}>
        {text || "Carregando..."}
      </Text>
    </View>
  );

  return renderLoading();
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loadingText: {
    marginTop: 4
  }
});

export default LoadingModal;
