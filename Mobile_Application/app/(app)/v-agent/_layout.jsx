import React from "react";
import { Tabs, router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NewListingButton from "../../../components/NewListingButton";

const VAgentLayout = () => {
  return (
    <Tabs screenOptions={{ presentation: "modal", headerShown: false }}>
      <Tabs.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),

          headerShown: false,
        }}
        name="home"
      />
      <Tabs.Screen
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewListingButton
              onPress={() => {
                navigation.navigate(`verify`);
              }}
              iconName="truck-check"
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="scale-balance"
              color={color}
              size={size}
            />
          ),
          headerShown: false,
        })}
        name="verify"
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerShown: false,
        }}
        name="account"
      />
    </Tabs>
  );
};

export default VAgentLayout;
