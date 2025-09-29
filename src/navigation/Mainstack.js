// src/Navigation.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LanguageSelectionScreen from '../screens/Auth/LanguageScreen/LanguageScreen';
import BottomNavigator from './BottonNavigation';
import SettingScreenNavigation from './SettingScreenStack';
import CommentsScreen from '../screens/CommentsScreen/CommentScreen';
import ProductListScreen from '../screens/Products/ProductListScreen/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailPage/ProductDetailScreen';
import { GamesDetailScreen } from '../screens/GamesDetailScreen/GamesDetailScreen';
import FeedStack from './FeedStack';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
      <Stack.Screen
        name="Language_Screen"
        component={LanguageSelectionScreen}
      />
      {/* <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginInScreen} />
      <Stack.Screen name="ForgotPass" component={ForgotPassScreen} />
      <Stack.Screen name="ForgotPass2" component={ForgotPassScreen2} />
      <Stack.Screen name="Signup" component={SignUpScreen} /> */}
      <Stack.Screen name="Home" component={BottomNavigator} />
      <Stack.Screen name="Feed" component={FeedStack} />
      <Stack.Screen name="Comments" component={CommentsScreen} />
      <Stack.Screen name="ProductListScreen" component={ProductListScreen} />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
      <Stack.Screen name="GamesDetailScreen" component={GamesDetailScreen} />
      <Stack.Screen name="SettingScreen" component={SettingScreenNavigation} />
    </Stack.Navigator>
  );
};

export default Navigation;
