import React from "react";
import { Stack } from "expo-router";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

//Create react component
// const AuthNavigator = () => (
//   // <Stack>
//   //   <Stack.Screen
//   //     name="Welcome"
//   //     component={WelcomeScreen}
//   //     options={{ headerShown: false }}
//   //   />
//   //   <Stack.Screen
//   //     name="Login"
//   //     component={LoginScreen}
//   //     options={{ headerShown: false }}
//   //   />
//   //   <Stack.Screen
//   //     name="Register"
//   //     component={RegisterScreen}
//   //     options={{ headerShown: false }}
//   //   />
//   // </Stack>
// );

// export default AuthNavigator;

import { StyleSheet, Text, View } from "react-native";

const AuthNavigator = () => {
  return (
    <Stack>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default AuthNavigator;

const styles = StyleSheet.create({});
