import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNetInfo } from "@react-native-community/netinfo";

function OfflineNotice(props) {
  const netInfo = useNetInfo();

  if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
    return (
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="network-strength-4-alert"
          size={24}
          color={colors.white}
        />
        <AppText style={styles.text}>No Internet Connection</AppText>
      </View>
    );

  return null;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    height: 50,
    justifyContent: "center",
    width: "100%",
    position: "absolute",
    top: Constants.statusBarHeight,
    zIndex: 1, //not supported in android, solution:use elevation
    elevation: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  text: {
    color: colors.white,
    left: 10,
  },
});

export default OfflineNotice;
