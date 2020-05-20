import React from "react";
import { useEffect } from "react";
import { BackHandler } from "react-native";

function handleBackButton() {
  return true;
}

export default ({ action = () => {}, children: Component, ...props }) => {
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
  }, [action]);

  return <Component {...props} />;
};
