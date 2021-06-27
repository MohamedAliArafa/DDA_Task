import React, { useCallback, useEffect, useState } from "react";
import { Alert, Dimensions, StyleSheet, View } from "react-native";
import Animated, { Value, cond, multiply, divide, interpolateNode, useCode, call, Easing, block, timing, stopClock, startClock, Clock, set, lessOrEq, greaterOrEq, eq } from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { onGestureEvent, opacity, snapPoint } from "react-native-redash";
import Weave from "../../LiquidSwipe/Weave";
import { followPointer, snapProgress } from "../../LiquidSwipe/AnimationHelpers";
import { initialSideWidth, initialWaveCenter, sideWidth, waveHorRadius, waveHorRadiusBack, waveVertRadius } from "../../LiquidSwipe/WeaveHelpers";
import HappyMeterList from "./HappyMeterList";
import HappyMeterInputPage from "./HappyMeterInputPage";
import Button from "../../LiquidSwipe/Button";
import { useDispatch } from "react-redux";

const { width, height } = Dimensions.get("window");

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
const x = new Value(0);
const translationX = new Value(0);
const velocityX = new Value(0);
const state = new Value(State.UNDETERMINED);

const gestureHandler = onGestureEvent({
  translationX,
  velocityX,
  y,
  state,
})

// isBack is responsible for detrmining the direction of the curves and guesture animation start
const gestureProgress =
  cond(
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


const progressPoint = new Value(0);
const enableGesture = new Value(1);
// Progress Tracking for Showing Hiding items on Thresholds 
const progress = followPointer(progressPoint);



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

  // Update The visiblety of the Elemnts based on progress 
  useCode(() => {
    return call([progress], (values) => {
      if (values[0] != 1) {
        setVisibilty(true);
      } else {
        setVisibilty(false);
      }
    })
  }, [progress])

  // useEffect(() => {
  //   if (visible) {
  //     progressPoint.setValue(1);
  //   } else {
  //     progressPoint.setValue(0);
  //   }
  // }, [visible]);

  return (
    <View style={styles.container}>

      {/* Original Emoji Page shown on swipe */}
      <HappyMeterInputPage
        backgroundColor="#4d1168"
        onPressEvent={(name: String) => {}}
      />

      {/* Masked Component */}
      <PanGestureHandler {...gestureHandler}
        hitSlop={(isBack) ? { right: 0, width: maxDist * 0.5 } : { left: 0, width: 48 }}
      //  hitSlop={{ right: 0, width: 48 }} 
      // failOffsetX={[-1000, 5000]}
      >
        <Animated.View style={StyleSheet.absoluteFill} >
          <View style={StyleSheet.absoluteFill}>
            {/* The Wave Animation Component (SVG Mask) */}
            <Weave sideWidth={sWidth} {...{ centerY, horRadius, vertRadius }}>
              {/* Show When no progress */}
              {visible &&
                <HappyMeterList
                  backgroundColor="#274472"
                  progress={progress}
                />
              }
              {/* Show maked emoji page for guesture bug work arounf TODO <Fix> */}
              {!visible &&
                <PanGestureHandler {...gestureHandler}
                  hitSlop={{ left: 0, width: 48 }}
                //  hitSlop={{ right: 0, width: 48 }} 
                // failOffsetX={[-1000, 5000]}
                >
                  <Animated.View style={StyleSheet.absoluteFill} >
                    <View style={StyleSheet.absoluteFill}>
                      {/* The Wave Animation Component (SVG Mask) */}
                      <Weave sideWidth={sWidth} {...{ centerY, horRadius, vertRadius }}>
                        <HappyMeterInputPage
                          backgroundColor="#4d1168"
                          onPressEvent={(name: String) => {
                            dispatch({
                              type: "ADD_ITEM",
                              text: name
                            })
                            // isBack.setValue(0);
                            progressPoint.setValue(0);
                          }}
                        />
                      </Weave>
                    </View>
                  </Animated.View>
                </PanGestureHandler>
              }
            </Weave>
            <Button y={centerY} icon={"emoticon-happy"} {...{ progress }} onButtonPressed={() => {
              progressPoint.setValue(1);
            }} />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
