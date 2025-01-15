import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";
import FeedNavigator from "./CAgentHomeNavigator";
import WeightagesAddScreen from "../screens/WeightagesAddScreen";
import NewListingButton from "../components/NewListingButton";
import routes from "./routes";
import navigation from "./rootNavigation";
import useNotifications from "../hooks/useNotifications";
import FarmerHomeScreen from "../screens/FarmerHomeScreen";
import FarmerHomeNavigator from "./FarmerHomeNavigator";
import { Tab } from "expo-router";

const FarmerNavigator = () => {
  useNotifications(() => {
    navigation.navigate("Account");
  });

  return (
    <Tab>
      <Tab.Screen
        name="Feed"
        component={FarmerHomeNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="advanceScreen2"
        component={WeightagesAddScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewListingButton
              onPress={() => navigation.navigate(routes.WEIGHTAGES)}
              iconName="scale-balance"
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
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

export default FarmerNavigator;
