import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PrimaryColors from '../../../constants/colors';
import { OtpInput } from 'react-native-otp-entry';

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  onResend?: () => void;
  email?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 5,
  onComplete,
  onResend,
  email = 'john.jerry@gmail.com',
}) => {
  const [otp, setOtp] = useState(''); // ✅ keep OTP as a string
  const [timeLeft, setTimeLeft] = useState(152); // 2:32 in seconds
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const handleResend = () => {
    if (onResend) {
      onResend();
      setTimeLeft(152);
      setOtp(''); // ✅ reset string

      inputRefs.current[0]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {/* Instruction Text */}
      <Text style={styles.instructionText}>
        Enter the code from the sms we sent to{' '}
        <Text style={styles.emailText}>{email}</Text>
      </Text>

      {/* Timer */}
      <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>

      {/* OTP Input Fields */}
      <OtpInput
        numberOfDigits={length}
        autoFocus={true}
        blurOnFilled={true}
        disabled={false}
        type="numeric"
        secureTextEntry={false}
        focusStickBlinkingDuration={500}
        onFocus={() => console.log('Focused')}
        onBlur={() => console.log('Blurred')}
        onTextChange={setOtp} // ✅ keeps OTP updated as string
        onFilled={setOtp} // ✅ sets OTP string when complete
        textInputProps={{
          accessibilityLabel: 'One-Time Password',
        }}
        textProps={{
          accessibilityRole: 'text',
          accessibilityLabel: 'OTP digit',
          allowFontScaling: false,
        }}
        theme={{
          containerStyle: styles.otpContainer,
          pinCodeContainerStyle: styles.otpInput,
          pinCodeTextStyle: styles.otpText,
          focusedPinCodeContainerStyle: styles.otpInputFocused,
        }}
      />

      {/* Resend Text */}
      <TouchableOpacity onPress={handleResend} style={styles.resendContainer}>
        <Text style={styles.resendText}>
          I didn't receive any code.{' '}
          <Text style={styles.resendLink}>RESEND</Text>
        </Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => onComplete(otp)} // ✅ send OTP string to parent
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  instructionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  emailText: {
    color: PrimaryColors.BRAND_PINK,
    fontWeight: '600',
  },
  timerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    gap: 12,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  otpInputFocused: {
    borderColor: PrimaryColors.BRAND_PINK,
    borderWidth: 2,
    shadowColor: PrimaryColors.BRAND_PINK,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  otpText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  resendText: {
    fontSize: 14,
    color: '#666',
  },
  resendLink: {
    color: PrimaryColors.BRAND_PINK,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: PrimaryColors.BRAND_PINK,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 40,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OTPInput;
