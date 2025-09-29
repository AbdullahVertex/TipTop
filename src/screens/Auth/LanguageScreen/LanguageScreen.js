import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  StatusBar,
  View,
  SafeAreaView,
  Platform,
} from 'react-native';
import LanguageOption from '../../../components/LanguageSelection/Language_Bar';
import LinearGradient from 'react-native-linear-gradient';
import ContinueButton from '../../../components/General/Button/button1';
import SelectLanguage from '../../../assets/svgs/SelectLanguage.svg';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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

const LanguageSelectionScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate('Onboarding');
  };

  return (
    <LinearGradient
      colors={['#ff0066', '#9999ff', '#3333ff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <SafeAreaView style={styles.safeArea}>
        <SelectLanguage
          style={{ alignSelf: 'center' }}
          width={wp('70%')}
          height={hp('12%')}
        />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {languages.map((lang, index) => (
            <LanguageOption
              key={index}
              selected={index === selectedIndex}
              onPress={() => setSelectedIndex(index)}
              nativeText={lang.native}
              englishText={lang.english}
            />
          ))}
        </ScrollView>

        <View style={styles.buttonWrapper}>
          <ContinueButton onPress={handleContinue} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LanguageSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? hp('5%') : 0,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: hp('5%'),
  },
  buttonWrapper: {
    marginHorizontal: wp('5%'),
  },
});
