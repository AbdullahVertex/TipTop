import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ProductInfo({ 
  name = "", 
  price = "", 
  originalPrice = "", 
  rating = 0, 
  reviewCount = 0 
}) {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < rating ? '★' : '☆');
    }
    return stars.join('');
  };

  return (
    <View style={styles.container}>
      {/* Price Section */}
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{price}</Text>
        {originalPrice && originalPrice !== price && (
          <Text style={styles.originalPrice}>{originalPrice}</Text>
        )}
      </View>

      {/* Product Name */}
      <Text style={styles.productName} numberOfLines={2}>
        {name}
      </Text>

      {/* Rating Section */}
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{rating}</Text>
        <Text style={styles.stars}>{renderStars(rating)}</Text>
        <Text style={styles.reviewCount}>{reviewCount} Reviews</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    backgroundColor: '#fff',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  price: {
    fontSize: wp('6%'),
    fontWeight: '700',
    color: '#111827',
    marginRight: wp('2%'),
    fontFamily: 'System',
    letterSpacing: -0.5,
  },
  originalPrice: {
    fontSize: wp('4%'),
    fontWeight: '400',
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    fontFamily: 'System',
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    lineHeight: 24,
    marginBottom: hp('1.5%'),
    fontFamily: 'Roboto',
    letterSpacing: 0.2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: '#111827',
    marginRight: wp('1%'),
    fontFamily: 'System',
  },
  stars: {
    fontSize: wp('4%'),
    color: '#F59E0B', // Orange color for stars
    marginRight: wp('2%'),
    fontFamily: 'System',
  },
  reviewCount: {
    fontSize: wp('3.5%'),
    fontWeight: '400',
    color: '#6B7280',
    fontFamily: 'System',
  },
});
