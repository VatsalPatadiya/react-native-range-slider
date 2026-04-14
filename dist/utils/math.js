"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snapToStep = exports.positionToValue = exports.valueToPosition = exports.clamp = void 0;
/**
 * Clamps a value between a minimum and maximum.
 */
const clamp = (value, min, max) => {
    'worklet';
    return Math.min(Math.max(value, min), max);
};
exports.clamp = clamp;
/**
 * Converts a value within a range to a position in pixels.
 */
const valueToPosition = (value, min, max, width, isRTL = false) => {
    'worklet';
    if (width === 0)
        return 0;
    const position = ((value - min) / (max - min)) * width;
    return isRTL ? width - position : position;
};
exports.valueToPosition = valueToPosition;
/**
 * Converts a position in pixels to a value within a range.
 */
const positionToValue = (position, min, max, width, isRTL = false) => {
    'worklet';
    if (width === 0)
        return min;
    const normalizedPosition = isRTL ? width - position : position;
    return (normalizedPosition / width) * (max - min) + min;
};
exports.positionToValue = positionToValue;
/**
 * Snaps a value to the nearest step.
 */
const snapToStep = (value, min, max, step) => {
    'worklet';
    if (step <= 0)
        return value;
    const steppedValue = Math.round((value - min) / step) * step + min;
    return (0, exports.clamp)(steppedValue, min, max);
};
exports.snapToStep = snapToStep;
