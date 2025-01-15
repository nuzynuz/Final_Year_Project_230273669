import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import React, { useState, useEffect, useCallback } from "react";

// import AppLoading from "expo-app-loading";
import { TouchableWithoutFeedback } from "react-native";

import navigationTheme from "./navigation/navigationTheme";
import CAgentNavigator from "./navigation/CAgentNavigator";
import VAgentNavigator from "./navigation/VAgentNavigator";
import OfflineNotice from "./components/OfflineNotice";
import AuthNavigator from "./navigation/AuthNavigator";
import FarmerNavigator from "./navigation/FarmerNavigator";
import AuthContext from "./auth/context";
import authStorage from "./auth/storage";
import { navigationRef } from "./navigation/rootNavigation";
// import { useNavigationContainerRef } from "expo-router";
import {
  NavigationContainer,
  ThemeProvider,
  DefaultTheme,
} from "@react-navigation/native";
import { Navigator } from "expo-router";

import * as SplashScreen from "expo-splash-screen";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        restoreUser();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  // const NavigationContainer = useNavigationContainerRef();

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    console.log("Current logged in user:");
    console.log(user);
    if (user) setUser(user);
  };

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  // if (!isReady)
  //   return (
  //     <AppLoading
  //       startAsync={restoreUser}
  //       onFinish={() => setIsReady(true)}
  //       onError={() => console.log("ERROR=================")}
  //     />
  //   );

  // return (
  //   <View style={styles.container}>
  //     <Text>Open up App.js to start working on your app!</Text>
  //     <StatusBar style="auto" />
  //   </View>
  // );
  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      onLayout={onLayoutRootView}
    >
      <AuthContext.Provider value={{ user, setUser }}>
        {/* This value is available at all component below this provider. */}
        {/* This is working, but I temporary commented <OfflineNotice /> */}
        {/* <NavigationContainer ref={navigationRef} theme={navigationTheme}> */}
        {/* {user ? <CAgentNavigator /> : <AuthNavigator />} */}
        {/* <ThemeProvider value={DefaultTheme}> */}
        {user ? (
          <>
            {
              {
                "collecting-agent": <CAgentNavigator />,
                "verification-agent": <VAgentNavigator />,
                farmer: <FarmerNavigator />,
              }[user.role]
            }
          </>
        ) : (
          <AuthNavigator />
        )}
        {/* </NavigationContainer> */}
        {/* </ThemeProvider> */}
      </AuthContext.Provider>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
