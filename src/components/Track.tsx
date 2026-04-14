import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, interpolateColor } from 'react-native-reanimated';
import { TrackProps } from '../types';

const Track: React.FC<TrackProps> = ({
  height,
  inactiveColor,
  activeColor,
  lowPosition,
  highPosition,
  thumbSize,
  activeTrackColorStops,
  enableColorStops,
  lowValuePercent,
  highValuePercent,
  colorStopReference = 'low',
  activeStyle,
  inactiveStyle,
  containerStyle,
}) => {
  const activeTrackStyle = useAnimatedStyle(() => {
    let finalActiveColor = activeColor;
    if (enableColorStops && activeTrackColorStops && activeTrackColorStops.length >= 2) {
      let referenceValue = lowValuePercent.value;
      if (colorStopReference === 'high') {
        referenceValue = highValuePercent.value;
      } else if (colorStopReference === 'center') {
        referenceValue = (lowValuePercent.value + highValuePercent.value) / 2;
      }

      const inputRange = activeTrackColorStops.map((s) => s.percent / 100);
      const outputRange = activeTrackColorStops.map((s) => s.color);

      // Validate that all colors are defined and we have at least 2 stops
      const validStops = inputRange.length >= 2 && outputRange.every(c => c !== undefined);

      if (validStops) {
        finalActiveColor = interpolateColor(
          referenceValue,
          inputRange,
          outputRange as string[]
        );
      }
    }

    return {
      left: Math.min(lowPosition.value, highPosition.value) + thumbSize / 2,
      width: Math.abs(highPosition.value - lowPosition.value),
      backgroundColor: finalActiveColor,
    };
  });

  return (
    <View style={[styles.container, { height }, containerStyle]}>
      <View
        style={[
          styles.inactiveTrack,
          { 
            backgroundColor: inactiveColor, 
            height, 
            borderRadius: height / 2,
            left: thumbSize / 2,
            right: thumbSize / 2,
          },
          inactiveStyle,
        ]}
      />
      <Animated.View
        style={[
          styles.activeTrack,
          { height, borderRadius: height / 2 },
          activeTrackStyle,
          activeStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
  },
  inactiveTrack: {
    position: 'absolute',
  },
  activeTrack: {
    position: 'absolute',
  },
});

export default Track;
