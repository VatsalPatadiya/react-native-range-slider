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
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const Track = ({ height, inactiveColor, activeColor, lowPosition, highPosition, thumbSize, activeTrackColorStops, enableColorStops, lowValuePercent, highValuePercent, colorStopReference = 'low', activeStyle, inactiveStyle, containerStyle, }) => {
    const activeTrackStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        let finalActiveColor = activeColor;
        if (enableColorStops && activeTrackColorStops && activeTrackColorStops.length >= 2) {
            let referenceValue = lowValuePercent.value;
            if (colorStopReference === 'high') {
                referenceValue = highValuePercent.value;
            }
            else if (colorStopReference === 'center') {
                referenceValue = (lowValuePercent.value + highValuePercent.value) / 2;
            }
            const inputRange = activeTrackColorStops.map((s) => s.percent / 100);
            const outputRange = activeTrackColorStops.map((s) => s.color);
            // Validate that all colors are defined and we have at least 2 stops
            const validStops = inputRange.length >= 2 && outputRange.every(c => c !== undefined);
            if (validStops) {
                finalActiveColor = (0, react_native_reanimated_1.interpolateColor)(referenceValue, inputRange, outputRange);
            }
        }
        return {
            left: Math.min(lowPosition.value, highPosition.value) + thumbSize / 2,
            width: Math.abs(highPosition.value - lowPosition.value),
            backgroundColor: finalActiveColor,
        };
    });
    return (<react_native_1.View style={[styles.container, { height }, containerStyle]}>
      <react_native_1.View style={[
            styles.inactiveTrack,
            {
                backgroundColor: inactiveColor,
                height,
                borderRadius: height / 2,
                left: thumbSize / 2,
                right: thumbSize / 2,
            },
            inactiveStyle,
        ]}/>
      <react_native_reanimated_1.default.View style={[
            styles.activeTrack,
            { height, borderRadius: height / 2 },
            activeTrackStyle,
            activeStyle,
        ]}/>
    </react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        position: 'absolute',
    },
    inactiveTrack: {
        position: 'absolute',
    },
    activeTrack: {
        position: 'absolute',
    },
});
exports.default = Track;
