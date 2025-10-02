import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AppSafeAreaView from '../../../components/General/SafeAreaView/SafeAreaView';
import Header from '../../../components/General/Headers/GeneralHeader';
import { wp } from '../../../utils/helpers/responsive';
import GradientButton from '../../../components/General/Button/GradientButton';
import LabeledPasswordInput from '../../../components/General/TextInput/SignUpTextInput';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuthApi } from '../../../hooks/useApi';
import Toast from 'react-native-toast-message';
import PrimaryColors from '../../../constants/colors';

// ✅ Validation schema
const ConfirmPasswordSchema = Yup.object().shape({
  new_password: Yup.string()
    .min(6, 'Password should be at least 6 characters')
    .required('New password is required'),
  new_password_confirm: Yup.string()
    .oneOf([Yup.ref('new_password')], 'Passwords must match')
    .required('Password confirmation is required'),
});

const ConfirmPassScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { confirmPasswordReset, loading, error, clearError } = useAuthApi();
  const { email, otp_code } = route.params as any;
  const [apiError, setApiError] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  // Handle form submission
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      setApiError('');
      clearError();
      setShowLoader(true);

      const resetData = {
        email: email,
        otp_code: otp_code,
        new_password: values.new_password,
        new_password_confirm: values.new_password_confirm,
        logout_all_devices: true,
      };

      console.log('Confirming password reset with data:', resetData);

      const result = await confirmPasswordReset(resetData);

      if (result?.message) {
        Toast.show({
          type: 'success',
          text1: 'Reset Successful',
          text2:
            result?.message || 'Your password has been reset successfully.',
        });

        setTimeout(() => {
          setShowLoader(false);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' as never }],
          });
        }, 1000);
      } else {
        throw new Error(result?.message || 'Failed to reset password');
      }
    } catch (err: any) {
      console.error('Password reset confirmation error:', err);
      setShowLoader(false);
      setApiError(err.message || 'Failed to reset password. Please try again.');

      Toast.show({
        type: 'error',
        text1: 'Reset Failed ',
        text2: err?.message || 'Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppSafeAreaView style={{ flex: 1 }}>
      <Header title="Reset Password" />
      <Text style={styles.Heading}>
        Enter your new password to complete the reset process
      </Text>

      <Formik
        initialValues={{ new_password: '', new_password_confirm: '' }}
        validationSchema={ConfirmPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <>
            <LabeledPasswordInput
              label={'New Password'}
              placeholder={'Enter new password'}
              value={values.new_password}
              onChangeText={handleChange('new_password')}
              onBlur={handleBlur('new_password')}
              error={errors.new_password}
              touched={touched.new_password}
              secureTextEntry={true}
            />

            <LabeledPasswordInput
              label={'Confirm Password'}
              placeholder={'Confirm new password'}
              value={values.new_password_confirm}
              onChangeText={handleChange('new_password_confirm')}
              onBlur={handleBlur('new_password_confirm')}
              error={errors.new_password_confirm}
              touched={touched.new_password_confirm}
              secureTextEntry={true}
            />

            {/* API Error Display */}
            {(error || apiError) && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error || apiError}</Text>
              </View>
            )}

            <GradientButton
              onPress={handleSubmit as any}
              disabled={loading || isSubmitting || showLoader}
              title={loading || showLoader ? 'Resetting...' : 'Reset Password'}
            />
          </>
        )}
      </Formik>

      {/* ✅ Fullscreen Loader */}
      {showLoader && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={PrimaryColors.BRAND_PINK} />
          <Text style={styles.loadingText}>Resetting Password...</Text>
        </View>
      )}
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  Heading: {
    paddingHorizontal: wp(10),
    textAlign: 'center',
    fontWeight: '400',
    fontSize: wp(4),
    marginBottom: wp(5),
  },
  errorContainer: {
    marginVertical: wp('2%'),
    padding: wp('3%'),
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderRadius: wp('2%'),
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  errorText: {
    color: '#F44336',
    fontSize: wp('3.5%'),
    textAlign: 'center',
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

export default ConfirmPassScreen;
