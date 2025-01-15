import React from "react";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import { Stack } from "expo-router";

const AccountNavigator = () => (
  <Stack>
    <Stack.Screen
      name="AccountSc"
      component={AccountScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Messages"
      component={MessagesScreen}
      options={{ headerShown: false }}
    />
  </Stack>
);

export default AccountNavigator;
