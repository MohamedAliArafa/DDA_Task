import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";


interface ButtonProps {
  onPressEvent: any;
  backgroundColor: string;
}

export default ({
  onPressEvent,
  backgroundColor, }: ButtonProps) => {

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        padding: 32,
        backgroundColor,
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row"
      }}
    >
      <TouchableOpacity onPress={()=> onPressEvent("happy")}>
        <MaterialCommunityIcons name="emoticon-happy" color="white" size={50} />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> onPressEvent("neutral")}>
        <MaterialCommunityIcons name="emoticon-neutral" color="white" size={50} />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> onPressEvent("sad")}>
        <MaterialCommunityIcons name="emoticon-sad" color="white" size={50} />
      </TouchableOpacity>
    </View>
  );
};
