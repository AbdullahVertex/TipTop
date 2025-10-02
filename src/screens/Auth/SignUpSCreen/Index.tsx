import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppSafeAreaView from '../../../components/General/SafeAreaView/SafeAreaView';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LabeledPasswordInput from '../../../components/General/TextInput/SignUpTextInput';
import ContinueButton from '../../../components/General/Button/button1';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuthApi } from '../../../hooks/useApi';
import PrimaryColors from '../../../constants/colors';
import Toast from 'react-native-toast-message';

// ✅ Validation schema
const SignUpSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Full Name must be at least 3 characters')
    .required('Full Name is required'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  username: Yup.string()
    .min(6, 'Enter another Username')
    .required('Username is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  rePassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please re-type your password'),
});

const SignUpScreen = ({ navigation }: { navigation: any }) => {
  const { register, loading, error, clearError } = useAuthApi();
  const [apiError, setApiError] = useState('');

  const handleSignUp = async (values: {
    fullName: string;
    email: string;
    username: string;
    password: string;
    rePassword: string;
  }) => {
    try {
      setApiError('');
      clearError();

      const registerData = {
        email: values.email,
        name: values.fullName,
        password: values.password,
        password_confirm: values.rePassword,
        username: values.username,
      };

      const response = await register(registerData);

      // ✅ Success toast
      Toast.show({
        type: 'success',
        text1: 'Account Created 🎉',
        text2: response?.message || 'Account created successfully!',
      });

      // ✅ Navigate after a short delay so toast is visible
      setTimeout(() => {
        navigation.navigate('OTP', { registerData });
      }, 1200);
    } catch (err: any) {
      console.error('Registration error:', err);
      setApiError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <AppSafeAreaView style={{ flex: 1 }}>
      <Modal
        transparent
        visible={loading}
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loaderText}>Logging in...</Text>
        </View>
      </Modal>
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
              paddingHorizontal: wp('3%'),
              marginBottom: hp('2%'),
            }}
          >
            <Text style={styles.titleBold}>SIGN UP &</Text>
            <Text style={styles.titlePink}>START JOURNEY</Text>
          </View>

          {/* Formik Form */}
          <Formik
            initialValues={{
              fullName: '',
              email: '',
              username: '',
              password: '',
              rePassword: '',
            }}
            validationSchema={SignUpSchema}
            onSubmit={handleSignUp}
          >
            {({ handleChange, handleSubmit, touched, values, errors }) => (
              <>
                <LabeledPasswordInput
                  label=" Enter Full Name"
                  placeholder="Enter Your Full Name"
                  value={values.fullName}
                  onChangeText={handleChange('fullName')}
                  error={errors.fullName}
                  secureTextEntry={false}
                  touched={touched.fullName}
                />
                <LabeledPasswordInput
                  label="Username"
                  placeholder="Enter Your Username"
                  value={values.username}
                  onChangeText={handleChange('username')}
                  secureTextEntry={false}
                  error={errors.username}
                  touched={touched.username}
                />
                <LabeledPasswordInput
                  label="Enter Email"
                  placeholder="Enter Your Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  error={errors.email}
                  secureTextEntry={false}
                  touched={touched.email}
                />
                <LabeledPasswordInput
                  label="Password"
                  placeholder="Enter Your Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  error={errors.password}
                  touched={touched.password}
                />
                <LabeledPasswordInput
                  label="Re-Type Password"
                  placeholder="Re-type Your Password"
                  value={values.rePassword}
                  onChangeText={handleChange('rePassword')}
                  error={errors.rePassword}
                  touched={touched.rePassword}
                />

                <View style={{ height: hp('3%') }} />

                {/* API Error Display */}
                {(error || apiError) && (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error || apiError}</Text>
                  </View>
                )}

                <ContinueButton
                  buttonStyle={{
                    backgroundColor: loading ? '#666666' : '#454545',
                    marginHorizontal: wp(6),
                    opacity: loading ? 0.7 : 1,
                  }}
                  secondStyle={{ color: 'white' }}
                  title={loading ? 'Creating Account...' : 'Create Account'}
                  onPress={handleSubmit as any}
                  disabled={loading}
                />
              </>
            )}
          </Formik>

          {/* Terms */}
          <View style={styles.termsWrap}>
            <Text style={styles.terms}>
              By proceeding forward, You agree to the,
            </Text>
            <View
              style={{
                flexDirection: 'row',
                gap: 6,
                marginTop: 2,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.linkBold}>Privacy Policy</Text>
              <Text style={styles.terms}>and</Text>
              <Text style={styles.linkBold}>Terms of Use</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
    fontSize: wp('8%'),
    fontFamily: 'benzin-bold',
    color: '#111111',
    letterSpacing: 0.5,
  },
  titlePink: {
    marginTop: hp('1%'),
    fontSize: wp('8%'),
    fontFamily: 'benzin-bold',
    color: PrimaryColors.BRAND_PINK,
    letterSpacing: 0.5,
  },
  loaderOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    color: '#fff',
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  termsWrap: {
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  terms: {
    color: '#9E9E9E',
    fontSize: wp('3.5%'),
    textAlign: 'center',
  },
  linkBold: {
    color: '#7D7D7D',
    fontSize: wp('3.5%'),
    fontWeight: '700',
  },
  errorContainer: {
    marginHorizontal: wp(6),
    marginBottom: hp('2%'),
    padding: wp('3%'),
    backgroundColor: '#FFEBEE',
    borderRadius: wp('2%'),
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: wp('3.5%'),
    textAlign: 'center',
  },
});

export default SignUpScreen;
