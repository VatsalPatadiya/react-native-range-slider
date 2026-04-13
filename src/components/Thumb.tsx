import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useAnimatedProps,
  runOnJS,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { ThumbProps } from '../types';

const Thumb: React.FC<ThumbProps> = ({
  size,
  color,
  position,
  disabled,
  onSlidingStart,
  onSlidingComplete,
  accessibilityLabel,
  renderLabel,
  value,
  updatePosition, // This will be passed from RangeSlider
}) => {
  const isDragging = useSharedValue(false);

  const panGesture = Gesture.Pan()
    .enabled(!disabled)
    .onStart(() => {
      isDragging.value = true;
      if (onSlidingStart) {
        runOnJS(onSlidingStart)();
      }
    })
    .onUpdate((event) => {
      'worklet';
      updatePosition(event.absoluteX);
    })
    .onEnd(() => {
      isDragging.value = false;
      if (onSlidingComplete) {
        runOnJS(onSlidingComplete)();
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: position.value - size / 2 },
        { scale: isDragging.value ? 1.1 : 1 },
      ],
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          styles.thumbContainer,
          { width: size, height: size },
          animatedStyle,
        ]}
        accessibilityRole="adjustable"
        accessibilityLabel={accessibilityLabel}
        accessibilityValue={{
          now: value.value,
        }}
      >
        <View
          style={[
            styles.thumb,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: color,
            },
            styles.shadow,
          ]}
        />
        {renderLabel && (
          <View style={styles.labelContainer}>
            {renderLabel(value.value)}
          </View>
        )}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  thumbContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumb: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  labelContainer: {
    position: 'absolute',
    top: -30,
    alignItems: 'center',
    width: 60,
  },
});

export default Thumb;
