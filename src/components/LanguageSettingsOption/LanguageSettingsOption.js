import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const LanguageSettingsOption = ({
  selected,
  onPress,
  nativeText,
  englishText,
}) => {
  // Gradient colors (customize as you wish)
  const gradientColors = ['rgba(168, 85, 247, 1)', 'rgba(244, 114, 182, 1)'];

  // The container content
  const content = (
    <>
      <View style={styles.radioWrapper}>
        <View style={styles.radioOuter}>
          {selected && <View style={styles.radioInner} />}
        </View>
      </View>
      <View style={styles.textWrapper}>
        <Text style={[styles.nativeText, selected && styles.selectedText]}>
          {nativeText}
        </Text>
        <Text style={[styles.englishText, selected && styles.selectedText]}>
          {englishText}
        </Text>
      </View>
    </>
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.wrapper}
    >
      {selected ? (
        <LinearGradient
          colors={gradientColors}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.container, styles.selectedContainer]}
        >
          {content}
        </LinearGradient>
      ) : (
        <View style={styles.container}>{content}</View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: hp('0.8%'),
    marginHorizontal: wp('4%'),
  },
  container: {
    borderRadius: 12,
    flexDirection: 'row',
    paddingVertical: Platform.OS === 'android' ? hp('1.6%') : undefined,
    paddingHorizontal: Platform.OS === 'android' ? wp('5%') : undefined,
    height: Platform.OS === 'ios' ? hp(9) : undefined,
    width: Platform.OS === 'ios' ? '100%' : undefined,
    backgroundColor: 'rgba(243, 243, 243, 1)',
    alignItems: 'center',
  },
  selectedContainer: {
    borderWidth: 1.5,
    borderColor: '#fff',
    // backgroundColor is handled by LinearGradient
  },
  radioWrapper: {
    marginRight: wp('4%'),
    paddingHorizontal: Platform.OS === 'ios' ? wp(2) : undefined,
  },
  radioOuter: {
    width: wp('5.5%'),
    height: wp('5.5%'),
    borderRadius: wp('2.75%'),
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  radioInner: {
    width: wp('2.5%'),
    height: wp('2.5%'),
    borderRadius: wp('1.25%'),
    backgroundColor: '#fff',
  },
  textWrapper: {
    paddingHorizontal: Platform.OS === 'ios' ? wp(1) : undefined,
    flexDirection: 'column',
  },
  nativeText: {
    color: 'black',
    fontSize: wp('4.2%'),
    fontWeight: '400',
  },
  englishText: {
    color: 'black',
    fontSize: wp('4.2%'),
    fontWeight: '600',
  },
  selectedText: {
    color: '#fff',
  },
});

export default LanguageSettingsOption;
