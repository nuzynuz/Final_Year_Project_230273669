import React from "react";

import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import CAgentHomeScreen from "../screens/CAgentHomeScreen";
import { Stack } from "expo-router";

const CAgentHomeNavigator = () => (
  <Stack screenOptions={{ presentation: "modal", headerShown: false }}>
    <Stack.Screen name="CAgentHomeS" component={CAgentHomeScreen} />
    <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
  </Stack>
);

export default CAgentHomeNavigator;
