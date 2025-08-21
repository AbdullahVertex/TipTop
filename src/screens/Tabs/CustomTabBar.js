import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeIcon from '../../assets/svgs/HomeSimple.svg';
import HomeIconFilled from '../../assets/svgs/Home.svg';
import ShopIcon1 from '../../assets/svgs/ShopIcon1.svg';
import ShopColored from '../../assets/svgs/ShopColored.svg';
import GameColored from '../../assets/svgs/GameColored.svg';
import Game from '../../assets/svgs/Game.svg';
import LiveIcon from '../../assets/svgs/LiveStreamSimple.svg';
import LiveIconFilled from '../../assets/svgs/LiveStream.svg';
import ProfileIconColored from '../../assets/svgs/ProfileColored.svg';
import ProfileIcon from '../../assets/svgs/Profile.svg';
import Icon from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  const getIcon = (name, isFocused) => {
    const size = wp('6.5%');
    switch (name) {
      case 'Home':
        return isFocused ? (
          <HomeIconFilled width={size} height={size} />
        ) : (
          <HomeIcon width={size} height={size} />
        );
      case 'Search':
        return isFocused ? (
          <ShopColored width={39} height={38} />
        ) : (
          <ShopIcon1 width={39} height={38} />
        );
      case 'LiveStream':
        return isFocused ? (
          <LiveIconFilled width={size} height={size} />
        ) : (
          <LiveIcon width={size} height={size} />
        );
      case 'Games':
        return isFocused ? (
          <GameColored width={size} height={size} />
        ) : (
          <Game width={size} height={size} />
        );
      case 'Profile':
        return isFocused ? (
          <ProfileIconColored width={size} height={size} />
        ) : (
          <ProfileIcon width={size} height={size} />
        );
      default:
        return null;
    }
  };

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: insets.bottom > 0 ? insets.bottom : hp('1.5%') },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        if (route.name === 'Add') {
          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.addButton}
            >
              <View style={styles.plusCircle}>
                <Icon size={wp('5.5%')} color={'white'} name="plus" />
              </View>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            onPress={onPress}
            style={styles.tab}
          >
            <View
              style={[
                styles.iconWrapper,
                isFocused && styles.focusedBorder, // highlight when focused
              ]}
            >
              {getIcon(route.name, isFocused)}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingTop: hp('1.2%'),
    paddingHorizontal: wp('5%'),
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: wp('2%'),
    borderRadius: 50,
  },
  focusedBorder: {
    borderRadius: 90,
    borderWidth: 2,
    borderColor: '#C86CFA', // highlight border color
  },
  underline: {
    height: hp('0.4%'),
    width: wp('8%'),
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    marginBottom: hp('0.7%'),
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusCircle: {
    width: wp('12%'),
    height: wp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
