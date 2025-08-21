import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ReviewsHeader = memo(({ 
  overallRating = 4.9, 
  totalReviews = 1000, 
  ratingBreakdown = [] 
}) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < rating ? '★' : '☆');
    }
    return stars.join('');
  };

  const renderRatingBar = (stars, count, percentage) => (
    <View key={stars} style={styles.ratingBarContainer}>
      <Text style={styles.starLabel}>{renderStars(stars)}</Text>
      <View style={styles.barContainer}>
        <View style={[styles.bar, { width: `${percentage}%` }]} />
      </View>
      <Text style={styles.countText}>{count}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Left Side - Overall Rating */}
      <View style={styles.overallRating}>
        <Text style={styles.ratingNumber}>{overallRating}</Text>
        <Text style={styles.stars}>{renderStars(overallRating)}</Text>
        <Text style={styles.totalReviews}>{totalReviews} Reviews</Text>
      </View>

      {/* Right Side - Rating Distribution */}
      <View style={styles.ratingDistribution}>
        {ratingBreakdown.map((item) => 
          renderRatingBar(item.stars, item.count, item.percentage)
        )}
      </View>
    </View>
  );
});

ReviewsHeader.displayName = 'ReviewsHeader';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: hp('3%'),
  },
  overallRating: {
    flex: 1,
    alignItems: 'flex-start',
    paddingRight: wp('4%'),
  },
  ratingNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Roboto',
    marginBottom: hp('0.5%'),
  },
  stars: {
    fontSize: 16,
    color: '#F59E0B',
    fontFamily: 'Roboto',
    marginBottom: hp('0.5%'),
  },
  totalReviews: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6B7280',
    fontFamily: 'Roboto',
  },
  ratingDistribution: {
    flex: 1,
    paddingLeft: wp('2%'),
  },
  ratingBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  starLabel: {
    fontSize: wp('3.5%'),
    fontWeight: '400',
    color: '#111827',
    fontFamily: 'System',
    width: wp('15%'),
  },
  barContainer: {
    flex: 1,
    height: hp('1%'),
    backgroundColor: '#F3F4F6',
    borderRadius: hp('0.5%'),
    marginHorizontal: wp('2%'),
  },
  bar: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: hp('0.5%'),
  },
  countText: {
    fontSize: wp('3.5%'),
    fontWeight: '400',
    color: '#6B7280',
    fontFamily: 'System',
    width: wp('12%'),
    textAlign: 'right',
  },
});

export default ReviewsHeader;
