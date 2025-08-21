import React, { memo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CouponCard from './CouponCard/CouponCard';

const CouponSection = memo(({ 
  coupons = [], 
  onGetCoupon = () => {} 
}) => {
  // Early return if no coupons
  if (!coupons.length) return null;

  const renderCouponCard = (coupon, index) => (
    <CouponCard 
      key={coupon.id || index}
      coupon={coupon}
      onGetCoupon={onGetCoupon}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>COUPON</Text>
      <View style={styles.couponWrapper}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {coupons.map(renderCouponCard)}
        </ScrollView>
      </View>
    </View>
  );
});

CouponSection.displayName = 'CouponSection';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: '#111827',
    marginBottom: hp('2%'),
    fontFamily: 'System',
    letterSpacing: 0.5,
  },
  couponWrapper: {
    alignItems: 'center',
  },
  scrollContainer: {
    paddingRight: wp('4%'),
    alignItems: 'center',
  },
});

export default CouponSection;
