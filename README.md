🎚️ React Native Smooth Range Slider
=============================

A lightweight, customizable **range slider component** built from scratch for React Native.

> 🚀 No third-party slider libraries used — fully custom implementation using core React Native + gesture handling.

✨ Features
----------

*   Dual thumb range slider (min & max)
*   Single thumb mode
*   **New:** Customizable Tooltips (built-in, high-performance)
*   **New:** Percentage-based track coloring (Color Stops)
*   Smooth gesture handling and interaction logic (including overlap fix)
*   Fully customizable UI (colors, sizes, etc.)
*   Step-based snapping
*   RTL support
*   Accessibility support
*   High performance (Built with React Native Reanimated)

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

**bun**
```bash
bun add react-native-smooth-range-slider
```

### Peer Dependencies

Make sure you have the following dependencies installed in your project:

**npm**
```bash
npm install react-native-gesture-handler react-native-reanimated
```

**yarn**
```bash
yarn add react-native-gesture-handler react-native-reanimated
```

**bun**
```bash
bun add react-native-gesture-handler react-native-reanimated
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
| `renderLabel` | `(value: number) => ReactNode` | `undefined` | Custom renderer for thumb labels. |
| `isRTL` | `boolean` | `I18nManager.isRTL` | Support for Right-to-Left layouts. |

### 💬 Tooltip Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `showTooltip` | `boolean` | `false` | Show tooltip when dragging. |
| `alwaysShowTooltip` | `boolean` | `false` | Keep tooltips visible at all times. |
| `tooltipColor` | `string` | `#3b82f6` | Background color of the tooltip. |
| `tooltipTextColor` | `string` | `#ffffff` | Text color of the tooltip. |
| `tooltipFontSize` | `number` | `12` | Font size for tooltip text. |
| `tooltipStyle` | `ViewStyle` | `{}` | Custom style for tooltip container. |
| `tooltipTextStyle` | `TextStyle` | `{}` | Custom style for tooltip text. |

### 🌈 Color Stops (Dynamic Coloring)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `activeTrackColorStops` | `ColorStop[]` | `undefined` | Array of `{ percent, color }` for dynamic track color. |
| `enableColorStops` | `boolean` | `false` | Toggle the color stops feature. |
| `colorStopReference` | `'low'\|'high'\|'center'`| `'low'` | Which point controls the color interpolation. |

### 🎨 Styling Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `trackHeight` | `number` | `4` | Height of the track. |
| `inactiveTrackColor` | `string` | `#e5e7eb` | Color of the inactive track. |
| `activeTrackColor` | `string` | `#3b82f6` | Color of the active track (if color stops disabled). |
| `thumbColor` | `string` | `#ffffff` | Color of the thumb. |
| `thumbSize` | `number` | `24` | Size (diameter) of the thumb. |

### 📡 Callbacks

| Callback | Description |
| :--- | :--- |
| `onValueChange` | Called while sliding with `(low, high)`. |
| `onSlidingStart` | Called when the user starts sliding. |
| `onSlidingComplete` | Called when sliding ends with `(low, high)`. |

Brains & Performance
--------------------

*   Uses **Gesture Detector** for smooth and responsive drag interactions.
*   Uses **Reanimated** for high-performance UI updates on the UI thread.
*   **Overlap Management**: Smart Z-Index swapping to prevent thumbs from getting "stuck" when overlapping.

📱 Example (Color Stops & Tooltips)
----------

```tsx
<RangeSlider
  min={0}
  max={100}
  showTooltip
  colorStopReference="center"
  activeTrackColorStops={[
    { percent: 0, color: '#ef4444' },
    { percent: 50, color: '#f59e0b' },
    { percent: 100, color: '#10b981' }
  ]}
/>
```

🧠 How It Works
---------------

*   Uses **PanGestureHandler** for smooth and responsive drag interactions.
*   Uses **Reanimated** for high-performance UI updates and layout transitions.
*   Calculates thumb positions dynamically based on slider width, range, and step values.

📱 Example
----------

```tsx
<RangeSlider
  min={0}
  max={500}
  initialLowValue={50}
  initialHighValue={300}
  step={10}
  inactiveTrackColor="#ddd"
  activeTrackColor="#4CAF50"
  thumbColor="#4CAF50"
/>
```

♿ Accessibility
---------------

*   Full screen reader support.
*   Adjustable values via gestures.
*   Customizable accessible labels for thumbs.

🌍 RTL Support
--------------

Automatically adapts to RTL layouts or can be manually overridden via the `isRTL` prop.

🛠️ Development
---------------

```bash
git clone https://github.com/VatsalPatadiya/react-native-smooth-range-slider
cd react-native-smooth-range-slider
npm install
```


📄 License
----------

MIT License

🤝 Contributing
---------------

Contributions are welcome!
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

💡 Future Improvements
----------------------

*   Vertical slider support
*   Tooltip formatting options
*   Multi-range sliders (3+ thumbs)
*   Animated label transitions

👨‍💻 Author
------------

Built with ❤️ for React Native developers