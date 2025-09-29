import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AppSafeAreaView from '../../../components/General/SafeAreaView/SafeAreaView';
import Header from '../../../components/General/Headers/GeneralHeader';
import { wp } from '../../../utils/helpers/responsive';
import GradientButton from '../../../components/General/Button/GradientButton';
import { useNavigation } from '@react-navigation/native';
import LabeledPasswordInput from '../../../components/General/TextInput/SignUpTextInput';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuthApi } from '../../../hooks/useApi';

// ✅ Validation schema with Yup
const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email address')
    .required('Email is required'),
});

const ForgotPassScreen = () => {
  const navigation = useNavigation();
  const { resetPassword, loading, error, clearError } = useAuthApi();
  const [apiError, setApiError] = useState('');

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setApiError('');
      clearError();

      // Prepare data for API
      const resetData = {
        email: values.email,
      };

      console.log('Sending password reset request for:', resetData);

      // Call API
      const result = await resetPassword(resetData);

      if (result?.message) {
        // Show success message
        Alert.alert(
          'Success',
          'Password reset instructions have been sent to your email.',
          [
            {
              text: 'OK',
              onPress: () => {
                // Navigate to OTP verification screen for password reset
                navigation.navigate('OTP', {
                  registerData: { email: values.email },
                  flowType: 'password_reset',
                });
              },
            },
          ],
        );
      } else {
        throw new Error(result?.message || 'Failed to send reset instructions');
      }
    } catch (err) {
      console.error('Password reset error:', err);
      setApiError(
        err.message || 'Failed to send reset instructions. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppSafeAreaView>
      <Header title="Forgot Password" />
      <Text style={styles.Heading}>
        Enter your email and we will send you instructions on how to reset it
      </Text>

      <Formik
        initialValues={{ email: '' }}
        validationSchema={ForgotPasswordSchema}
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
              label={'Email'}
              secureTextEntry={false}
              placeholder={'Enter your email'}
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={errors.email}
              touched={touched.email}
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
              title={loading ? 'Sending...' : 'Send Instructions'}
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

export default ForgotPassScreen;
