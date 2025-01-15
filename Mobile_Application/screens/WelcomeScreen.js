import React from "react";
import { router } from "expo-router";

import { View, ImageBackground, StyleSheet, Image, Text } from "react-native";

import ButtonRoundCorner from "../components/ButtonRoundCorner";
import routes from "../navigation/routes";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo-red.png")} />
        <Text style={styles.tagline}>Let's Collect the green leaves</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonRoundCorner
          title="login"
          onPress={
            () =>
              router.navigate("sign-in") /*navigation.navigate(routes.LOGIN)*/
          }
        />
        <ButtonRoundCorner
          title="register"
          color="secondary"
          onPress={
            () =>
              router.navigate(
                "sign-up"
              ) /*navigation.navigate(routes.REGISTER)*/
          }
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
  },
});

export default WelcomeScreen;
