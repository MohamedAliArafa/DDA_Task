import React from "react";
import { Dimensions, GestureResponderEvent, I18nManager, Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { Feather, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";


const { sub, interpolateNode, Extrapolate } = Animated;
const { width } = Dimensions.get("window");
const size = 50;

interface ButtonProps {
  progress: Animated.Node<number>;
  y: Animated.Node<number>;
}

export default ({ progress, y }: ButtonProps) => {
  const translateX = interpolateNode(progress, {
    inputRange: [0, 0.4],
    outputRange: [width - size, 0],
  });
  const translateY = sub(y, size / 2);
  const opacity = interpolateNode(progress, {
    inputRange: [0, 0.1],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  return (

    <Animated.View
      style={
        I18nManager.isRTL?
        {
        position: "absolute",
        top: 0,
        right: 0,
        width: size,
        height: size,
        borderRadius: size / 2,
        justifyContent: "center",
        alignItems: "center",
        transform: [{ translateX }, { translateY }],
        opacity,
      }:{
        position: "absolute",
        top: 0,
        left: 0,
        width: size,
        height: size,
        borderRadius: size / 2,
        justifyContent: "center",
        alignItems: "center",
        transform: [{ translateX }, { translateY }],
        opacity,
      }
    }
    >
      <TouchableOpacity>
        <MaterialCommunityIcons name="emoticon-happy" color="white" size={30} />
      </TouchableOpacity>
    </Animated.View>
  );
};
