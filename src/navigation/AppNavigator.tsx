import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/splashscreen/splash';
import Navigation from './Mainstack';
import OnboardingScreen from '../screens/Auth/onboardingScreen/onboardingScreen';
import LoginInScreen from '../screens/Auth/LoginScreen/LoginScreen';
import SignUpScreen from '../screens/Auth/SignUpSCreen/Index';
import OTPVerification from '../screens/Auth/OtpVerification/OtpVerification';
import ForgotPassScreen from '../screens/Auth/ForgotPasswordScreen/ForgotPassScreen';
import ForgotPassScreen2 from '../screens/Auth/ForgotPasswordScreen/ForgotPass2';
import ChangePassScreen from '../screens/Auth/ChangePassword/ChangePassword';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginInScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="OTP" component={OTPVerification as never} />
        <Stack.Screen name="ForgotPass" component={ForgotPassScreen as never} />
        <Stack.Screen
          name="ConfirmPass"
          component={ForgotPassScreen2 as never}
        />
        <Stack.Screen name="ChangePass" component={ChangePassScreen as never} />
        <Stack.Screen name="Home" component={Navigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
