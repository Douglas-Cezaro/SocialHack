import React, { Component } from "react";
import { View } from "react-native";
import Loading from "../../assets/loading.json";
import LottieView from "lottie-react-native";

export default () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LottieView
        style={{
          width: 100,
          height: 100,
        }}
        resizeMode="contain"
        autoPlay
        loop
        source={Loading}
      />
    </View>
  );
};
