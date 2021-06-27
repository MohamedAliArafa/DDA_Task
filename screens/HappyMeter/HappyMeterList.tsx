import React from "react";
import { useState } from "react";
import { Image, StyleSheet, View, Dimensions, FlatList } from "react-native";
import ListItem from "../../LiquidSwipe/ListItem";
import Header from "../../LiquidSwipe/Header";
import Animated, { useSharedValue, Extrapolate, interpolateNode, useCode, call } from "react-native-reanimated";
import { useSelector } from "react-redux";

const styles = StyleSheet.create({
  title1: {
    fontSize: 48,
    fontWeight: "300",
  },
  title2: {
    fontSize: 48,
    fontWeight: "600",
  },
  description: {
    opacity: 0.5,
    fontSize: 16,
  },
  visible: {
    backgroundColor: "#0000",
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-around",
    // flex: 1,
    paddingTop: 60,
  },
  hidden: {
    // backgroundColor: "#ffff",
    display: "none",
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-around",
    // flex: 1,
    paddingTop: 60,
  }
});

const { width, height } = Dimensions.get("window");


interface ContentProps {
  backgroundColor: string;
  progress: Animated.Node<number>;
}

export default ({
  backgroundColor,
  progress
}: ContentProps) => {


  const entriesState = useSelector(state => state);
  const opacity = interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const [visible, setVisibilty] = useState(false);

  useCode(() => {
    return call([opacity], (opacity) => {
      if (opacity[0] < 0.1) {
        setVisibilty(false);
      } else {
        setVisibilty(true);
      }
    })
  }, [opacity])

  const width = useSharedValue(50);

  return (
    <Animated.View
      style={{
        backgroundColor,
        ...StyleSheet.absoluteFillObject,
        justifyContent: "space-around",
        flex: 1,
        paddingTop: 60,
      }}
    >
      {visible &&
        (<View><Header />
          <FlatList data={entriesState.entries} renderItem={({ item }) => <ListItem item={item} />}></FlatList>
        </View>)}
    </Animated.View>
  );
};
