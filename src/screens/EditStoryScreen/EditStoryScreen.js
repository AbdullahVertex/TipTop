import React from 'react';
import { View, StyleSheet } from 'react-native';
import EffectsPortion from '../../components/StoryEdit/EffectsPortion';
import AppSafeAreaView from '../../components/General/SafeAreaView/SafeAreaView';

const EditStoryScreen = ({ route, navigation }) => {
  const { imageUri } = route.params;

  return (
    <AppSafeAreaView
      style={{ backgroundColor: '#111' }}
      barStyle="light-content"
    >
      <EffectsPortion imageUri={imageUri} onClose={() => navigation.goBack()} />
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },
});

export default EditStoryScreen;
