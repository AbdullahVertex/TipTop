import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AppSafeAreaView from '../../../components/General/SafeAreaView/SafeAreaView';
import { hp, wp } from '../../../utils/helpers/responsive';
import PrimaryColors from '../../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import OTPInput from '../../../components/General/OTPInput/OTPInput';
import { useAuthApi } from '../../../hooks/useApi';
import Toast from 'react-native-toast-message';

const OTPVerification = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { register, OTP, clearError } = useAuthApi();
  const { registerData, flowType = 'registration' } = route.params as any;

  const [loading, setLoading] = useState(false);

  // ✅ OTP Complete
  const handleOTPComplete = async (otp: {
    email: string;
    otp_code: string;
  }) => {
    try {
      setLoading(true);
      if (flowType === 'password_reset') {
        setLoading(false);
        (navigation as any).navigate('ConfirmPass', {
          email: otp.email,
          otp_code: otp.otp_code,
        });
      } else {
        const responseData = { email: otp.email, otp_code: otp.otp_code };
        const response = await OTP(responseData);

        Toast.show({
          type: 'success',
          text1: 'OTP Verified ✅',
          text2: response?.message || 'OTP verified successfully!',
        });

        setTimeout(() => {
          setLoading(false);
          navigation.navigate('Login' as never);
        }, 1000);
      }
    } catch (err: any) {
      console.error('OTP verification error:', err);
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Verification Failed ❌',
        text2: err?.message || 'Enter OTP again.',
      });
    }
  };

  // ✅ Resend OTP
  const handleResend = async () => {
    try {
      setLoading(true);
      clearError();

      const registerData1 = {
        email: registerData.email,
        name: registerData.name,
        password: registerData.password,
        password_confirm: registerData.password_confirm,
        username: registerData.username,
      };

      const response = await register(registerData1);

      Toast.show({
        type: 'success',
        text1: 'OTP Resent 📩',
        text2: response?.message || 'New OTP sent to your email!',
      });

      setLoading(false);
    } catch (err: any) {
      console.error('Resend OTP error:', err);
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Failed to Resend ❌',
        text2: err?.message || 'Please try again.',
      });
    }
  };

  return (
    <AppSafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp('5%') }}
      >
        <View style={styles.card}>
          {/* Back Icon */}
          <TouchableOpacity onPress={() => navigation?.goBack?.()}>
            <Ionicons name="chevron-back" size={wp('6%')} color="#111" />
          </TouchableOpacity>

          {/* Title */}
          <View
            style={{
              marginTop: hp('2%'),
              paddingHorizontal: wp('9%'),
              marginBottom: hp('2%'),
            }}
          >
            <Text style={styles.titleBold}>OTP</Text>
            <Text style={styles.titlePink}>VERIFICATION</Text>
          </View>

          {/* OTP Input Component */}
          <OTPInput
            length={6}
            onComplete={otpCode =>
              handleOTPComplete({
                email: registerData.email,
                otp_code: otpCode,
              })
            }
            onResend={handleResend}
            email={registerData.email}
          />
        </View>
      </ScrollView>

      {/* ✅ Fullscreen Loader */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={PrimaryColors.BRAND_PINK} />
          <Text style={styles.loadingText}>Please wait...</Text>
        </View>
      )}
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: PrimaryColors.CARD,
    paddingTop: hp('2%'),
    borderRadius: wp('4%'),
  },
  titleBold: {
    fontSize: wp('7%'),
    fontFamily: 'benzin-bold',
    color: '#111111',
    letterSpacing: 0.5,
  },
  titlePink: {
    marginTop: hp('1%'),
    fontSize: wp('7%'),
    fontFamily: 'benzin-bold',
    color: PrimaryColors.BRAND_PINK,
    letterSpacing: 0.5,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingText: {
    marginTop: 10,
    color: 'white',
    fontSize: wp('4%'),
    fontWeight: '600',
  },
});

export default OTPVerification;
