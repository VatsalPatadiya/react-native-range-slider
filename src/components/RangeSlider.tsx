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
  lowValue,
  highValue,
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
  showTooltip = false,
  tooltipColor,
  tooltipTextColor,
  tooltipFontSize,
  tooltipStyle,
  tooltipTextStyle,
  alwaysShowTooltip = false,
  activeTrackColorStops,
  enableColorStops,
  colorStopReference,
  style,
}) => {
  const isRTL = isRTLProp ?? I18nManager.isRTL;
  const containerWidth = useSharedValue(0);
  const leftOffset = useSharedValue(0);
  const lowZIndex = useSharedValue(1);
  const highZIndex = useSharedValue(1);

  const {
    lowValue: lowValueShared,
    highValue: highValueShared,
    lowPosition,
    highPosition,
    lowValuePercent,
    highValuePercent,
    updateLowValue,
    updateHighValue,
  } = useRangeSlider({
    min,
    max,
    step,
    initialLowValue: initialLowValue ?? min,
    initialHighValue: initialHighValue ?? max,
    lowValue,
    highValue,
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
    lowZIndex.value = 2;
    highZIndex.value = 1;
    updateLowValue(absoluteX - leftOffset.value);
  };

  const handleUpdateHigh = (absoluteX: number) => {
    'worklet';
    lowZIndex.value = 1;
    highZIndex.value = 2;
    updateHighValue(absoluteX - leftOffset.value);
  };

  const handleSlidingStart = (index: 0 | 1) => {
    if (index === 0) {
      lowZIndex.value = 2;
      highZIndex.value = 1;
    } else {
      lowZIndex.value = 1;
      highZIndex.value = 2;
    }
    if (onSlidingStart) {
      onSlidingStart();
    }
  };

  const handleSlidingComplete = () => {
    if (onSlidingComplete) {
      onSlidingComplete(lowValueShared.value, highValueShared.value);
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
        activeTrackColorStops={activeTrackColorStops}
        enableColorStops={enableColorStops}
        lowValuePercent={lowValuePercent}
        highValuePercent={highValuePercent}
        colorStopReference={colorStopReference}
      />
      <Thumb
        index={0}
        size={thumbSize}
        color={thumbColor}
        position={lowPosition}
        disabled={disabled}
        onSlidingStart={() => handleSlidingStart(0)}
        onSlidingComplete={handleSlidingComplete}
        accessibilityLabel={lowThumbAccessibilityLabel}
        renderLabel={renderLabel}
        value={lowValueShared}
        updatePosition={handleUpdateLow}
        zIndex={lowZIndex}
        showTooltip={showTooltip}
        tooltipColor={tooltipColor}
        tooltipTextColor={tooltipTextColor}
        tooltipFontSize={tooltipFontSize}
        tooltipStyle={tooltipStyle}
        tooltipTextStyle={tooltipTextStyle}
        alwaysShowTooltip={alwaysShowTooltip}
      />
      {!singleThumbMode && (
        <Thumb
          index={1}
          size={thumbSize}
          color={thumbColor}
          position={highPosition}
          disabled={disabled}
          onSlidingStart={() => handleSlidingStart(1)}
          onSlidingComplete={handleSlidingComplete}
          accessibilityLabel={highThumbAccessibilityLabel}
          renderLabel={renderLabel}
          value={highValueShared}
          updatePosition={handleUpdateHigh}
          zIndex={highZIndex}
          showTooltip={showTooltip}
          tooltipColor={tooltipColor}
          tooltipTextColor={tooltipTextColor}
          tooltipFontSize={tooltipFontSize}
          tooltipStyle={tooltipStyle}
          tooltipTextStyle={tooltipTextStyle}
          alwaysShowTooltip={alwaysShowTooltip}
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
