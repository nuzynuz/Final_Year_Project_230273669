import React from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NewListingButton from "../../../components/NewListingButton";

const CAgentLayout = () => {
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
              onPress={() => navigation.navigate(`weightages-add`)}
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
        name="weightages-add"
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

export default CAgentLayout;
