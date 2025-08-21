import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search Games',
  onSubmitEditing,
}) {
  const iconSize = Math.max(18, Math.min(24, wp(5))); // responsive, clamped

  return (
    <View style={styles.wrapper}>
      <Ionicons
        name="search"
        size={iconSize}
        color="#9AA0A6"
        style={styles.icon}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#B8BDC6"
        style={styles.input}
        returnKeyType="search"
        clearButtonMode="while-editing"
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: wp(5), // ~20 on 400dp width
    marginTop: hp(1.2), // ~12
    marginBottom: hp(1),
    height: hp(6.2), // ~54 on ~870dp height
    borderRadius: wp(7), // ~28 on 400dp width
    backgroundColor: '#F3F4F6',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: { marginLeft: wp(4.5), marginRight: wp(2.2) }, // ~18 / ~8
  input: {
    flex: 1,
    fontSize: wp(4.5), // ~18 on 400dp width
    color: '#111',
    paddingRight: wp(4), // ~16
  },
});
