import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { TrackProps } from '../types';

const Track: React.FC<TrackProps> = ({
  height,
  inactiveColor,
  activeColor,
  lowPosition,
  highPosition,
  thumbSize,
}) => {
  const activeTrackStyle = useAnimatedStyle(() => {
    return {
      left: lowPosition.value,
      width: Math.max(0, highPosition.value - lowPosition.value),
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
          { backgroundColor: activeColor, height, borderRadius: height / 2 },
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
