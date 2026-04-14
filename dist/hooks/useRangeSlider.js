"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRangeSlider = void 0;
const react_native_reanimated_1 = require("react-native-reanimated");
const math_1 = require("../utils/math");
const react_1 = require("react");
const useRangeSlider = ({ min, max, step, initialLowValue, initialHighValue, lowValue, highValue, containerWidth, onValueChange, singleThumbMode, isRTL = false, }) => {
    const lowValueShared = (0, react_native_reanimated_1.useSharedValue)(lowValue ?? initialLowValue);
    const highValueShared = (0, react_native_reanimated_1.useSharedValue)(highValue ?? initialHighValue);
    (0, react_1.useEffect)(() => {
        if (lowValue !== undefined) {
            lowValueShared.value = lowValue;
        }
    }, [lowValue]);
    (0, react_1.useEffect)(() => {
        if (highValue !== undefined) {
            highValueShared.value = highValue;
        }
    }, [highValue]);
    const lowPosition = (0, react_native_reanimated_1.useDerivedValue)(() => {
        return (0, math_1.valueToPosition)(lowValueShared.value, min, max, containerWidth.value, isRTL);
    });
    const highPosition = (0, react_native_reanimated_1.useDerivedValue)(() => {
        if (singleThumbMode) {
            return (0, math_1.valueToPosition)(min, min, max, containerWidth.value, isRTL);
        }
        return (0, math_1.valueToPosition)(highValueShared.value, min, max, containerWidth.value, isRTL);
    });
    const updateLowValue = (0, react_1.useCallback)((newPosition) => {
        'worklet';
        let newValue = (0, math_1.positionToValue)(newPosition, min, max, containerWidth.value, isRTL);
        newValue = (0, math_1.snapToStep)(newValue, min, max, step);
        // Check if it crosses high thumb
        if (!singleThumbMode && newValue > highValueShared.value) {
            newValue = highValueShared.value;
        }
        if (lowValueShared.value !== newValue) {
            lowValueShared.value = newValue;
            if (onValueChange) {
                (0, react_native_reanimated_1.runOnJS)(onValueChange)(newValue, highValueShared.value);
            }
        }
    }, [min, max, step, onValueChange, singleThumbMode, isRTL]);
    const updateHighValue = (0, react_1.useCallback)((newPosition) => {
        'worklet';
        if (singleThumbMode)
            return;
        let newValue = (0, math_1.positionToValue)(newPosition, min, max, containerWidth.value, isRTL);
        newValue = (0, math_1.snapToStep)(newValue, min, max, step);
        // Check if it crosses low thumb
        if (newValue < lowValueShared.value) {
            newValue = lowValueShared.value;
        }
        if (highValueShared.value !== newValue) {
            highValueShared.value = newValue;
            if (onValueChange) {
                (0, react_native_reanimated_1.runOnJS)(onValueChange)(lowValueShared.value, newValue);
            }
        }
    }, [min, max, step, onValueChange, singleThumbMode, isRTL]);
    const lowValuePercent = (0, react_native_reanimated_1.useDerivedValue)(() => {
        return (lowValueShared.value - min) / (max - min);
    });
    const highValuePercent = (0, react_native_reanimated_1.useDerivedValue)(() => {
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
exports.useRangeSlider = useRangeSlider;
