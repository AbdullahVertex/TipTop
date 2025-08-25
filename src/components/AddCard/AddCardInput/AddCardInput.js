import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const AddCardInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#A9ACB4"
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          {...props}
        />
        {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 18,
  },
  label: {
    fontSize: 11,
    color: '#D16FFF',
    marginBottom: 2,
    marginLeft: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E0E0E0',
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    height: 56,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
    letterSpacing: 1,
  },
  icon: {
    marginHorizontal: 4,
  },
});

export default AddCardInput;
