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
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const Thumb = ({ size, color, position, disabled, onSlidingStart, onSlidingComplete, accessibilityLabel, renderLabel, value, updatePosition, // This will be passed from RangeSlider
zIndex, showTooltip, tooltipColor = '#3b82f6', tooltipTextColor = '#ffffff', tooltipFontSize = 12, tooltipStyle, tooltipTextStyle, alwaysShowTooltip = false, renderTooltip, customStyle, tooltipInnerStyle, tooltipPointerStyle, innerThumbStyle, labelContainerStyle, }) => {
    const isDragging = (0, react_native_reanimated_1.useSharedValue)(false);
    const panGesture = react_native_gesture_handler_1.Gesture.Pan()
        .enabled(!disabled)
        .onStart(() => {
        isDragging.value = true;
        if (onSlidingStart) {
            (0, react_native_reanimated_1.runOnJS)(onSlidingStart)();
        }
    })
        .onUpdate((event) => {
        'worklet';
        updatePosition(event.absoluteX);
    })
        .onEnd(() => {
        isDragging.value = false;
        if (onSlidingComplete) {
            (0, react_native_reanimated_1.runOnJS)(onSlidingComplete)();
        }
    });
    const tooltipVisible = (0, react_native_reanimated_1.useDerivedValue)(() => {
        return alwaysShowTooltip || isDragging.value;
    });
    const animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        return {
            zIndex: zIndex ? zIndex.value : 1,
            transform: [
                { translateX: position.value },
                { scale: (0, react_native_reanimated_1.withSpring)(isDragging.value ? 1.15 : 1) },
            ],
        };
    });
    const tooltipAnimatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        return {
            opacity: (0, react_native_reanimated_1.withTiming)(tooltipVisible.value ? 1 : 0, { duration: 200 }),
            transform: [
                { translateY: (0, react_native_reanimated_1.withTiming)(tooltipVisible.value ? -size - 10 : -size, { duration: 200 }) },
            ],
        };
    });
    return (<react_native_gesture_handler_1.GestureDetector gesture={panGesture}>
      <react_native_reanimated_1.default.View style={[
            styles.thumbContainer,
            { width: size, height: size },
            animatedStyle,
            customStyle,
        ]} accessibilityRole="adjustable" accessibilityLabel={accessibilityLabel} accessibilityValue={{
            now: value.value,
        }}>
        {showTooltip && (<react_native_reanimated_1.default.View style={[styles.tooltipContainer, tooltipAnimatedStyle, tooltipStyle]}>
            <react_native_1.View style={[styles.tooltip, { backgroundColor: tooltipColor }, tooltipInnerStyle]}>
              <react_native_reanimated_1.default.Text style={[styles.tooltipText, { color: tooltipTextColor, fontSize: tooltipFontSize }, tooltipTextStyle]}>
                {renderTooltip ? renderTooltip(Math.round(value.value)) : Math.round(value.value)}
              </react_native_reanimated_1.default.Text>
            </react_native_1.View>
            <react_native_1.View style={[styles.tooltipPointer, { borderTopColor: tooltipColor }, tooltipPointerStyle]}/>
          </react_native_reanimated_1.default.View>)}
        <react_native_1.View style={[
            styles.thumb,
            {
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: color,
            },
            styles.shadow,
            innerThumbStyle,
        ]}/>
        {renderLabel && (<react_native_1.View style={[styles.labelContainer, labelContainerStyle]}>
            {renderLabel(value.value)}
          </react_native_1.View>)}
      </react_native_reanimated_1.default.View>
    </react_native_gesture_handler_1.GestureDetector>);
};
const styles = react_native_1.StyleSheet.create({
    thumbContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    thumb: {
        borderWidth: 1,
        borderColor: '#ccc',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    labelContainer: {
        position: 'absolute',
        top: -30,
        alignItems: 'center',
        width: 60,
    },
    tooltipContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
    },
    tooltip: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 32,
    },
    tooltipText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tooltipPointer: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderTopWidth: 6,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
    },
});
exports.default = Thumb;
