import React, { memo } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ReviewItem = memo(({ 
  review, 
  onOptionsPress = () => {} 
}) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < rating ? '★' : '☆');
    }
    return stars.join('');
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Image source={{ uri: review.userAvatar }} style={styles.avatar} />
      
      {/* Review Content */}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.userName}>{review.userName}</Text>
          <Text style={styles.stars}>{renderStars(review.rating)}</Text>
        </View>
        <Text style={styles.comment}>{review.comment}</Text>
      </View>

      {/* Options Icon */}
      <Pressable style={styles.optionsButton} onPress={() => onOptionsPress(review)}>
        <Text style={styles.optionsIcon}>⋮</Text>
      </Pressable>
    </View>
  );
});

ReviewItem.displayName = 'ReviewItem';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  avatar: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    marginRight: wp('3%'),
  },
  content: {
    flex: 1,
    paddingRight: wp('2%'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Roboto',
  },
  stars: {
    fontSize: 14,
    color: '#F59E0B',
    fontFamily: 'Roboto',
  },
  comment: {
    fontSize: 14,
    fontWeight: '400',
    color: '#374151',
    fontFamily: 'Roboto',
    lineHeight: 20,
  },
  optionsButton: {
    width: wp('8%'),
    height: wp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsIcon: {
    fontSize: wp('5%'),
    color: '#6B7280',
    fontFamily: 'System',
    fontWeight: '600',
  },
});

export default ReviewItem;
