import React, { memo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const RecommendedProducts = memo(({ 
  products = [], 
  onProductPress = () => {} 
}) => {
  const renderProductCard = (product) => (
    <Pressable 
      key={product.id} 
      style={styles.productCard}
      onPress={() => onProductPress(product)}
    >
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.price}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.stars}>★</Text>
          <Text style={styles.rating}>{product.rating}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Recommended Item</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {products.map(renderProductCard)}
      </ScrollView>
    </View>
  );
});

RecommendedProducts.displayName = 'RecommendedProducts';

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
  scrollContainer: {
    paddingRight: wp('4%'),
  },
  productCard: {
    width: wp('35%'),
    marginRight: wp('3%'),
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: hp('15%'),
    backgroundColor: '#F3F4F6',
  },
  productInfo: {
    padding: wp('3%'),
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Roboto',
    marginBottom: hp('0.5%'),
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Roboto',
    marginBottom: hp('0.5%'),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    fontSize: wp('3%'),
    color: '#F59E0B',
    fontFamily: 'System',
    marginRight: wp('1%'),
  },
  rating: {
    fontSize: wp('3%'),
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'System',
  },
});

export default RecommendedProducts;
