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
        {/* Title */}
        <Text style={styles.couponTitle}>Shoping Day Coupon</Text>
        
        {/* Condition */}
        <Text style={styles.couponSubtitle}>For every order over $50.00 USD</Text>
        
        {/* Validity Period */}
        <Text style={styles.validityText}>Dec 1, 12:00 AM - Dec 16, 12:00 AM</Text>
        
        {/* Bottom Row with Discount and Button */}
        <View style={styles.bottomRow}>
          <Text style={styles.discountText}>Rp 100.000</Text>
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
    borderRadius: 12,
    backgroundColor: '#8A53FF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  couponContent: {
    flex: 1,
    paddingHorizontal: wp('4%'),
    paddingTop: hp('3%'),
    paddingBottom: hp('3%'),
    justifyContent: 'space-between',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: hp('2%'),
  },
  couponTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    marginBottom: hp('1%'),
  },
  couponSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    marginBottom: hp('1%'),
    opacity: 0.9,
  },
  validityText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    opacity: 0.8,
  },
  discountText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Roboto',
  },

  getButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1.2%'),
    borderRadius: 6,
    minWidth: wp('22%'),
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
    color: '#8A53FF',
    fontFamily: 'Roboto',
  },
});

export default CouponCard;
