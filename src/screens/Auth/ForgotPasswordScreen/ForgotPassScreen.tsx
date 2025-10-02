import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import AppSafeAreaView from '../../../components/General/SafeAreaView/SafeAreaView';
import Header from '../../../components/General/Headers/GeneralHeader';
import { wp } from '../../../utils/helpers/responsive';
import GradientButton from '../../../components/General/Button/GradientButton';
import { useNavigation } from '@react-navigation/native';
import LabeledPasswordInput from '../../../components/General/TextInput/SignUpTextInput';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
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
  const [showLoader, setShowLoader] = useState(false);

  // Handle form submission
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      setApiError('');
      clearError();
      setShowLoader(true);

      // Prepare data for API
      const resetData = { email: values.email };
      console.log('Sending password reset request for:', resetData);

      // Call API
      const result = await resetPassword(resetData);

      if (result?.message) {
        // ✅ Show success toast
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Password reset instructions have been sent to your email.',
        });

        // Navigate to OTP screen after slight delay
        setTimeout(() => {
          navigation.navigate('OTP' as never, {
            registerData: { email: values.email },
            flowType: 'password_reset',
          });
        }, 800);
      } else {
        throw new Error(result?.message || 'Failed to send reset instructions');
      }
    } catch (err: any) {
      console.error('Password reset error:', err);
      setApiError(
        err.message || 'Failed to send reset instructions. Please try again.',
      );

      // ❌ Show error toast
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: err.message || 'Failed to send reset instructions.',
      });
    } finally {
      setSubmitting(false);
      setShowLoader(false);
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

      {/* ✅ Full screen loader modal */}
      <Modal visible={showLoader} transparent animationType="fade">
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loaderText}>Please wait...</Text>
        </View>
      </Modal>
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
  loaderContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    color: '#fff',
    marginTop: 12,
    fontSize: wp(4),
    fontWeight: '500',
  },
});

export default ForgotPassScreen;
