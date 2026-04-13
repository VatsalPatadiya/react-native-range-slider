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
}) => {
  const activeTrackStyle = useAnimatedStyle(() => {
    let finalActiveColor = activeColor;
    if (enableColorStops !== false && activeTrackColorStops && activeTrackColorStops.length >= 2) {
      let referenceValue = lowValuePercent.value;
      if (colorStopReference === 'high') {
        referenceValue = highValuePercent.value;
      } else if (colorStopReference === 'center') {
        referenceValue = (lowValuePercent.value + highValuePercent.value) / 2;
      }

      finalActiveColor = interpolateColor(
        referenceValue,
        activeTrackColorStops.map((s) => s.percent / 100),
        activeTrackColorStops.map((s) => s.color)
      );
    }

    return {
      left: lowPosition.value,
      width: Math.max(0, highPosition.value - lowPosition.value),
      backgroundColor: finalActiveColor,
    };
  });

  return (
    <View style={[styles.container, { height, marginHorizontal: thumbSize / 2 }]}>
      <View
        style={[
          styles.inactiveTrack,
          { backgroundColor: inactiveColor, height, borderRadius: height / 2 },
        ]}
      />
      <Animated.View
        style={[
          styles.activeTrack,
          { height, borderRadius: height / 2 },
          activeTrackStyle,
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
    width: '100%',
    position: 'absolute',
  },
  activeTrack: {
    position: 'absolute',
  },
});

export default Track;
