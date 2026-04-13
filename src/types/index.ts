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
}

export interface TrackProps {
  height: number;
  inactiveColor: string;
  activeColor: string;
  lowPosition: any; // SharedValue<number>
  highPosition: any; // SharedValue<number>
  thumbSize: number;
  singleThumbMode?: boolean;
}
