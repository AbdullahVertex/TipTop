import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import AppSafeAreaView from '../../../components/General/SafeAreaView/SafeAreaView';
import Header from '../../../components/General/Headers/GeneralHeader';
import { useNavigation } from '@react-navigation/native';
import { hp } from '../../../utils/helpers/responsive';
import LanguageOption from '../../../components/LanguageSelection/Language_Bar';
import { ScrollView } from 'react-native-gesture-handler';
import LanguageSettingsOption from '../../../components/LanguageSettingsOption/LanguageSettingsOption';

const languages = [
  { native: 'عربي', english: 'Arabic' },
  { native: 'dansk', english: 'Danish' },
  { native: 'हिंदी', english: 'Hindi' },
  { native: 'bahasha Indonesia', english: 'Indonesian' },
  { native: 'français', english: 'French' },
  { native: 'español', english: 'Spanish' },
  { native: 'русский', english: 'Russian' },
  { native: '中文', english: 'Chinese' },
];
const LanguageSettingScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigation = useNavigation();

  return (
    <AppSafeAreaView>
      <Header title="Languages" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {languages.map((lang, index) => (
          <LanguageSettingsOption
            key={index}
            selected={index === selectedIndex}
            onPress={() => setSelectedIndex(index)}
            nativeText={lang.native}
            englishText={lang.english}
          />
        ))}
      </ScrollView>
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  scrollContent: {
    paddingBottom: hp('5%'),
  },
});

export default LanguageSettingScreen;
