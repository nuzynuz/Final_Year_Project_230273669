import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";
import CAgentHomeNavigator from "./CAgentHomeNavigator";
import WeightagesAddScreen from "../screens/WeightagesAddScreen";
import NewListingButton from "../components/NewListingButton";
import routes from "./routes";
import navigation from "./rootNavigation";
import useNotifications from "../hooks/useNotifications";
import { Tab } from "expo-router";

const CAgentNavigator = () => {
  useNotifications(() => {
    navigation.navigate("Account");
  });

  return (
    <Tab>
      <Tab.Screen
        name="Feed"
        component={CAgentHomeNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="WeightagesAdd"
        component={WeightagesAddScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewListingButton
              onPress={() => navigation.navigate(routes.WEIGHTAGE_ADD)}
              iconName="plus-circle"
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

export default CAgentNavigator;
