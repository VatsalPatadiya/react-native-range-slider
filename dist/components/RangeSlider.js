"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = require("react-native-reanimated");
const useRangeSlider_1 = require("../hooks/useRangeSlider");
const Track_1 = __importDefault(require("./Track"));
const Thumb_1 = __importDefault(require("./Thumb"));
const RangeSlider = ({ min = 0, max = 100, step = 1, initialLowValue, initialHighValue, lowValue, highValue, singleThumbMode = false, disabled = false, inactiveTrackColor = '#e5e7eb', activeTrackColor = '#3b82f6', thumbColor = '#ffffff', thumbSize = 24, trackHeight = 4, renderLabel, onValueChange, onSlidingStart, onSlidingComplete, lowThumbAccessibilityLabel = 'Lower thumb', highThumbAccessibilityLabel = 'Higher thumb', isRTL: isRTLProp, showTooltip = false, tooltipColor, tooltipTextColor, tooltipFontSize, tooltipStyle, tooltipTextStyle, alwaysShowTooltip = false, activeTrackColorStops, enableColorStops, colorStopReference, style, thumbStyle, activeTrackStyle, inactiveTrackStyle, trackContainerStyle, tooltipInnerStyle, tooltipPointerStyle, thumbInnerStyle, labelContainerStyle, renderTooltip, }) => {
    const isRTL = isRTLProp ?? react_native_1.I18nManager.isRTL;
    const containerWidth = (0, react_native_reanimated_1.useSharedValue)(0);
    const leftOffset = (0, react_native_reanimated_1.useSharedValue)(0);
    const lowZIndex = (0, react_native_reanimated_1.useSharedValue)(1);
    const highZIndex = (0, react_native_reanimated_1.useSharedValue)(1);
    const { lowValue: lowValueShared, highValue: highValueShared, lowPosition, highPosition, lowValuePercent, highValuePercent, updateLowValue, updateHighValue, } = (0, useRangeSlider_1.useRangeSlider)({
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
    const onLayout = (0, react_1.useCallback)(({ nativeEvent: { layout: { width, x }, }, }) => {
        containerWidth.value = width - thumbSize;
        leftOffset.value = x;
    }, [thumbSize]);
    const handleUpdateLow = (absoluteX) => {
        'worklet';
        lowZIndex.value = 2;
        highZIndex.value = 1;
        updateLowValue(absoluteX - leftOffset.value - thumbSize / 2);
    };
    const handleUpdateHigh = (absoluteX) => {
        'worklet';
        lowZIndex.value = 1;
        highZIndex.value = 2;
        updateHighValue(absoluteX - leftOffset.value - thumbSize / 2);
    };
    const handleSlidingStart = (index) => {
        if (index === 0) {
            lowZIndex.value = 2;
            highZIndex.value = 1;
        }
        else {
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
    return (<react_native_1.View style={[styles.container, style, { height: thumbSize }]} onLayout={onLayout}>
      <Track_1.default height={trackHeight} inactiveColor={inactiveTrackColor} activeColor={activeTrackColor} lowPosition={lowPosition} highPosition={highPosition} thumbSize={thumbSize} singleThumbMode={singleThumbMode} activeTrackColorStops={activeTrackColorStops} enableColorStops={enableColorStops} lowValuePercent={lowValuePercent} highValuePercent={highValuePercent} colorStopReference={colorStopReference} activeStyle={activeTrackStyle} inactiveStyle={inactiveTrackStyle} containerStyle={trackContainerStyle}/>
      <Thumb_1.default index={0} size={thumbSize} color={thumbColor} position={lowPosition} disabled={disabled} onSlidingStart={() => handleSlidingStart(0)} onSlidingComplete={handleSlidingComplete} accessibilityLabel={lowThumbAccessibilityLabel} renderLabel={renderLabel} value={lowValueShared} updatePosition={handleUpdateLow} zIndex={lowZIndex} showTooltip={showTooltip} tooltipColor={tooltipColor} tooltipTextColor={tooltipTextColor} tooltipFontSize={tooltipFontSize} tooltipStyle={tooltipStyle} tooltipTextStyle={tooltipTextStyle} alwaysShowTooltip={alwaysShowTooltip} renderTooltip={renderTooltip} customStyle={thumbStyle} tooltipInnerStyle={tooltipInnerStyle} tooltipPointerStyle={tooltipPointerStyle} innerThumbStyle={thumbInnerStyle} labelContainerStyle={labelContainerStyle}/>
      {!singleThumbMode && (<Thumb_1.default index={1} size={thumbSize} color={thumbColor} position={highPosition} disabled={disabled} onSlidingStart={() => handleSlidingStart(1)} onSlidingComplete={handleSlidingComplete} accessibilityLabel={highThumbAccessibilityLabel} renderLabel={renderLabel} value={highValueShared} updatePosition={handleUpdateHigh} zIndex={highZIndex} showTooltip={showTooltip} tooltipColor={tooltipColor} tooltipTextColor={tooltipTextColor} tooltipFontSize={tooltipFontSize} tooltipStyle={tooltipStyle} tooltipTextStyle={tooltipTextStyle} alwaysShowTooltip={alwaysShowTooltip} renderTooltip={renderTooltip} customStyle={thumbStyle} tooltipInnerStyle={tooltipInnerStyle} tooltipPointerStyle={tooltipPointerStyle} innerThumbStyle={thumbInnerStyle} labelContainerStyle={labelContainerStyle}/>)}
    </react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        marginVertical: 10,
        overflow: 'visible',
    },
});
exports.default = RangeSlider;
