# TipTop React Native App - Complete Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Installation & Setup](#installation--setup)
3. [Running the App](#running-the-app)
4. [Project Structure](#project-structure)
5. [Naming Conventions](#naming-conventions)
6. [Architecture](#architecture)
7. [Dependencies](#dependencies)
8. [Build Configuration](#build-configuration)
9. [Development Guidelines](#development-guidelines)

---

## Project Overview

**TipTop** is a React Native application built with the following specifications:

- **React Native Version**: 0.80.2
- **React Version**: 19.1.0
- **TypeScript Support**: Yes
- **Platforms**: iOS & Android
- **Architecture**: New Architecture (Fabric) enabled

### Key Features

- Social media functionality (Feed, Stories, Live Streaming)
- E-commerce integration (Product listings, Shopping)
- Gaming section
- User profiles and settings
- Chat and messaging
- QR code functionality

---

## Installation & Setup

### Prerequisites

- **Node.js**: >= 18.0.0
- **npm**: Latest version
- **React Native CLI**: `npm install -g react-native-cli`
- **CocoaPods**: For iOS (install via `gem install cocoapods`)
- **Android Studio**: For Android development
- **Xcode**: For iOS development (macOS only)

### Initial Setup

```bash
# 1. Clone the repository
git clone <repository-url>
cd TipTop

# 2. Install dependencies
npm install

# 3. iOS Setup - Install CocoaPods dependencies
cd ios
pod install
cd ..

# 4. Android Setup (if needed)
cd android
./gradlew clean
cd ..
```

---

## Running the App

### Development Commands

#### For iOS:

```bash
# Start Metro bundler (in one terminal)
npm start

# Run iOS app (in another terminal)
npm run ios
# or
react-native run-ios

# Run on specific iOS device/simulator
npx react-native run-ios --device "iPhone 15 Pro"
```

#### For Android:

```bash
# Start Metro bundler (in one terminal)
npm start

# Run Android app (in another terminal)
npm run android
# or
react-native run-android

# Run on specific Android device
npx react-native run-android --device
```

#### Additional Commands:

```bash
# Clean and reset Metro cache
npm start -- --reset-cache

# Run tests
npm test

# Lint code
npm run lint

# Clean build (iOS)
cd ios && xcodebuild clean && cd ..

# Clean build (Android)
cd android && ./gradlew clean && cd ..
```

---

## Project Structure

```
TipTop/
├── android/                     # Android-specific files
│   ├── app/
│   │   ├── build.gradle         # App-level build configuration
│   │   ├── src/main/            # Main Android source files
│   │   └── debug.keystore       # Debug signing key
│   ├── build.gradle             # Project-level build configuration
│   └── gradle/                  # Gradle wrapper files
├── ios/                         # iOS-specific files
│   ├── TipTop/
│   │   ├── Info.plist          # iOS app configuration
│   │   ├── AppDelegate.swift   # iOS app delegate
│   │   └── Images.xcassets/    # App icons and images
│   ├── TipTop.xcodeproj/       # Xcode project file
│   ├── TipTop.xcworkspace/     # Xcode workspace
│   ├── Podfile                 # CocoaPods dependencies
│   └── Pods/                   # CocoaPods installed dependencies
├── src/                        # Main application source code
│   ├── assets/                 # Static assets
│   │   ├── fonts/             # Custom fonts
│   │   ├── icons/             # Icon images
│   │   ├── images/            # Static images
│   │   └── svgs/              # SVG files
│   ├── components/            # Reusable UI components
│   │   ├── General/           # Generic components
│   │   ├── Feed/             # Feed-related components
│   │   ├── LiveStream/       # Live streaming components
│   │   ├── ProductDetailPage/# Product detail components
│   │   ├── ProductListScreen/# Product list components
│   │   └── [other feature folders]/
│   ├── constants/             # App constants
│   │   ├── colors.js         # Color palette
│   │   ├── icons.js          # Icon mappings
│   │   └── images.js         # Image mappings
│   ├── hooks/                # Custom React hooks
│   ├── navigation/           # Navigation configuration
│   │   ├── Mainstack.js     # Main navigation stack
│   │   ├── BottonNavigation.js # Bottom tab navigation
│   │   ├── FeedStack.js     # Feed navigation stack
│   │   ├── LiveStreamStack.js # Live stream navigation
│   │   ├── MessegesStack.js # Messages navigation
│   │   └── SettingScreenStack.js # Settings navigation
│   ├── screens/              # Screen components
│   │   ├── Tabs/            # Tab screen components
│   │   ├── ChatScreens/     # Chat-related screens
│   │   ├── LiveStreamScreens/ # Live streaming screens
│   │   ├── SettingScreens/  # Settings screens
│   │   ├── Products/        # Product-related screens
│   │   └── [other screen folders]/
│   └── utils/                # Utility functions and data
│       ├── DummyData/       # Mock data for development
│       ├── helpers/         # Helper functions
│       └── [mock data files]
├── __tests__/                # Test files
├── node_modules/             # npm dependencies
├── App.tsx                   # Root app component
├── index.js                  # App entry point
├── package.json              # npm configuration and scripts
├── babel.config.js           # Babel configuration
├── metro.config.js           # Metro bundler configuration
├── tsconfig.json             # TypeScript configuration
├── react-native.config.js    # React Native configuration
└── README.md                 # Project readme
```

### Directory Explanations

#### `/src/assets/`

Contains all static assets:

- **fonts/**: Custom font files (e.g., Benzin-Bold.ttf)
- **icons/**: PNG icon files for UI elements
- **images/**: Static images used throughout the app
- **svgs/**: SVG files for scalable graphics

#### `/src/components/`

Reusable UI components organized by feature:

- **General/**: Generic components (Button, TextInput, Header, etc.)
- **Feed/**: Components for social feed functionality
- **LiveStream/**: Components for live streaming features
- **ProductDetailPage/**: Components for product detail views
- **ProductListScreen/**: Components for product listing
- Each component folder typically contains the component file and its styles

#### `/src/constants/`

Application constants:

- **colors.js**: Color palette and theme colors
- **icons.js**: Icon asset mappings
- **images.js**: Image asset mappings

#### `/src/hooks/`

Custom React hooks:

- **useProductDetail.js**: Hook for product detail functionality
- **useProductSearch.js**: Hook for product search functionality

#### `/src/navigation/`

Navigation configuration files:

- **Mainstack.js**: Main navigation stack (root navigator)
- **BottonNavigation.js**: Bottom tab navigation
- Feature-specific navigation stacks for different app sections

#### `/src/screens/`

Screen components organized by feature:

- **Tabs/**: Main tab screens (Home, Profile, Games, etc.)
- **ChatScreens/**: Chat and messaging screens
- **LiveStreamScreens/**: Live streaming related screens
- **SettingScreens/**: App settings and configuration screens
- **Products/**: E-commerce related screens

#### `/src/utils/`

Utility functions and mock data:

- **DummyData/**: Mock data for development and testing
- **helpers/**: Helper functions (responsive utilities, etc.)
- Mock data files for different features

---

## Naming Conventions

### File Naming

- **Components**: PascalCase (e.g., `CustomButton.js`, `ProductCard.jsx`)
- **Screens**: PascalCase with "Screen" suffix (e.g., `LoginScreen.js`, `ProductDetailScreen.jsx`)
- **Utilities**: camelCase (e.g., `responsive.js`, `mockData.js`)
- **Constants**: camelCase (e.g., `colors.js`, `icons.js`)
- **Navigation**: PascalCase with descriptive suffix (e.g., `Mainstack.js`, `BottonNavigation.js`)

### Folder Naming

- **Feature folders**: PascalCase (e.g., `ProductDetailPage/`, `LiveStream/`)
- **Generic folders**: lowercase (e.g., `assets/`, `utils/`, `constants/`)
- **Screen folders**: PascalCase with "Screen" suffix where applicable

### Variable and Function Naming

- **Variables**: camelCase (e.g., `userName`, `productList`)
- **Functions**: camelCase (e.g., `handleSubmit`, `fetchUserData`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `MAX_RETRY_COUNT`)
- **Components**: PascalCase (e.g., `CustomButton`, `UserProfile`)

### Asset Naming

- **Icons**: lowercase with hyphens (e.g., `blue-check.png`, `red-cross.png`)
- **Images**: camelCase or descriptive names (e.g., `savedPost-1.png`, `userAvatar.png`)
- **SVGs**: lowercase with hyphens (e.g., `arrow-left.svg`, `heart-filled.svg`)

---

## Architecture

### Navigation Structure

```
App (Root)
├── Splash Screen
├── Language Selection
├── Onboarding
├── Authentication Stack
│   ├── Login
│   ├── Sign Up
│   └── Forgot Password
└── Main App (Bottom Tabs)
    ├── Home Tab
    ├── Shop Tab (Products)
    ├── LiveStream Tab
    ├── Games Tab
    └── Profile Tab
        └── Settings Stack
```

### Component Architecture

- **Atomic Design Pattern**: Components are organized from basic to complex
- **Feature-based Organization**: Components grouped by app features
- **Reusable Components**: Generic components in `/General/` folder
- **Screen-specific Components**: Components specific to certain screens

### State Management

- **React Hooks**: useState, useEffect for local state
- **Custom Hooks**: Reusable logic extracted into custom hooks
- **Context API**: For global state management (if implemented)

### Data Flow

- **Props**: Data passed down through component hierarchy
- **Hooks**: Custom hooks for business logic and API calls
- **Mock Data**: Development data stored in `/utils/DummyData/`

---

## Dependencies

### Core Dependencies

```json
{
  "react": "19.1.0",
  "react-native": "0.80.2",
  "@react-navigation/native": "^7.1.16",
  "@react-navigation/bottom-tabs": "^7.4.4",
  "@react-navigation/native-stack": "^7.3.23"
}
```

### UI & Animation Libraries

- **@gorhom/bottom-sheet**: ^5.1.8 - Bottom sheet components
- **react-native-reanimated**: ^3.18.0 - Smooth animations
- **react-native-gesture-handler**: ^2.27.2 - Gesture handling
- **react-native-vector-icons**: ^10.3.0 - Icon library
- **react-native-linear-gradient**: ^2.8.3 - Gradient components
- **react-native-svg**: ^15.12.1 - SVG support

### Media & Camera

- **react-native-vision-camera**: ^4.7.1 - Camera functionality
- **react-native-video**: ^6.16.1 - Video playback
- **react-native-image-picker**: ^8.2.1 - Image selection
- **react-native-fast-image**: ^8.6.3 - Optimized image loading

### Utilities

- **react-native-responsive-screen**: ^1.4.2 - Responsive design
- **@react-native-clipboard/clipboard**: ^1.16.3 - Clipboard access
- **react-native-masonry-list**: ^2.16.2 - Masonry layout

### Development Dependencies

- **TypeScript**: 5.0.4 - Type checking
- **ESLint**: ^8.19.0 - Code linting
- **Prettier**: 2.8.8 - Code formatting
- **Jest**: ^29.6.3 - Testing framework

---

## Build Configuration

### iOS Configuration (`ios/TipTop/Info.plist`)

- **Bundle Identifier**: Configured in Xcode project
- **Display Name**: TipTok
- **Supported Orientations**: Portrait, Landscape Left, Landscape Right
- **New Architecture**: Enabled (RCTNewArchEnabled = true)
- **Permissions**: Camera, Microphone access
- **Custom Fonts**: Benzin-Bold and Vector Icons fonts included

### Android Configuration (`android/app/build.gradle`)

- **Application ID**: com.tiptop
- **Min SDK Version**: 24
- **Target SDK Version**: 35
- **Compile SDK Version**: 35
- **Build Tools Version**: 35.0.0
- **NDK Version**: 27.1.12297006
- **Kotlin Version**: 2.1.20

### Build Scripts

```json
{
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start",
    "test": "jest",
    "lint": "eslint ."
  }
}
```

### Metro Configuration (`metro.config.js`)

- **SVG Support**: Configured with react-native-svg-transformer
- **Reanimated Integration**: Wrapped with reanimated metro config
- **Asset Extensions**: Filters SVGs from assets, treats them as source files

### Babel Configuration (`babel.config.js`)

- **Preset**: @react-native/babel-preset
- **Plugins**: react-native-reanimated/plugin

---

## Development Guidelines

### Code Style

- **ESLint**: Follow the configured ESLint rules
- **Prettier**: Use Prettier for consistent formatting
- **TypeScript**: Utilize TypeScript for type safety where applicable

### Component Guidelines

1. **Single Responsibility**: Each component should have one clear purpose
2. **Props Interface**: Define clear prop interfaces for TypeScript components
3. **Default Props**: Provide default props where appropriate
4. **Error Boundaries**: Implement error boundaries for critical components

### Screen Guidelines

1. **Screen Structure**: Follow consistent screen structure (Header, Content, Footer)
2. **Loading States**: Implement loading states for async operations
3. **Error Handling**: Handle errors gracefully with user-friendly messages
4. **Navigation**: Use proper navigation methods and pass required parameters

### Asset Guidelines

1. **Image Optimization**: Optimize images for mobile performance
2. **SVG Usage**: Use SVGs for scalable icons and simple graphics
3. **Font Loading**: Ensure custom fonts are properly loaded on both platforms

### Performance Guidelines

1. **List Optimization**: Use FlatList/VirtualizedList for long lists
2. **Image Caching**: Utilize FastImage for better image performance
3. **Memory Management**: Properly cleanup resources and listeners
4. **Bundle Size**: Monitor and optimize bundle size

### Testing Guidelines

1. **Unit Tests**: Write unit tests for utility functions and hooks
2. **Component Tests**: Test component rendering and user interactions
3. **Integration Tests**: Test navigation and data flow
4. **E2E Tests**: Implement end-to-end tests for critical user journeys

### Git Guidelines

1. **Branch Naming**: Use descriptive branch names (feature/user-authentication)
2. **Commit Messages**: Write clear, descriptive commit messages
3. **Pull Requests**: Create detailed pull requests with proper descriptions
4. **Code Review**: Ensure code is reviewed before merging

---

## Troubleshooting

### Common Issues

#### Metro Bundler Issues

```bash
# Clear Metro cache
npm start -- --reset-cache

# Clear watchman cache
watchman watch-del-all
```

#### iOS Build Issues

```bash
# Clean iOS build
cd ios
xcodebuild clean
pod install
cd ..
```

#### Android Build Issues

```bash
# Clean Android build
cd android
./gradlew clean
cd ..
```

#### Node Modules Issues

```bash
# Clean install
rm -rf node_modules
rm package-lock.json
npm install
```

### Platform-Specific Notes

#### iOS

- Ensure Xcode is updated to the latest version
- Check iOS deployment target compatibility
- Verify signing certificates and provisioning profiles
- Run `pod install` after adding new native dependencies

#### Android

- Ensure Android Studio and SDK tools are updated
- Check Android SDK version compatibility
- Verify Android device/emulator is running
- Enable USB debugging for physical device testing

---

## Conclusion

This documentation provides a comprehensive overview of the TipTop React Native application. For specific implementation details, refer to the individual component files and their inline documentation. Always ensure to follow the established naming conventions and architectural patterns when contributing to the project.

For updates to this documentation, please modify this file and ensure all team members are informed of changes.

---

**Last Updated**: 17-09-2025
**Version**: 1.0.0
**Maintainers**: Development Team
