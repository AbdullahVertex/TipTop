import React, { memo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ReviewsHeader from './ReviewsHeader/ReviewsHeader';
import ReviewItem from './ReviewItem/ReviewItem';

const ReviewsSection = memo(({ 
  reviews = {} 
}) => {
  const { overallRating = 4.9, totalReviews = 1000, ratingBreakdown = [], recentReviews = [] } = reviews;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Reviews</Text>
      
      {/* Reviews Header with Overall Rating and Distribution */}
      <ReviewsHeader 
        overallRating={overallRating}
        totalReviews={totalReviews}
        ratingBreakdown={ratingBreakdown}
      />

      {/* Individual Reviews */}
      <View style={styles.reviewsList}>
        {recentReviews.map((review) => (
          <ReviewItem 
            key={review.id}
            review={review}
            onOptionsPress={(review) => console.log('Options for:', review.userName)}
          />
        ))}
      </View>

      {/* ALL REVIEWS Text - Bottom Right */}
      <View style={styles.allReviewsContainer}>
        <Pressable style={styles.allReviewsButton} onPress={() => console.log('View all reviews')}>
          <Text style={styles.allReviewsText}>ALL REVIEWS</Text>
        </Pressable>
      </View>
    </View>
  );
});

ReviewsSection.displayName = 'ReviewsSection';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: hp('2%'),
    fontFamily: 'Roboto',
    letterSpacing: 0.5,
  },
  reviewsList: {
    marginBottom: hp('2%'),
  },
  allReviewsContainer: {
    alignItems: 'flex-end',
    marginTop: hp('2%'),
  },
  allReviewsButton: {
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
  },
  allReviewsText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F59E0B',
    fontFamily: 'Roboto',
    letterSpacing: 0.5,
  },
});

export default ReviewsSection;
