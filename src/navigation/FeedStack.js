// src/Navigation.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedScreen from '../screens/FeedScreen/FeedScreen';
import EditStoryScreen from '../screens/EditStoryScreen/EditStoryScreen';

const Stack = createNativeStackNavigator();

const FeedStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Feed"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="EditStory" component={EditStoryScreen} />
    </Stack.Navigator>
  );
};

export default FeedStack;
