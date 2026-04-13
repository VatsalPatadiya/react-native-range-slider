import { useSharedValue, useDerivedValue, runOnJS } from 'react-native-reanimated';
import { valueToPosition, positionToValue, snapToStep, clamp } from '../utils/math';
import { useCallback } from 'react';

interface UseRangeSliderProps {
  min: number;
  max: number;
  step: number;
  initialLowValue: number;
  initialHighValue: number;
  containerWidth: any; // SharedValue<number>
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
  containerWidth,
  onValueChange,
  singleThumbMode,
  isRTL = false,
}: UseRangeSliderProps) => {
  const lowValue = useSharedValue(initialLowValue);
  const highValue = useSharedValue(initialHighValue);

  const lowPosition = useDerivedValue(() => {
    return valueToPosition(lowValue.value, min, max, containerWidth.value, isRTL);
  });

  const highPosition = useDerivedValue(() => {
    if (singleThumbMode) {
      return isRTL ? 0 : containerWidth.value;
    }
    return valueToPosition(highValue.value, min, max, containerWidth.value, isRTL);
  });

  const updateLowValue = useCallback((newPosition: number) => {
    'worklet';
    let newValue = positionToValue(newPosition, min, max, containerWidth.value, isRTL);
    newValue = snapToStep(newValue, min, max, step);
    
    // Check if it crosses high thumb
    if (!singleThumbMode && newValue > highValue.value) {
      newValue = highValue.value;
    }
    
    if (lowValue.value !== newValue) {
      lowValue.value = newValue;
      if (onValueChange) {
        runOnJS(onValueChange)(newValue, highValue.value);
      }
    }
  }, [min, max, step, onValueChange, singleThumbMode, isRTL]);

  const updateHighValue = useCallback((newPosition: number) => {
    'worklet';
    if (singleThumbMode) return;

    let newValue = positionToValue(newPosition, min, max, containerWidth.value, isRTL);
    newValue = snapToStep(newValue, min, max, step);
    
    // Check if it crosses low thumb
    if (newValue < lowValue.value) {
      newValue = lowValue.value;
    }
    
    if (highValue.value !== newValue) {
      highValue.value = newValue;
      if (onValueChange) {
        runOnJS(onValueChange)(lowValue.value, newValue);
      }
    }
  }, [min, max, step, onValueChange, singleThumbMode, isRTL]);

  return {
    lowValue,
    highValue,
    lowPosition,
    highPosition,
    updateLowValue,
    updateHighValue,
  };
};
