🎚️ React Native Range Slider
=============================

A lightweight, customizable **range slider component** built from scratch for React Native.

> 🚀 No third-party slider libraries used — fully custom implementation using core React Native + gesture handling.

✨ Features
----------

*   Dual thumb range slider (min & max)
*   Single thumb mode
*   Smooth gesture handling
*   Fully customizable UI (colors, sizes, etc.)
*   Step-based snapping
*   RTL support
*   Accessibility support
*   High performance (Built with React Native Reanimated)

📦 Installation
---------------

```bash
npm install react-native-range-slider
```

### Peer Dependencies

Make sure you have the following dependencies installed in your project:

```bash
npm install react-native-gesture-handler react-native-reanimated
```

🚀 Usage
--------

```tsx
import React, { useState } from 'react';
import RangeSlider from 'react-native-range-slider';

export default function App() {
  const [low, setLow] = useState(20);
  const [high, setHigh] = useState(80);

  return (
    <RangeSlider
      min={0}
      max={100}
      step={1}
      initialLowValue={low}
      initialHighValue={high}
      onValueChange={(low, high) => {
        setLow(low);
        setHigh(high);
        console.log(low, high);
      }}
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
| `initialLowValue` | `number` | `min` | Initial low value. |
| `initialHighValue` | `number` | `max` | Initial high value. |
| `singleThumbMode` | `boolean` | `false` | Enable single thumb mode. |
| `disabled` | `boolean` | `false` | Disable the slider interactions. |
| `renderLabel` | `(value: number) => ReactNode` | `undefined` | Custom renderer for thumb labels. |
| `isRTL` | `boolean` | `I18nManager.isRTL` | Support for Right-to-Left layouts. |

### 🎨 Styling Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `trackHeight` | `number` | `4` | Height of the track. |
| `inactiveTrackColor` | `string` | `#e5e7eb` | Color of the inactive track. |
| `activeTrackColor` | `string` | `#3b82f6` | Color of the active track. |
| `thumbColor` | `string` | `#ffffff` | Color of the thumb. |
| `thumbSize` | `number` | `24` | Size (diameter) of the thumb. |

### 📡 Callbacks

| Callback | Description |
| :--- | :--- |
| `onValueChange` | Called while sliding with `(low, high)`. |
| `onSlidingStart` | Called when the user starts sliding. |
| `onSlidingComplete` | Called when sliding ends with `(low, high)`. |

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
git clone https://github.com/VatsalPatadiya/react-native-range-slider
cd react-native-range-slider
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