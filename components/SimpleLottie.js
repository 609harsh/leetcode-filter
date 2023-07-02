import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";
import { useState } from "react";

export default function SimpleLottie() {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",

        height: "100%",
      }}
    >
      <LottieView
        source={require("../assets/loading.json")}
        style={styles.animation}
        autoPlay
      />
    </View>
  );
}
const styles = StyleSheet.create({
  animation: {
    width: 200,
    height: 200,
  },
});
