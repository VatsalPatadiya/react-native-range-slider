🎚️ React Native Range Slider
=============================

A lightweight, customizable **range slider component** built from scratch for React Native.

> 🚀 No third-party slider libraries used — fully custom implementation using core React Native + gesture handling.

✨ Features
----------

*   Dual thumb range slider (min & max)
    
*   Single thumb mode
    
*   Smooth gesture handling
    
*   Fully customizable UI
    
*   Step-based snapping
    
*   RTL support
    
*   Accessibility support
    
*   High performance (Reanimated support)
    

📦 Installation
---------------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   npm install your-range-slider-library   `

### Peer Dependencies

Make sure you have:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   npm install react-native-gesture-handler react-native-reanimated   `

🚀 Usage
--------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   import RangeSlider from 'your-range-slider-library';  export default function App() {    return (   `

          `min={0}        max={100}        initialLowValue={20}        initialHighValue={80}        step={1}        onValueChange={(low, high) => {          console.log(low, high);        }}      />    );  }`

⚙️ Props
--------

PropTypeDefaultDescriptionminnumber0Minimum valuemaxnumber100Maximum valuestepnumber1Step intervalinitialLowValuenumberminInitial low valueinitialHighValuenumbermaxInitial high valuesingleThumbbooleanfalseEnable single thumb modedisabledbooleanfalseDisable slider

### 🎨 Styling Props

PropTypeDescriptiontrackHeightnumberHeight of tracktrackColorstringInactive track coloractiveTrackColorstringActive track colorthumbColorstringThumb colorthumbSizenumberThumb size

### 📡 Callbacks

CallbackDescriptiononValueChangeCalled while slidingonSlidingStartCalled when user starts slidingonSlidingCompleteCalled when sliding ends

🧠 How It Works
---------------

*   Uses **PanGestureHandler** for drag interactions
    
*   Uses **Reanimated** for smooth UI updates
    
*   Calculates thumb position based on:
    
    *   slider width
        
    *   min/max range
        
    *   step value
        

📱 Example
----------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML

  `min={0}    max={500}    initialLowValue={50}    initialHighValue={300}    step={10}    trackColor="#ddd"    activeTrackColor="#4CAF50"    thumbColor="#4CAF50"  />`

♿ Accessibility
---------------

*   Screen reader support
    
*   Adjustable values via gestures
    
*   Accessible labels for thumbs
    

🌍 RTL Support
--------------

Automatically adapts to RTL layouts.

🛠️ Development
---------------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   git clone https://github.com/your-repo/range-slider  cd range-slider  npm install   `

📄 License
----------

MIT License

🤝 Contributing
---------------

Contributions are welcome!

*   Fork the repo
    
*   Create a feature branch
    
*   Submit a PR
    

💡 Future Improvements
----------------------

*   Vertical slider support
    
*   Tooltip formatting
    
*   Multi-range sliders
    
*   Animated labels
    

👨‍💻 Author
------------

Built with ❤️ for React Native developers