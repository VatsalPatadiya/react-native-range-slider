🎚️ React Native Smooth Range Slider
=============================

A lightweight, customizable **range slider component** built from scratch for React Native.

> 🚀 No third-party slider libraries used — fully custom implementation using core React Native + gesture handling.

✨ Features
----------

*   Dual thumb range slider (min & max)
*   Single thumb mode
*   **Edge-to-Edge Layout:** Thumbs and track touch the absolute corners of your container.
*   **Customizable Tooltips:** Native, high-performance tooltips with custom rendering support.
*   **Dynamic Track Coloring:** Percentage-based track coloring (Color Stops).
*   **Smooth Gestures:** Built with Reanimated 3 and Gesture Handler for 60fps interaction.
*   **Overlap Management:** Smart Z-Index swapping to prevent thumbs from getting "stuck".
*   Fully customizable UI (colors, sizes, and granular internal styling).
*   Step-based snapping and RTL support.
*   Accessibility support (Screen Readers).

📦 Installation
---------------

**npm**
```bash
npm install react-native-smooth-range-slider
```

**yarn**
```bash
yarn add react-native-smooth-range-slider
```

🚀 Usage
--------

### Controlled Mode
```tsx
import React, { useState } from 'react';
import RangeSlider from 'react-native-smooth-range-slider';

export default function App() {
  const [low, setLow] = useState(20);
  const [high, setHigh] = useState(80);

  return (
    <RangeSlider
      min={0}
      max={100}
      lowValue={low}
      highValue={high}
      onValueChange={(l, h) => {
        setLow(l);
        setHigh(h);
      }}
      showTooltip
    />
  );
}
```

⚙️ Props
--------

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `min` | `number` | `0` | Minimum value of the slider. |
| `max` | `number` | `100` | Maximum value of the slider. |
| `step` | `number` | `1` | Step interval for snapping. |
| `initialLowValue` | `number` | `min` | Initial low value (uncontrolled). |
| `initialHighValue` | `number` | `max` | Initial high value (uncontrolled). |
| `lowValue` | `number` | `undefined` | Controlled low value. |
| `highValue` | `number` | `undefined` | Controlled high value. |
| `singleThumbMode` | `boolean` | `false` | Enable single thumb mode. |
| `disabled` | `boolean` | `false` | Disable the slider interactions. |
| `renderLabel` | `(val) => ReactNode` | `undefined` | Custom renderer for static thumb labels. |
| `isRTL` | `boolean` | `Auto` | Support for Right-to-Left layouts. |

### 💬 Tooltip Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `showTooltip` | `boolean` | `false` | Show tooltip when dragging. |
| `alwaysShowTooltip` | `boolean` | `false` | Keep tooltips visible at all times. |
| `renderTooltip` | `(val) => ReactNode`| `undefined` | **New:** Custom renderer for the tooltip value. |
| `tooltipColor` | `string` | `#3b82f6` | Background color of the tooltip. |
| `tooltipTextColor` | `string` | `#ffffff` | Text color of the tooltip. |
| `tooltipFontSize` | `number` | `12` | Font size for tooltip text. |
| `tooltipStyle` | `ViewStyle` | `{}` | Outer tooltip container style. |
| `tooltipTextStyle` | `TextStyle` | `{}` | Tooltip text style. |
| `tooltipInnerStyle` | `ViewStyle` | `{}` | Inner tooltip background style. |
| `tooltipPointerStyle`| `ViewStyle` | `{}` | Tooltip arrow/pointer style. |

### 🌈 Color Stops (Dynamic Coloring)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `activeTrackColorStops` | `ColorStop[]` | `undefined` | Array of `{ percent, color }` for interpolation. |
| `enableColorStops` | `boolean` | `false` | Toggle the color stops feature. |
| `colorStopReference` | `'low'\|'high'\|'center'`| `'low'` | Reference point for color change. |

### 🎨 Styling Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `style` | `ViewStyle` | `{}` | Root container style. |
| `trackContainerStyle`| `ViewStyle` | `{}` | Overall track container style. |
| `trackHeight` | `number` | `4` | Height of the track. |
| `inactiveTrackColor` | `string` | `#e5e7eb` | Color of the inactive track. |
| `activeTrackColor` | `string` | `#3b82f6` | Color of the active track (fallback). |
| `thumbStyle` | `ViewStyle` | `{}` | Outer thumb container style. |
| `thumbInnerStyle` | `ViewStyle` | `{}` | The actual circular thumb style. |
| `labelContainerStyle`| `ViewStyle` | `{}` | Style for the `renderLabel` container. |

📱 Examples
----------

### Custom Tooltip Rendering (Currency)
```tsx
<RangeSlider
  min={0}
  max={1000}
  showTooltip
  renderTooltip={(value) => (
    <Text style={{ fontWeight: 'bold' }}>${value}</Text>
  )}
/>
```

### Color Stops & Edge-to-Edge
```tsx
<RangeSlider
  min={0}
  max={100}
  colorStopReference="center"
  activeTrackColorStops={[
    { percent: 0, color: '#ef4444' },
    { percent: 100, color: '#10b981' }
  ]}
/>
```

🧠 How It Works
---------------
*   **Reanimated 3:** All calculations happen on the UI thread for zero-lag performance.
*   **Gesture Handler:** Optimized multi-touch handling.
*   **Edge-to-Edge:** Coordinate system is left-edge based, allowing thumbs to reach absolute boundaries.


🛠️ Development & Contributing
---------------
Contributions are welcome!
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Build the project (`npm run build`)
5. Create a new Pull Request

👨💻 Author
------------

Built with ❤️ by [Vatsal Patadiya](https://github.com/VatsalPatadiya)