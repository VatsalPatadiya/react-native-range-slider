import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useAnimatedProps,
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withTiming,
  withSpring,
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
  zIndex,
  showTooltip,
  tooltipColor = '#3b82f6',
  tooltipTextColor = '#ffffff',
  tooltipFontSize = 12,
  tooltipStyle,
  tooltipTextStyle,
  alwaysShowTooltip = false,
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

  const tooltipVisible = useDerivedValue(() => {
    return alwaysShowTooltip || isDragging.value;
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      zIndex: zIndex ? zIndex.value : 1,
      transform: [
        { translateX: position.value - size / 2 },
        { scale: withSpring(isDragging.value ? 1.15 : 1) },
      ],
    };
  });

  const tooltipAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(tooltipVisible.value ? 1 : 0, { duration: 200 }),
      transform: [
        { translateY: withTiming(tooltipVisible.value ? -size - 10 : -size, { duration: 200 }) },
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
        {showTooltip && (
          <Animated.View style={[styles.tooltipContainer, tooltipAnimatedStyle, tooltipStyle]}>
            <View style={[styles.tooltip, { backgroundColor: tooltipColor }]}>
              <Animated.Text style={[styles.tooltipText, { color: tooltipTextColor, fontSize: tooltipFontSize }, tooltipTextStyle]}>
                {Math.round(value.value)}
              </Animated.Text>
            </View>
            <View style={[styles.tooltipPointer, { borderTopColor: tooltipColor }]} />
          </Animated.View>
        )}
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
  tooltipContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  tooltip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 32,
  },
  tooltipText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tooltipPointer: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});

export default Thumb;
