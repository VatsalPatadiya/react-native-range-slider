import { SharedValue, useSharedValue, useDerivedValue, runOnJS } from 'react-native-reanimated';
import { valueToPosition, positionToValue, snapToStep, clamp } from '../utils/math';
import { useCallback, useEffect } from 'react';

interface UseRangeSliderProps {
  min: number;
  max: number;
  step: number;
  initialLowValue: number;
  initialHighValue: number;
  lowValue?: number;
  highValue?: number;
  containerWidth: SharedValue<number>;
  onValueChange?: (low: number, high: number) => void;
  singleThumbMode?: boolean;
  isRTL?: boolean;
}

export const useRangeSlider = ({
  min,
  max,
  step,
  initialLowValue,
  initialHighValue,
  lowValue,
  highValue,
  containerWidth,
  onValueChange,
  singleThumbMode,
  isRTL = false,
}: UseRangeSliderProps) => {
  const lowValueShared = useSharedValue(lowValue ?? initialLowValue);
  const highValueShared = useSharedValue(highValue ?? initialHighValue);

  useEffect(() => {
    if (lowValue !== undefined) {
      lowValueShared.value = lowValue;
    }
  }, [lowValue]);

  useEffect(() => {
    if (highValue !== undefined) {
      highValueShared.value = highValue;
    }
  }, [highValue]);

  const lowPosition = useDerivedValue(() => {
    return valueToPosition(lowValueShared.value, min, max, containerWidth.value, isRTL);
  });

  const highPosition = useDerivedValue(() => {
    if (singleThumbMode) {
      return isRTL ? 0 : containerWidth.value;
    }
    return valueToPosition(highValueShared.value, min, max, containerWidth.value, isRTL);
  });

  const updateLowValue = useCallback((newPosition: number) => {
    'worklet';
    let newValue = positionToValue(newPosition, min, max, containerWidth.value, isRTL);
    newValue = snapToStep(newValue, min, max, step);
    
    // Check if it crosses high thumb
    if (!singleThumbMode && newValue > highValueShared.value) {
      newValue = highValueShared.value;
    }
    
    if (lowValueShared.value !== newValue) {
      lowValueShared.value = newValue;
      if (onValueChange) {
        runOnJS(onValueChange)(newValue, highValueShared.value);
      }
    }
  }, [min, max, step, onValueChange, singleThumbMode, isRTL]);

  const updateHighValue = useCallback((newPosition: number) => {
    'worklet';
    if (singleThumbMode) return;

    let newValue = positionToValue(newPosition, min, max, containerWidth.value, isRTL);
    newValue = snapToStep(newValue, min, max, step);
    
    // Check if it crosses low thumb
    if (newValue < lowValueShared.value) {
      newValue = lowValueShared.value;
    }
    
    if (highValueShared.value !== newValue) {
      highValueShared.value = newValue;
      if (onValueChange) {
        runOnJS(onValueChange)(lowValueShared.value, newValue);
      }
    }
  }, [min, max, step, onValueChange, singleThumbMode, isRTL]);

  const lowValuePercent = useDerivedValue(() => {
    return (lowValueShared.value - min) / (max - min);
  });

  const highValuePercent = useDerivedValue(() => {
    return (highValueShared.value - min) / (max - min);
  });

  return {
    lowValue: lowValueShared,
    highValue: highValueShared,
    lowPosition,
    highPosition,
    lowValuePercent,
    highValuePercent,
    updateLowValue,
    updateHighValue,
  };
};
