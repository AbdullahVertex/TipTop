import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import PrimaryColors from '../constants/colors';

const LoadingScreen = () => {
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
      <View style={styles.content}>
        <Text style={styles.title}>TipTop</Text>
        <ActivityIndicator size="large" color="#FFFFFF" style={styles.loader} />
        <Text style={styles.subtitle}>Loading...</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: wp('10%'),
    fontFamily: 'benzin-bold',
    color: '#FFFFFF',
    marginBottom: hp('3%'),
  },
  loader: {
    marginBottom: hp('2%'),
  },
  subtitle: {
    fontSize: wp('4%'),
    color: '#FFFFFF',
    opacity: 0.8,
  },
});

export default LoadingScreen;
