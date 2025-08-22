import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PrimaryColors from '../../../constants/colors';
import Switch from '../../General/Switch/Switch';
import LinearGradient from 'react-native-linear-gradient';

const SettingsItem = ({
  icon,
  title,
  subtitle,
  onPress,
  showArrow = false,
  showToggle = false,
  toggleValue = false,
  onToggleChange,
  showEditIcon = false,
  onEditPress,
  switchActiveColor = PrimaryColors.PurpleText,
  switchInactiveColor = '#E5E7EB',
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.leftSection}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>

      <View style={styles.rightSection}>
        {showEditIcon && (
          <TouchableOpacity onPress={onEditPress} style={styles.editButton}>
            <Icon name="create-outline" size={wp('4%')} color="#CB65EF" />
          </TouchableOpacity>
        )}

        {showToggle && (
          <Switch
            value={toggleValue}
            onValueChange={onToggleChange}
            activeColor={switchActiveColor}
            inactiveColor={switchInactiveColor}
          />
        )}
        {title === 'Account Settings' ? (
          <LinearGradient
            colors={['#F61D80', '#8774FF', '#343DFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ alignItems: 'center', borderRadius: 40 }}
          >
            <Text
              style={{
                color: 'white',
                paddingHorizontal: wp(3),
                lineHeight: wp(5),
              }}
            >
              0.00$
            </Text>
          </LinearGradient>
        ) : (
          showArrow && (
            <Icon name="chevron-forward" size={wp('5%')} color="#9CA3AF" />
          )
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
    paddingVertical: hp('1.5%'),
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
    width: wp('6%'),
    height: wp('6%'),
    marginRight: wp('3%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: wp('4%'),
    color: '#333',
    fontWeight: '500',
  },
  subtitle: {
    fontSize: wp('3.5%'),
    color: '#666',
    marginTop: hp('0.2%'),
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    marginRight: wp('2%'),
  },
});

export default SettingsItem;
