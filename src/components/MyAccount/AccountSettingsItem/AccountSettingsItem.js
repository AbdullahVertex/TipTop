import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const AccountSettingsItem = ({
  iconImage, // expects a local image source, e.g. require('../../assets/images/icon.png')
  title,
  onPress,
  showArrow = true,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={['#F61D80', '#8774FF', '#343DFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            <View style={styles.iconWrapper}>
              {iconImage && (
                <Image
                  source={iconImage}
                  style={styles.iconImage}
                  resizeMode="contain"
                />
              )}
            </View>
          </LinearGradient>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        {showArrow && (
          <View style={styles.arrowContainer}>
            <Icon name="chevron-forward" size={wp('5%')} color="#9CA3AF" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('5%'),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    borderRadius: 20,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: wp('4%'),
    borderRadius: 8,
    overflow: 'hidden',
  },
  gradientBackground: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  iconImage: {
    width: wp('4%'),
    height: wp('4%'),
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: wp('4.2%'),
    color: '#000',
    fontWeight: '400',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowContainer: {
    width: wp('5%'),
    height: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: wp('5%'),
    color: '#9CA3AF',
    fontWeight: '300',
  },
});

export default AccountSettingsItem;
