import React, { memo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CouponCard = memo(({ 
  coupon, 
  onGetCoupon = () => {} 
}) => {
  if (!coupon) return null;

  return (
    <View style={styles.couponCard}>
      <View style={styles.couponContent}>
        <View style={styles.couponLeft}>
          <View style={styles.textContainer}>
            <Text style={styles.couponTitle}>Shoping Day Coupon</Text>
            <Text style={styles.couponSubtitle}>For every order over $50.00 USD</Text>
            <Text style={styles.validityText}>Dec 1, 12:00 AM - Dec 16, 12:00 AM</Text>
          </View>
          <View style={styles.discountContainer}>
            <Text style={styles.discountText}>{coupon.discount}</Text>
          </View>
        </View>
        <View style={styles.couponRight}>
          <Pressable 
            style={styles.getButton} 
            onPress={() => onGetCoupon(coupon.id)}
          >
            <Text style={styles.getButtonText}>GET IT NOW</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
});

CouponCard.displayName = 'CouponCard';

const styles = StyleSheet.create({
  couponCard: {
    width: wp('85%'),
    height: hp('20%'),
    marginRight: wp('3%'),
    borderRadius: 16,
    backgroundColor: '#8B5CF6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  couponContent: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: wp('4%'),
    paddingTop: hp('2.5%'),
    paddingBottom: hp('3%'),
  },
  couponLeft: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textContainer: {
    marginBottom: hp('2%'),
  },
  discountContainer: {
    alignSelf: 'flex-start',
  },
  couponTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    marginBottom: hp('0.8%'),
  },
  couponSubtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    marginBottom: hp('1.5%'),
    opacity: 0.9,
  },
  validityText: {
    fontSize: 11,
    fontWeight: '400',
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    marginBottom: hp('2.5%'),
    opacity: 0.8,
  },
  discountText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Roboto',
  },
  couponRight: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: wp('3%'),
  },
  getButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: wp('3.5%'),
    paddingVertical: hp('1.2%'),
    borderRadius: 6,
    minWidth: wp('23%'),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  getButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#8B5CF6',
    fontFamily: 'Roboto',
  },
});

export default CouponCard;
