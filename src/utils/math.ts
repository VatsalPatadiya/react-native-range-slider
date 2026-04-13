/**
 * Clamps a value between a minimum and maximum.
 */
export const clamp = (value: number, min: number, max: number): number => {
  'worklet';
  return Math.min(Math.max(value, min), max);
};

/**
 * Converts a value within a range to a position in pixels.
 */
export const valueToPosition = (
  value: number,
  min: number,
  max: number,
  width: number,
  isRTL: boolean = false
): number => {
  'worklet';
  if (width === 0) return 0;
  const position = ((value - min) / (max - min)) * width;
  return isRTL ? width - position : position;
};

/**
 * Converts a position in pixels to a value within a range.
 */
export const positionToValue = (
  position: number,
  min: number,
  max: number,
  width: number,
  isRTL: boolean = false
): number => {
  'worklet';
  if (width === 0) return min;
  const normalizedPosition = isRTL ? width - position : position;
  return (normalizedPosition / width) * (max - min) + min;
};

/**
 * Snaps a value to the nearest step.
 */
export const snapToStep = (
  value: number,
  min: number,
  max: number,
  step: number
): number => {
  'worklet';
  if (step <= 0) return value;
  const steppedValue = Math.round((value - min) / step) * step + min;
  return clamp(steppedValue, min, max);
};
