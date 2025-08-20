// navigation/BottomNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Tabs/HomeScreen';
import SearchScreen from '../screens/Tabs/SearchScreen';
import CustomTabBar from '../screens/Tabs/CustomTabBar';
import LiveStreamNavigation from './LiveStreamStack';
import GamesTabScreen from '../screens/Tabs/GamesTabScreen';
import ProfileScreen from '../screens/Tabs/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="LiveStream" component={LiveStreamNavigation} />
      <Tab.Screen name="Games" component={GamesTabScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
