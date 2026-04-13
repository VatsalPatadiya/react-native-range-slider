import React, { useState, useCallback } from 'react';
import { StyleSheet, View, LayoutChangeEvent, I18nManager } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { RangeSliderProps } from '../types';
import { useRangeSlider } from '../hooks/useRangeSlider';
import Track from './Track';
import Thumb from './Thumb';

const RangeSlider: React.FC<RangeSliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  initialLowValue,
  initialHighValue,
  singleThumbMode = false,
  disabled = false,
  inactiveTrackColor = '#e5e7eb',
  activeTrackColor = '#3b82f6',
  thumbColor = '#ffffff',
  thumbSize = 24,
  trackHeight = 4,
  renderLabel,
  onValueChange,
  onSlidingStart,
  onSlidingComplete,
  lowThumbAccessibilityLabel = 'Lower thumb',
  highThumbAccessibilityLabel = 'Higher thumb',
  isRTL: isRTLProp,
  style,
}) => {
  const isRTL = isRTLProp ?? I18nManager.isRTL;
  const containerWidth = useSharedValue(0);
  const leftOffset = useSharedValue(0);

  const {
    lowValue,
    highValue,
    lowPosition,
    highPosition,
    updateLowValue,
    updateHighValue,
  } = useRangeSlider({
    min,
    max,
    step,
    initialLowValue: initialLowValue ?? min,
    initialHighValue: initialHighValue ?? max,
    containerWidth,
    onValueChange,
    singleThumbMode,
    isRTL,
  });

  const onLayout = useCallback(
    ({
      nativeEvent: {
        layout: { width, x },
      },
    }: LayoutChangeEvent) => {
      containerWidth.value = width - thumbSize;
      leftOffset.value = x + thumbSize / 2;
    },
    [thumbSize]
  );

  const handleUpdateLow = (absoluteX: number) => {
    'worklet';
    updateLowValue(absoluteX - leftOffset.value);
  };

  const handleUpdateHigh = (absoluteX: number) => {
    'worklet';
    updateHighValue(absoluteX - leftOffset.value);
  };

  const handleSlidingComplete = () => {
    if (onSlidingComplete) {
      onSlidingComplete(lowValue.value, highValue.value);
    }
  };

  return (
    <View
      style={[styles.container, style, { height: thumbSize }]}
      onLayout={onLayout}
    >
      <Track
        height={trackHeight}
        inactiveColor={inactiveTrackColor}
        activeColor={activeTrackColor}
        lowPosition={lowPosition}
        highPosition={highPosition}
        thumbSize={thumbSize}
        singleThumbMode={singleThumbMode}
      />
      <Thumb
        index={0}
        size={thumbSize}
        color={thumbColor}
        position={lowPosition}
        disabled={disabled}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={handleSlidingComplete}
        accessibilityLabel={lowThumbAccessibilityLabel}
        renderLabel={renderLabel}
        value={lowValue}
        updatePosition={handleUpdateLow}
      />
      {!singleThumbMode && (
        <Thumb
          index={1}
          size={thumbSize}
          color={thumbColor}
          position={highPosition}
          disabled={disabled}
          onSlidingStart={onSlidingStart}
          onSlidingComplete={handleSlidingComplete}
          accessibilityLabel={highThumbAccessibilityLabel}
          renderLabel={renderLabel}
          value={highValue}
          updatePosition={handleUpdateHigh}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    marginVertical: 10,
  },
});

export default RangeSlider;
