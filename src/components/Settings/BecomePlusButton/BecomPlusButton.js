import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

const BecomePlus = ({
  icon,
  title,
  subtitle,
  onPress,
  showEditIcon = false,
  onEditPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={['#F472B6', '#A855F7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        <View style={styles.leftSection}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {title}
              {'  '}
            </Text>
            {subtitle && (
              <Text style={styles.subtitle}>
                {subtitle}
                {'+'}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.rightSection}>
          {showEditIcon && (
            <TouchableOpacity onPress={onEditPress} style={styles.editButton}>
              <Icon name="create-outline" size={wp('4%')} color="#CB65EF" />
            </TouchableOpacity>
          )}
          <Icon name="chevron-forward" size={wp('5%')} color="white" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: hp(1),
    justifyContent: 'flex-start',
    height: hp(5),
  },
  leftSection: {
    flexDirection: 'row',
    paddingHorizontal: wp(5),
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: wp('6%'),
    height: wp('6%'),
    marginRight: wp('3%'),

    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  title: {
    fontSize: wp('4%'),
    color: '#FFFFFF',
    fontWeight: '400',
  },
  subtitle: {
    fontSize: wp('4%'),
    color: '#FFFFFF',
    fontWeight: '700',
    marginTop: hp('0.2%'),
  },
  rightSection: {
    flexDirection: 'row',
    paddingHorizontal: wp(5),
    alignItems: 'center',
  },
  editButton: {
    marginRight: wp('2%'),
  },
  gradientBackground: {
    flex: 1,
    flexDirection: 'row',

    borderRadius: 5,
    alignItems: 'center',
  },
});

export default BecomePlus;
