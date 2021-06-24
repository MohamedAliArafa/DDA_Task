import React, { useState } from "react";
import { Alert, Dimensions, StyleSheet, View } from "react-native";
import Animated, { Value, cond, multiply, divide, interpolateNode, useCode, call, Easing, block, timing, stopClock, startClock, Clock } from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { onGestureEvent, snapPoint } from "react-native-redash";
import Weave from "../../LiquidSwipe/Weave";
import { followPointer, snapProgress } from "../../LiquidSwipe/AnimationHelpers";
import { initialSideWidth, initialWaveCenter, sideWidth, waveHorRadius, waveHorRadiusBack, waveVertRadius } from "../../LiquidSwipe/WeaveHelpers";
import Content from "./HappyMeterList";
import ContentBack from "./HappyMeterInputPage";
import Button from "../../LiquidSwipe/Button";
import { useDispatch } from "react-redux";

const { width } = Dimensions.get("window");

// Create StyleSheets
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// Initial Values for Animation
const maxDist = width - initialSideWidth;
const isBack = new Value(0);
const y = new Value(initialWaveCenter);
const translationX = new Value(0);
const velocityX = new Value(0);
const state = new Value(State.UNDETERMINED);
const gestureHandler = onGestureEvent({
  translationX,
  velocityX,
  y,
  state,
});

// isBack is responsible for detrmining the direction of the curves and guesture animation start
const gestureProgress = cond(
  isBack,
  interpolateNode(translationX, {
    inputRange: [0, maxDist],
    outputRange: [1, 0],
  }),
  interpolateNode(translationX, {
    inputRange: [-maxDist, 0],
    // 0.4 the end value is to 
    outputRange: [0.4, 0],
  })
);

// Progress Tracking for Showing Hiding items on Thresholds 
let progress = snapProgress(
  gestureProgress,
  state,
  isBack,
  snapPoint(
    gestureProgress,
    divide(
      multiply(-1, velocityX),
      cond(isBack, maxDist, multiply(maxDist, 0.4))
    ),
    [0, 1]
  )
);

// The Initial Curve to follow the finger tapping
const centerY = followPointer(y);

const horRadius = cond(
  isBack,
  waveHorRadiusBack(progress),
  waveHorRadius(progress)
);
const vertRadius = waveVertRadius(progress);
let sWidth = sideWidth(progress);

export default () => {

  const [visible, setVisibilty] = useState(false);
  const dispatch = useDispatch();

  // const runProgressBack = (clock) => {
  //   const state = {
  //     finished: new Value(0),
  //     position: new Value(0),
  //     time: new Value(0),
  //     frameTime: new Value(0),
  //   };
  
  //   const config = {
  //     duration: 300,
  //     toValue: new Value(-1),
  //     easing: Easing.inOut(Easing.ease),
  //   };

  //   return block([
  //     startClock(clock),
  //     timing(clock, state, config),
  //     cond(state.finished, stopClock(clock)),
  //   ]);
  // }

  // progress = runProgressBack(new Clock());

  // Update The visiblety of the Elemnts based on progress 
  useCode(() => {
    return call([progress], (progress) => {
      setVisibilty((value) => {
        if (progress[0] < 0.99) {
          return true
        } else {
          return false
        }
      });
    })
  }, [progress])


  return (
    <View style={styles.container}>

      {/* Original Emoji Page shown on swipe */}
      <ContentBack
        backgroundColor="#4d1168"
        onPressEvent={(name) => {          
      {/* Unsuccesfull attempt to animated back  TODO <Implement Animated Back> */}
          // Animated.spring(translationX,
          //   {
          //     toValue: 0,
          //     damping: 15,
          //     mass: 1,
          //     stiffness: 150,
          //     overshootClamping: false,
          //     restSpeedThreshold: 0.001,
          //     restDisplacementThreshold: 0.001,
          //   }
          // ).start()

          // Redux Dispatched for adding item on user interaction
          dispatch({
            type: "ADD_ITEM",
            text: name
          })
          // sWidth= new Value(0);
        }}
      />

      {/* Masked Component */}
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <View style={StyleSheet.absoluteFill}>
            {/* The Wave Animation Component (SVG Mask) */}
            <Weave sideWidth={sWidth} {...{ centerY, horRadius, vertRadius }}>
              {/* Show When no progress */}
              {visible &&
                <Content
                  backgroundColor="#274472"
                  progress={progress}
                />
              }
              {/* Show maked emoji page for guesture bug work arounf TODO <Fix> */}
              {!visible &&
                <ContentBack
                  backgroundColor="#4d1168"
                  onPressEvent={(name) => {
                    dispatch({
                      type: "ADD_ITEM",
                      text: name
                    })
                    // sWidth= new Value(0);
                  }}
                />
              }
            </Weave>
            <Button y={centerY} {...{ progress }} />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
