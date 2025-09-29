import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ContinueButton from '../../../components/General/Button/button1';
import GoogleButton from '../../../components/General/Button/GoogleButton';
import PrimaryColors from '../../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomTextInput from '../../../components/General/TextInput/CustomTextInput';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { login as loginAction } from '../../../store/slices/authSlice';
import { useAuthApi } from '../../../hooks/useApi';

// ✅ Validation schema with Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password should be at least 6 characters')
    .required('Password is required'),
});

const LoginInScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { login, loading } = useAuthApi(); // custom hook API
  const { error, user } = useAppSelector(state => state.auth);

  const [apiError, setApiError] = useState('');

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      setApiError('');

      const loginData = { email: values.email, password: values.password };
      const result = await login(loginData); // call API

      if (result?.user && result?.tokens) {
        // ✅ Save to Redux
        dispatch(
          loginAction({
            user: result.user,
            tokens: result.tokens,
          }),
        );

        Alert.alert(
          'Success',
          `Welcome back, ${result.user.first_name || result.user.email}!`,
          [{ text: 'OK', onPress: () => navigation.navigate('Home' as never) }],
        );
      } else {
        throw new Error(result?.message || 'Login failed');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setApiError(err.message || 'Login failed. Please try again.');
    }
  };

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
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <View style={styles.content}>
                  <Text style={styles.signIn}>SIGN IN</Text>
                  <Text style={styles.continue}>TO CONTINUE</Text>

                  {/* Email input */}
                  <CustomTextInput
                    placeholder="Enter Your Email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={errors.email}
                    touched={touched.email}
                  />

                  {/* Password input */}
                  <CustomTextInput
                    placeholder="Enter Password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    password={true}
                    error={errors.password}
                    touched={touched.password}
                  />

                  <TouchableOpacity
                    style={styles.forgot}
                    onPress={() => navigation.navigate('ForgotPass')}
                  >
                    <Text style={styles.forgotText}>Forget Password?</Text>
                  </TouchableOpacity>

                  {/* Error Display */}
                  {(error || apiError) && (
                    <View style={styles.errorContainer}>
                      <Text style={styles.errorText}>{error || apiError}</Text>
                    </View>
                  )}

                  <ContinueButton
                    title={loading ? 'Logging In...' : 'Log In'}
                    onPress={handleSubmit as any}
                    buttonStyle={{
                      opacity: loading ? 0.7 : 1,
                    }}
                  />
                </View>

                <TouchableOpacity
                  onPress={() => navigation.navigate('Signup')}
                  style={styles.createAccount}
                >
                  <Text style={styles.createAccountText}>
                    Create account here
                  </Text>
                </TouchableOpacity>

                <View style={styles.content2}>
                  <View style={styles.dividerWrapper}>
                    <View style={styles.line} />
                    <Text style={styles.dividerText}>Continue With</Text>
                    <View style={styles.line} />
                  </View>

                  <GoogleButton onPress={() => console.log('Google Sign-In')} />

                  <Text style={styles.terms}>
                    By proceeding forward, You agree to the,
                    <Text style={styles.link}> Privacy Policy </Text>
                    and
                    <Text style={styles.link}> Terms of Use</Text>
                  </Text>
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    padding: wp('7%'),
    paddingTop: Platform.OS === 'android' ? hp('5%') : wp('7%'),
    justifyContent: 'center',
  },
  signIn: {
    textAlign: 'center',
    fontSize: wp('7.5%'),
    fontFamily: 'benzin-bold',
    color: '#fff',
  },
  continue: {
    textAlign: 'center',
    fontFamily: 'benzin-bold',
    fontSize: wp('6.5%'),
    color: 'rgba(255,255,255,0.5)',
    marginBottom: hp('3.5%'),
  },
  forgot: {
    alignItems: 'flex-end',
    marginVertical: hp('1.2%'),
  },
  forgotText: {
    color: '#fff',
    fontSize: wp('3.8%'),
  },
  createAccount: {
    backgroundColor: '#8988D9',
    paddingVertical: hp('3%'),
    width: '100%',
  },
  createAccountText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: wp('4%'),
  },
  dividerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('3.5%'),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#fff',
  },
  dividerText: {
    marginHorizontal: wp('3%'),
    color: '#fff',
    fontSize: wp('4.5%'),
  },
  terms: {
    color: '#fff',
    textAlign: 'center',
    fontSize: wp('4%'),
    marginTop: hp('2.5%'),
    lineHeight: wp('6.5%'),
  },
  link: {
    fontWeight: '700',
    color: '#fff',
  },
  content2: {
    padding: wp('7%'),
    justifyContent: 'center',
  },
  errorContainer: {
    marginVertical: hp('1%'),
    padding: wp('3%'),
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderRadius: wp('2%'),
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  errorText: {
    color: '#FFCDD2',
    fontSize: wp('3.5%'),
    textAlign: 'center',
  },
});

export default LoginInScreen;
