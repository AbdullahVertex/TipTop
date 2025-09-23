// src/Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/splashscreen/splash';
import LanguageSelectionScreen from '../screens/LanguageScreen/LanguageScreen';
import OnboardingScreen from '../screens/onboardingScreen/onboardingScreen';
import LoginInScreen from '../screens/LoginScreen/LoginScreen';
import BottomNavigator from './BottonNavigation';
import SettingScreenNavigation from './SettingScreenStack';
import SignUpScreen from '../screens/SignUpSCreen/Index';
import ForgotPassScreen from '../screens/ForgotPasswordScreen/ForgotPassScreen';
import ForgotPassScreen2 from '../screens/ForgotPasswordScreen/ForgotPass2';
import CommentsScreen from '../screens/CommentsScreen/CommentScreen';
import FeedScreen from '../screens/FeedScreen/FeedScreen';
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
