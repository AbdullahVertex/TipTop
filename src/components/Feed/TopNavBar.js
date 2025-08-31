import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const TopNavBar = ({
  title = 'Timeline',
  notificationsCount = 0,
  onBellPress,
  onSearchPress,
  onAddPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Left - Notification */}
      <TouchableOpacity onPress={onBellPress} style={styles.iconWrapper}>
        <Icon name="notifications-outline" size={hp('3%')} color="#000" />
        {notificationsCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{notificationsCount}</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Right icons */}
      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={onSearchPress} style={styles.iconWrapper}>
          <Icon name="search-outline" size={hp('3%')} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onAddPress} style={styles.iconWrapper}>
          <Icon name="add" size={hp('3.4%')} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.2%'),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconWrapper: {
    position: 'relative',
    marginHorizontal: wp('1.5%'),
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: '#FF3B30',
    borderRadius: wp('3%'),
    minWidth: wp('4.8%'),
    height: wp('4.8%'),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: hp('1.4%'),
    fontWeight: '700',
  },
  title: {
    fontSize: hp('2.2%'),
    fontWeight: '700',
    color: '#000',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TopNavBar;
