// src/Navigation.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingScreen from '../screens/SettingScreens/FinalSettingScreen/SettingScreen';
import AccountSettingScreen from '../screens/SettingScreens/AccountSettingScreen/AccountSettingScreen';
import MyQRCode from '../screens/SettingScreens/QrCodeScreen/MyQRCode';
import SubscriptionScreen from '../screens/SettingScreens/SubscriptionScreen/SubscriptionScreen';
import SavedPostsScreen from '../screens/SettingScreens/SavedPostsScreen/SavedPostsScreen';
import NotificationSettingsScreen from '../screens/SettingScreens/Notifications_Screen/Notifications_Screen';
import CoinWalletScreen from '../screens/SettingScreens/WalletScreens/WalletScreen';
import BlockedUsersScreen from '../screens/SettingScreens/BlockedUsers Screen/BlockedUsersScreen';
import ScanQRCode from '../screens/SettingScreens/QrCodeScreen/scanQRCode/ScanQRCode';
import AddCardScreen from '../screens/SettingScreens/AddCardScreen/AddCardScreen';
import LanguageSettingScreen from '../screens/SettingScreens/LanguageSettingScreen/LanguageSettingScreen';

const Stack = createNativeStackNavigator();

const SettingScreenNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="SettingScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen
        name="AccountSettingScreen"
        component={AccountSettingScreen}
      />
      <Stack.Screen name="MyQRCode" component={MyQRCode} />
      <Stack.Screen name="ScanQRCode" component={ScanQRCode} />
      <Stack.Screen name="CoinWallet" component={CoinWalletScreen} />
      <Stack.Screen name="BlockedUsers" component={BlockedUsersScreen} />
      <Stack.Screen name="SubscriptionScreen" component={SubscriptionScreen} />
      <Stack.Screen name="SavedPosts" component={SavedPostsScreen} />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationSettingsScreen}
      />
      <Stack.Screen
        name="LanguageSettingScreen"
        component={LanguageSettingScreen}
      />

      <Stack.Screen name="AddCardScreen" component={AddCardScreen} />
    </Stack.Navigator>
  );
};

export default SettingScreenNavigation;
