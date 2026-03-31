# TODO App with Expo

This is a cross-platform TODO application built using [Expo](https://expo.dev/) and React Native.

## Features

- Add and manage tasks
- Mark tasks as complete
- Persistent storage (AsyncStorage)
- Cross-platform support (iOS, Android, Web)

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/go) app on your mobile device (to test on physical devices)

## Getting Started

1. **Initialize the Project** (if not already done):
   ```bash
   npx create-expo-app@latest .
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npx expo start
   ```

4. **Run on a Device/Emulator**:
   - Open the **Expo Go** app and scan the QR code from your terminal.
   - Press `a` for Android emulator.
   - Press `i` for iOS simulator.
   - Press `w` for web.

## Project Structure

- `App.js`: Main application entry point.
- `src/components/`: Reusable UI components.
- `src/screens/`: Main application screens.
- `src/utils/`: Helper functions and storage logic.

## Deployment

To build the app for production, use [EAS Build](https://docs.expo.dev/build/introduction/):
```bash
npm install -g eas-cli
eas build:configure
eas build --platform android
# or
eas build --platform ios
```

## License

This project is licensed under the MIT License.
