import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ActionButtons({ 
  onAddToCart = () => {}, 
  onBuyNow = () => {} 
}) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {/* Add to Cart Button */}
        <Pressable style={styles.addToCartButton} onPress={onAddToCart}>
          <Text style={styles.cartIcon}>🛍️</Text>
          <Text style={styles.addToCartText}>Add To Cart</Text>
        </Pressable>

        {/* Buy Now Button */}
        <Pressable style={styles.buyNowButton} onPress={onBuyNow}>
          <Text style={styles.buyNowText}>Buy Now</Text>
        </Pressable>
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
  buttonContainer: {
    flexDirection: 'row',
    gap: wp('3%'),
  },
  addToCartButton: {
    width: 170,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
  },
  cartIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  addToCartText: {
    width: 96,
    height: 21,
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  buyNowButton: {
    width: 140,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8A53FF',
    borderRadius: 12,
    shadowColor: '#8A53FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buyNowText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
});
