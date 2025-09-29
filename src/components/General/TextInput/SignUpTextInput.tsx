import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface Props {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string; // Validation error message
}

const LabeledPasswordInput: React.FC<Props> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = true,
  error,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <View
        style={[
          styles.inputRow,
          error ? { borderColor: 'red', borderWidth: 1 } : {},
        ]}
      >
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#A6A6A6"
          style={styles.input}
          secureTextEntry={secureTextEntry && !visible}
          value={value}
          autoCapitalize="none"
          onChangeText={onChangeText}
        />
        {secureTextEntry && (
          <Ionicons
            name={visible ? 'eye-off-outline' : 'eye-outline'}
            size={wp('5%')}
            color="#9F9F9F"
            onPress={() => setVisible(prev => !prev)}
          />
        )}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: hp('2%'),
  },
  label: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: '#111111',
    paddingHorizontal: wp('6%'),
    marginBottom: hp('1%'),
  },
  inputRow: {
    height: hp('7%'),
    backgroundColor: 'rgba(250, 250, 250, 1)',
    paddingHorizontal: wp('4%'),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp('2%'),
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(250, 250, 250, 1)',
    fontSize: wp('4%'),
    color: '#111111',
  },
  errorText: {
    color: 'red',
    fontSize: wp('3.5%'),
    marginTop: hp('0.5%'),
    paddingHorizontal: wp('6%'),
  },
});

export default LabeledPasswordInput;
