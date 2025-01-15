import React from "react";
import AdvanceScreen from "../screens/AdvanceScreen";
import AdvanceListScreen from "../screens/AdvanceListScreen";
import { Stack } from "expo-router";

const AdvanceNavigator = () => (
  <Stack screenOptions={{ presentation: "modal", headerShown: false }}>
    <Stack.Screen name="advanceListScreen" component={AdvanceListScreen} />
    <Stack.Screen name="newAdvance" component={AdvanceScreen} />
  </Stack>
);
export default AdvanceNavigator;
