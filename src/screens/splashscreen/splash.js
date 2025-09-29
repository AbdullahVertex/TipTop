import React, { useEffect, useRef } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Animated,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setFirstTimeUser } from '../../store/slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../assets/svgs/Splash_Screen_Logo.svg';
import PrimaryColors from '../../constants/colors';
const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animate logo
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
  });
  const { isFirstTimeUser, hasUserData } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    setTimeout(() => {
      if (isFirstTimeUser) {
        dispatch(setFirstTimeUser(false)); // ✅ mark that app has been opened once
        navigation.replace('Onboarding'); // first time → go to onboarding
      } else if (hasUserData) {
        navigation.replace('Home'); // already logged in → go to home
      } else {
        navigation.replace('Login'); // not logged in → go to login
      }
    }, 1500); // splash delay
  }, [isFirstTimeUser, hasUserData]);

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
          styles.logoWrapper,
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

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
