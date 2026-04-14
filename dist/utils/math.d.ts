/**
 * Clamps a value between a minimum and maximum.
 */
export declare const clamp: (value: number, min: number, max: number) => number;
/**
 * Converts a value within a range to a position in pixels.
 */
export declare const valueToPosition: (value: number, min: number, max: number, width: number, isRTL?: boolean) => number;
/**
 * Converts a position in pixels to a value within a range.
 */
export declare const positionToValue: (position: number, min: number, max: number, width: number, isRTL?: boolean) => number;
/**
 * Snaps a value to the nearest step.
 */
export declare const snapToStep: (value: number, min: number, max: number, step: number) => number;
