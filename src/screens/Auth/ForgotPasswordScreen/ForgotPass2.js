import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AppSafeAreaView from '../../../components/General/SafeAreaView/SafeAreaView';
import Header from '../../../components/General/Headers/GeneralHeader';
import { wp } from '../../../utils/helpers/responsive';
import GradientButton from '../../../components/General/Button/GradientButton';
import LabeledPasswordInput from '../../../components/General/TextInput/SignUpTextInput';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuthApi } from '../../../hooks/useApi';

// ✅ Validation schema with Yup
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
  const { email, otp_code } = route.params;
  const [apiError, setApiError] = useState('');

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setApiError('');
      clearError();

      // Prepare data for API
      const resetData = {
        email: email,
        otp_code: otp_code,
        new_password: values.new_password,
        new_password_confirm: values.new_password_confirm,
        logout_all_devices: true,
      };

      console.log('Confirming password reset with data:', resetData);

      // Call API
      const result = await confirmPasswordReset(resetData);

      if (result?.message) {
        // Show success message
        Alert.alert('Success', 'Your password has been reset successfully.', [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to login screen
              navigation.reset({
                // ✅ reset stack and go to login
                index: 0,
                routes: [{ name: 'Login' }],
              });
            },
          },
        ]);
      } else {
        throw new Error(result?.message || 'Failed to reset password');
      }
    } catch (err) {
      console.error('Password reset confirmation error:', err);
      setApiError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppSafeAreaView>
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
              onPress={handleSubmit}
              disabled={loading || isSubmitting}
              title={loading ? 'Resetting...' : 'Reset Password'}
            />
          </>
        )}
      </Formik>
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
});

export default ConfirmPassScreen;
