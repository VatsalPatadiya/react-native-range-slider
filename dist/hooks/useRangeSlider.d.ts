import { SharedValue } from 'react-native-reanimated';
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
export declare const useRangeSlider: ({ min, max, step, initialLowValue, initialHighValue, lowValue, highValue, containerWidth, onValueChange, singleThumbMode, isRTL, }: UseRangeSliderProps) => {
    lowValue: SharedValue<number>;
    highValue: SharedValue<number>;
    lowPosition: import("react-native-reanimated").DerivedValue<number>;
    highPosition: import("react-native-reanimated").DerivedValue<number>;
    lowValuePercent: import("react-native-reanimated").DerivedValue<number>;
    highValuePercent: import("react-native-reanimated").DerivedValue<number>;
    updateLowValue: (newPosition: number) => void;
    updateHighValue: (newPosition: number) => void;
};
export {};
