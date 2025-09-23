import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PrimaryColors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Logo from '../../assets/svgs/Splash_Screen_Logo.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animate text
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    // Check authentication and navigate accordingly
    const checkAuthAndNavigate = async () => {
      try {
        // Check if user has access token and user data
        const [accessToken, userData, isFirstTime] =
          await AsyncStorage.multiGet([
            '@access_token',
            '@user_data',
            '@is_first_time',
          ]);

        const hasToken = accessToken[1] && accessToken[1] !== null;
        const hasUserData = userData[1] && userData[1] !== null;
        const isFirstTimeUser =
          isFirstTime[1] === null || isFirstTime[1] === 'true';

        console.log('Splash Screen - Auth Check:', {
          hasToken,
          hasUserData,
          isFirstTimeUser,
        });

        // Wait for animation to complete
        setTimeout(() => {
          if (hasToken && hasUserData) {
            // User is logged in - go to Home
            console.log('Navigating to Home - User is logged in');
            navigation.replace('Home');
          } else if (isFirstTimeUser) {
            // First time user - go to Onboarding
            console.log('Navigating to Onboarding - First time user');
            navigation.replace('Onboarding');
          } else {
            // Returning user but not logged in - go to Login
            console.log('Navigating to Login - Returning user');
            navigation.replace('Login');
          }
        }, 2000); // Wait 2 seconds for splash animation
      } catch (error) {
        console.error('Error checking auth in splash:', error);
        // Default to onboarding on error
        setTimeout(() => {
          navigation.replace('Onboarding');
        }, 2000);
      }
    };

    checkAuthAndNavigate();
  }, []);

  return (
    <LinearGradient
      colors={[
        PrimaryColors.gradient_Color1,
        PrimaryColors.gradient_Color2,
        PrimaryColors.gradient_Color3,
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <Animated.View
        style={[
          styles.title,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Logo />
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: wp('8.5%'),
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SplashScreen;
