import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SettingsSection = ({ title, children, style2 }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={[styles.sectionContent, style2]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: hp('3%'),
  },
  sectionTitle: {
    fontSize: wp('5%'),
    fontWeight: '600',
    color: '#000000',
    marginBottom: hp('1%'),
    paddingHorizontal: wp('5%'),
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
  },
});

export default SettingsSection;
