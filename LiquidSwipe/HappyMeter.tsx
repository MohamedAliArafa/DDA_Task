import React from "react";
import Animated from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";


const size = 50;

export default () => {
  return (

    <Animated.View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: size,
        height: size,
        borderRadius: size / 2,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
      }}
    >
    <TouchableOpacity>
      <MaterialCommunityIcons name="emoticon-happy" color="white" size={30} />
    </TouchableOpacity>
      <TouchableOpacity>
        <MaterialCommunityIcons name="emoticon-neutral" color="white" size={30} />
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialCommunityIcons name="emoticon-sad" color="white" size={30} />
      </TouchableOpacity>
    </Animated.View>
  );
};
