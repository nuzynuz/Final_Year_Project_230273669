import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";
import VAgentHomeScreen from "../screens/VAgentHomeScreen";
import VerifyScreen from "../screens/VerifyScreen";
import NewListingButton from "../components/NewListingButton";
import routes from "./routes";
import navigation from "./rootNavigation";
import useNotifications from "../hooks/useNotifications";
import { Tab } from "expo-router";

const VAgentNavigator = () => {
  useNotifications(() => {
    navigation.navigate("Account");
  });

  return (
    <Tab>
      <Tab.Screen
        name="home"
        component={VAgentHomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="verifyScreen"
        component={VerifyScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewListingButton
              onPress={() => navigation.navigate("verifyScreen")}
              iconName="truck-check"
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab>
  );
};

export default VAgentNavigator;
