import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { Platform } from "react-native";

function ActivityIndicator({ visible = false }) {
  if (!visible) return null;
  return (
    <View style={styles.overlay}>
      <LottieView
        autoPlay
        loop
        source={require("../assets/animations/loader.json")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: "white",
    height: "100%",
    opacity: 0.8,
    width: "100%",
    zIndex: 1, //not supported in android, solution:use elevation
    elevation: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
});

export default ActivityIndicator;
