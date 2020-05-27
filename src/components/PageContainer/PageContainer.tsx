import React, { useContext, useMemo } from "react";
import {
  BackgroundContainer,
  ForegroundContainer,
  Fade,
} from "./PageContainer.styles";
import {
  TopNavigationAction,
  withStyles,
  TopNavigation,
} from "@ui-kitten/components";
import { arrowBack, home, menu } from "../../assets/Icons";
import { Animated } from "react-native";
import AppContext, { useLoading } from "../../contexts/AppContext";
import { useNavigation, CommonActions } from "@react-navigation/native";
import BotaoContext from "../../contexts/BotoesContext";

export interface PageContainerProps {
  children: React.ReactNode;
  title: string;
  navigation: any;
  subtitle?: string;
  hideDrawer?: boolean;
  noPadding?: boolean;
  themedStyle?: any;
}

function Pagecontainer({
  children,
  title,
  navigation,
  subtitle,
  noPadding,
  themedStyle,
}: PageContainerProps) {
  const fadeAnim = new Animated.Value(0);

  const { switchTheme, theme } = useContext(AppContext);
  const [, setLoading] = useLoading();
  const { activeStepBtn, setActiveStepBtn } = React.useContext(BotaoContext);

  const onToggle = useMemo(
    () => () => {
      switchTheme();
    },
    []
  );

  const resetNav = () => {
    navigation.navigate("Home");
  };

  navigation = useNavigation();

  const renderMenuControl = () => (
    <TopNavigationAction
      icon={menu}
      onPress={() => navigation.toggleDrawer()}
    />
  );

  const renderRightControls = () => [
    <TopNavigationAction icon={home} onPress={() => {
      setLoading(true);
          navigation.dispatch(
          CommonActions.reset({
            routes: [{ name: "Home" }],
          })
        );
      setActiveStepBtn(0);
      setLoading(false)
      // resetNav()
    }} />,
  ];

  return (
    <BackgroundContainer>
      <TopNavigation
        style={{
          backgroundColor: themedStyle.bgColor,
          height: 65,
        }}
        title={title}
        subtitle={subtitle}
        alignment="center"
        leftControl={renderMenuControl()}
        rightControls={renderRightControls()}
      />
      <ForegroundContainer noPadding={noPadding}>
        <Fade
          style={{
            opacity: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
              extrapolate: "clamp",
            }),
            zIndex: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 2],
              extrapolate: "clamp",
            }),
          }}
        />
        {children}
      </ForegroundContainer>
    </BackgroundContainer>
  );
}

export default withStyles(Pagecontainer, (theme) => ({
  bgColor: theme["background-basic-color-4"],
}));
