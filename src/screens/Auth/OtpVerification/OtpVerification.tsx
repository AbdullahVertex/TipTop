import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AppSafeAreaView from '../../../components/General/SafeAreaView/SafeAreaView';
import { ScrollView } from 'react-native-gesture-handler';
import { hp, wp } from '../../../utils/helpers/responsive';
import PrimaryColors from '../../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import OTPInput from '../../../components/General/OTPInput/OTPInput';
import { useApi, useAuthApi } from '../../../hooks/useApi';

interface Props {
  title: string;
  message: string;
  email: string;
}

const OTPVerification = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { register, OTP, clearError } = useAuthApi();
  const { registerData, flowType = 'registration' } = route.params as any;
  console.log(registerData);

  const handleOTPComplete = async (otp: {
    email: string;
    otp_code: string;
  }) => {
    console.log('OTP entered:', otp);
    try {
      if (flowType === 'password_reset') {
        (navigation as any).navigate('ConfirmPass', {
          email: otp.email,
          otp_code: otp.otp_code,
        });
      } else {
        const responseData = { email: otp.email, otp_code: otp.otp_code };
        const response = await OTP(responseData);
        const successMessage = response?.message || 'Otp Verified Successfully';
        Alert.alert('Success', successMessage, [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login' as never),
          },
        ]);
      }
    } catch (err: any) {
      console.error('OTP verification error:', err);
      console.log('Error', err);
      Alert.alert('Verification Failed', err?.message || 'Enter Again');
    }
  };

  const handleResend = () => {
    console.log('Resend OTP requested');

    const handleSignUp = async (values: {
      fullName: string;
      email: string;
      password: string;
      rePassword: string;
      username: string;
    }) => {
      try {
        clearError();

        // Prepare data for API
        const registerData1 = {
          email: values.email,
          name: values.fullName,
          password: values.password,
          password_confirm: values.rePassword,
          username: values.username,
        };

        console.log('Registering user with data:', registerData1);

        // Call register API
        const response = await register(registerData1);

        console.log('Registration successful:', response);

        // Show success message using the API response message
        const successMessage = response?.message;
        Alert.alert('Success', successMessage, [
          {
            text: 'OK',
          },
        ]);
      } catch (err: any) {
        console.error('Registration error:', err);
        console.log('Error', err);
      }
    };
    handleSignUp({
      fullName: registerData.name,
      email: registerData.email,
      username: registerData.username,
      password: registerData.password,
      rePassword: registerData.password_confirm,
    });
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

          {/* Big Title */}
          <View
            style={{
              marginTop: hp('2%'),
              paddingHorizontal: wp('9%'),
              marginBottom: hp('2%'),
            }}
          >
            <Text style={styles.titleBold}>OTP</Text>
            <Text style={styles.titlePink}>VERFICATION</Text>
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
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
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
});

export default OTPVerification;
