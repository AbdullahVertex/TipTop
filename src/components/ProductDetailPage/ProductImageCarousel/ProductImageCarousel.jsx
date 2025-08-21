import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width: screenWidth } = Dimensions.get('window');

export default function ProductImageCarousel({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  const scrollToIndex = (index) => {
    scrollViewRef.current?.scrollTo({
      x: index * screenWidth,
      animated: true,
    });
    setActiveIndex(index);
  };

  // Ensure we have valid images array
  const validImages = Array.isArray(images) && images.length > 0 ? images : [];

  if (!validImages.length) {
    return (
      <View style={styles.container}>
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>No Image Available</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Image Carousel */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {validImages.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image
              source={{ uri: image }}
              style={styles.productImage}
              resizeMode="contain"
            />
          </View>
        ))}
      </ScrollView>

      {/* Carousel Dots - Only show if multiple images */}
      {validImages.length > 1 && (
        <View style={styles.dotsContainer}>
          {validImages.map((_, index) => (
            <Pressable
              key={index}
              style={[
                styles.dot,
                activeIndex === index && styles.activeDot,
              ]}
              onPress={() => scrollToIndex(index)}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: hp('45%'), // Increased height for better product visibility
    backgroundColor: '#F8F9FA', // Light grey background matching the reference
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: screenWidth,
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingHorizontal: wp('4%'),
    paddingTop: hp('2%'),
  },
  productImage: {
    width: wp('60%'),
    height: wp('60%'),
    backgroundColor: '#F8F9FA', // Light grey background
    borderRadius: 12, // Rounded corners for modern look
    resizeMode: 'contain',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  placeholderText: {
    fontSize: wp('4%'),
    color: '#9CA3AF',
    fontFamily: 'System',
    fontWeight: '500',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: hp('3%'),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
  },
  dot: {
    width: wp('2.5%'),
    height: wp('2.5%'),
    borderRadius: wp('1.25%'),
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: wp('1.5%'),
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activeDot: {
    backgroundColor: '#F59E0B', // Orange color for active dot
    borderColor: '#F59E0B',
    width: wp('3%'),
    height: wp('3%'),
    borderRadius: wp('1.5%'),
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});
