# ChatGPT Carbon Footprint Tracker

A Chrome extension that tracks your ChatGPT usage and displays your environmental impact in real-time.

## Features

- 📊 **Real-time Tracking**: Monitors your message count from ChatGPT's localStorage
- ⚡ **Energy Estimates**: Calculates energy consumption based on AI model usage
- 🌍 **Carbon Footprint**: Shows CO₂ emissions from your ChatGPT usage
- 💰 **Offset Costs**: Calculates the cost to offset your carbon footprint
- 🌱 **Easy Donations**: Direct integration with Carbonfund.org for carbon offsetting
- 🎯 **Floating Widget**: Non-intrusive overlay that floats over ChatGPT

## Installation

### From Source (Developer Mode)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension folder
5. The extension will be installed and ready to use

### Usage

1. Navigate to [ChatGPT](https://chatgpt.com) or [chat.openai.com](https://chat.openai.com)
2. The carbon footprint widget will automatically appear in the top-right corner
3. The widget shows:
   - Your total message count
   - Estimated energy consumption
   - CO₂ emissions
   - Carbon offset cost
4. Click "Donate Carbon Offset" to contribute to environmental causes
5. Drag the widget by its header to reposition it
6. Click the "−" button to minimize/expand the widget

## How It Works

The extension reads your message count from ChatGPT's localStorage and calculates environmental impact using these estimates:

- **Energy**: ~0.003 kWh per message
- **CO₂**: ~475g CO₂ per kWh (global average)
- **Offset Cost**: $20 per metric ton of CO₂

*Note: These are rough estimates. Actual impact may vary based on model efficiency, server location, and usage patterns.*

## Privacy

This extension:
- ✅ Only reads message count data from localStorage
- ✅ Does not collect or transmit any personal data
- ✅ Works entirely locally in your browser
- ✅ Only connects to Carbonfund.org when you choose to donate

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve this extension.

## License

MIT License - feel free to use and modify as needed.
