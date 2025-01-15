import React from "react";
import FarmerHomeScreen from "../screens/FarmerHomeScreen";
import WeightageListScreen from "../screens/WeightageListScreen";
import AdvanceScreen from "../screens/AdvanceScreen";
import AdvanceListScreen from "../screens/AdvanceListScreen";
import AdvanceNavigator from "./AdvanceNavigator";
import { Stack } from "expo-router";

const FarmerHomeNavigator = () => (
  <Stack screenOptions={{ presentation: "modal", headerShown: false }}>
    <Stack.Screen name="frhome" component={FarmerHomeScreen} />
    <Stack.Screen name="weightages" component={WeightageListScreen} />
    <Stack.Screen name="advanceList" component={AdvanceNavigator} />
  </Stack>
);
export default FarmerHomeNavigator;
