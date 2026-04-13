import React from 'react';

export interface RangeSliderProps {
  /**
   * Minimum value of the slider.
   * @default 0
   */
  min: number;
  /**
   * Maximum value of the slider.
   * @default 100
   */
  max: number;
  /**
   * Step value for snapping.
   * @default 1
   */
  step?: number;
  /**
   * Initial low value.
   * @default min
   */
  initialLowValue?: number;
  /**
   * Initial high value.
   * @default max
   */
  initialHighValue?: number;
  /**
   * Controlled low value.
   */
  lowValue?: number;
  /**
   * Controlled high value.
   */
  highValue?: number;
  /**
   * If true, the slider will only have one thumb.
   * @default false
   */
  singleThumbMode?: boolean;
  /**
   * If true, the slider will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Color of the inactive track.
   * @default '#e5e7eb'
   */
  inactiveTrackColor?: string;
  /**
   * Color of the active track (between thumbs).
   * @default '#3b82f6'
   */
  activeTrackColor?: string;
  /**
   * Color of the thumbs.
   * @default '#ffffff'
   */
  thumbColor?: string;
  /**
   * Size of the thumbs (diameter).
   * @default 24
   */
  thumbSize?: number;
  /**
   * Height of the track.
   * @default 4
   */
  trackHeight?: number;
  /**
   * If true, show labels above the thumbs.
   * @default false
   */
  renderLabel?: (value: number) => React.ReactNode;
  /**
   * Callback when value changes.
   */
  onValueChange?: (low: number, high: number) => void;
  /**
   * Callback when sliding starts.
   */
  onSlidingStart?: () => void;
  /**
   * Callback when sliding completes.
   */
  onSlidingComplete?: (low: number, high: number) => void;
  /**
   * Accessibility label for the low thumb.
   */
  lowThumbAccessibilityLabel?: string;
  /**
   * Accessibility label for the high thumb.
   */
  highThumbAccessibilityLabel?: string;
  /**
   * Support RTL layout.
   */
  isRTL?: boolean;
  /**
   * If true, show a tooltip above the thumb while dragging.
   * @default false
   */
  showTooltip?: boolean;
  /**
   * Background color of the tooltip.
   * @default '#3b82f6'
   */
  tooltipColor?: string;
  /**
   * Text color of the tooltip.
   * @default '#ffffff'
   */
  tooltipTextColor?: string;
  /**
   * Font size of the tooltip text.
   * @default 12
   */
  tooltipFontSize?: number;
  /**
   * Custom style for the tooltip container.
   */
  tooltipStyle?: any;
  /**
   * Custom style for the tooltip text.
   */
  tooltipTextStyle?: any;
  /**
   * If true, the tooltip is always visible.
   * @default false
   */
  alwaysShowTooltip?: boolean;
  activeTrackColorStops?: { percent: number; color: string }[];
  /**
   * If true, enable color stops for the active track.
   * @default !!activeTrackColorStops
   */
  enableColorStops?: boolean;
  /**
   * Which value to use as reference for color stops interpolation.
   * @default 'low'
   */
  colorStopReference?: 'low' | 'high' | 'center';
  /**
   * Style for the container.
   */
  style?: any;
}

export interface ThumbProps {
  index: 0 | 1;
  size: number;
  color: string;
  position: any; // SharedValue<number>
  disabled?: boolean;
  onSlidingStart?: () => void;
  onSlidingComplete?: () => void;
  accessibilityLabel?: string;
  renderLabel?: (value: number) => React.ReactNode;
  value: any; // SharedValue<number>
  updatePosition: (absoluteX: number) => void;
  zIndex?: any; // SharedValue<number>
  showTooltip?: boolean;
  tooltipColor?: string;
  tooltipTextColor?: string;
  tooltipFontSize?: number;
  tooltipStyle?: any;
  tooltipTextStyle?: any;
  alwaysShowTooltip?: boolean;
}

export interface TrackProps {
  height: number;
  inactiveColor: string;
  activeColor: string;
  lowPosition: any; // SharedValue<number>
  highPosition: any; // SharedValue<number>
  thumbSize: number;
  singleThumbMode?: boolean;
  activeTrackColorStops?: { percent: number; color: string }[];
  enableColorStops?: boolean;
  lowValuePercent: any; // SharedValue<number>
  highValuePercent: any; // SharedValue<number>
  colorStopReference?: 'low' | 'high' | 'center';
}
