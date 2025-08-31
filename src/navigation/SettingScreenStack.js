// src/Navigation.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingScreen from '../screens/settingScreens/FinalSettingScreen/SettingScreen';
import AccountSettingScreen from '../screens/settingScreens/accountSettingScreen/AccountSettingScreen';
import MyQRCode from '../screens/settingScreens/QrCodeScreen/MyQRCode';
import SubscriptionScreen from '../screens/settingScreens/SubscriptionScreen/SubscriptionScreen';
import SavedPostsScreen from '../screens/settingScreens/SavedPostsScreen/SavedPostsScreen';
import NotificationSettingsScreen from '../screens/settingScreens/Notifications_Screen/Notifications_Screen';
import CoinWalletScreen from '../screens/settingScreens/WalletScreens/WalletScreen';
import BlockedUsersScreen from '../screens/settingScreens/BlockedUsers Screen/BlockedUsersScreen';
import ScanQRCode from '../screens/settingScreens/QrCodeScreen/scanQRCode/ScanQRCode';
import AddCardScreen from '../screens/settingScreens/AddCardScreen/AddCardScreen';
import LanguageSettingScreen from '../screens/settingScreens/LanguageSettingScreen/LanguageSettingScreen';

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
