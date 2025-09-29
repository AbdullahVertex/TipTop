import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Text,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import PrimaryColors from '../../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface CustomTextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  password?: boolean;
  error?: string;
  touched?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  placeholder,
  value,
  onChangeText,
  onBlur,
  password = false,
  error,
  touched,
}) => {
  const [secure, setSecure] = useState(password);

  return (
    <View style={{ marginBottom: hp('1.5%') }}>
      <View
        style={[
          styles.inputWrapper,
          touched && error ? { borderColor: 'red' } : {},
        ]}
      >
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#FFFFFFCC"
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          autoCapitalize="none"
          secureTextEntry={secure}
        />
        {password && (
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Feather
              name={secure ? 'eye' : 'eye-off'}
              size={wp('5%')}
              color="#FFFFFFCC"
            />
          </TouchableOpacity>
        )}
      </View>
      {touched && error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: PrimaryColors.White10percent_Opacity,
    borderColor: PrimaryColors.White30percent_Opacity,
    paddingHorizontal: wp('5%'),
    paddingVertical: Platform.OS === 'android' ? hp('1.0%') : hp('2.2%'),
    borderRadius: 10,
    marginVertical: hp('1.2%'),
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: wp('4%'),
  },
  errorText: {
    color: 'red',
    fontSize: wp('3.5%'),
    marginTop: hp('0.5%'),
    marginLeft: wp('1%'),
  },
});

export default CustomTextInput;
