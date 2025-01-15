import React from "react";
import { Stack } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CAgentHomeLayout = () => {
  return (
    <Stack screenOptions={{ presentation: "modal", headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="index" color={color} size={size} />
          ),
        }}
      />
      <Stack.Screen name="weightages" />
      <Stack.Screen name="new-advance" />
      <Stack.Screen name="advance-list" />
    </Stack>
  );
};

export default CAgentHomeLayout;
