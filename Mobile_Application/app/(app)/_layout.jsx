import React from "react";

import { Text } from "react-native";
import { Redirect, Stack } from "expo-router";

import { useSession } from "../../authContext/ctx";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  console.log("::: session ::::::::::::::");
  console.log(session);
  console.log(":::::::::::::::::::");

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/welcome" />;
  }

  // This layout can be deferred because it's not the root layout.

  return (
    <Stack screenOptions={{ presentation: "modal", headerShown: false }} />
  );
}
