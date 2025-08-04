import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    title: 'FROM AROUND\nTHE WORLD',
    description: 'Share your talent with the\npeople around the world',
    image: require('../../assets/images/Onboarding.png'),
  },
  {
    id: 2,
    title: 'EXPRESS\nYOURSELF',
    description: 'Create, share and grow\nwith confidence',
    image: require('../../assets/images/Onboarding.png'),
  },
  {
    id: 3,
    title: 'GET\nDISCOVERED',
    description: 'Be seen by millions and\ngain opportunities',
    image: require('../../assets/images/Onboarding.png'),
  },
];

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const scrollRef = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleScroll = event => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slideIndex);
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      scrollRef.current.scrollTo({
        x: width * (currentSlide + 1),
        animated: true,
      });
    } else {
      navigation.navigate('Login');
    }
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
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          ref={scrollRef}
        >
          {slides.map(slide => (
            <View key={slide.id} style={styles.slide}>
              <Image
                source={slide.image}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.description}>{slide.description}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.dotsContainer}>
            {slides.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, currentSlide === i && styles.activeDot]}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>
              {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('7%'),
  },
  image: {
    width: '100%',
    height: hp('43%'),
    marginBottom: hp('4%'),
  },
  title: {
    fontSize: wp('7%'),
    fontFamily: 'benzin-bold',
    color: '#fff',
    textAlign: 'center',
    lineHeight: wp('9%'),
    marginBottom: hp('1.2%'),
  },
  description: {
    fontSize: wp('4.6%'),
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: hp('1%'),
    textAlign: 'center',
    lineHeight: wp('6.4%'),
  },
  footer: {
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('5%'),
    marginTop: hp('4%'),
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: hp('2.5%'),
  },
  dot: {
    width: wp('11%'),
    height: 1.2,
    borderRadius: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: wp('0.8%'),
  },
  activeDot: {
    backgroundColor: '#fff',
    width: wp('11%'),
  },
  button: {
    backgroundColor: '#8988D9',
    paddingVertical: hp('2.5%'),
    borderRadius: 12,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: wp('4.3%'),
  },
});
