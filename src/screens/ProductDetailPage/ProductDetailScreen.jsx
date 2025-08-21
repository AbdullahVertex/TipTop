import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useProductDetail } from '../../hooks/useProductDetail';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import our new components
import ProductImageCarousel from '../../components/ProductDetailPage/ProductImageCarousel/ProductImageCarousel';
import ProductInfo from '../../components/ProductDetailPage/ProductInfo/ProductInfo';
import ColorSelector from '../../components/ProductDetailPage/ColorSelector/ColorSelector';
import ExpandableSection from '../../components/ProductDetailPage/ExpandableSection/ExpandableSection';
import ActionButtons from '../../components/ProductDetailPage/ActionButtons/ActionButtons';
import CouponSection from '../../components/ProductDetailPage/CouponSection/CouponSection';
import ReviewsSection from '../../components/ProductDetailPage/ReviewsSection/ReviewsSection';
import RecommendedProducts from '../../components/ProductDetailPage/RecommendedProducts/RecommendedProducts';

const ProductDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { productId, productData } = route.params || {};

  // Use our custom hook
  const {
    product,
    selectedColor,
    expandedSections,
    loading,
    error,
    isProductAvailable,
    hasValidCoupon,
    selectColor,
    toggleSection,
    addToCart,
    buyNow,
    getCoupon,
  } = useProductDetail(productId);

  // Handle back navigation
  const handleBackPress = () => {
    navigation.goBack();
  };

  // Handle cart press
  const handleCartPress = () => {
    Alert.alert('Cart', 'Cart functionality will be implemented later');
  };

  // Show loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8A53FF" />
        <Text style={styles.loadingText}>Loading product details...</Text>
      </SafeAreaView>
    );
  }

  // Show error state
  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Oops!</Text>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.retryText} onPress={() => navigation.goBack()}>
          Go Back
        </Text>
      </SafeAreaView>
    );
  }

  // Show product not found
  if (!isProductAvailable) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Product Not Found</Text>
        <Text style={styles.errorText}>The product you're looking for doesn't exist.</Text>
        <Text style={styles.retryText} onPress={() => navigation.goBack()}>
          Go Back
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header - We'll create this component next */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </Pressable>
        <Pressable style={styles.cartButton} onPress={handleCartPress}>
          <Ionicons name="cart-outline" size={24} color="#111827" />
        </Pressable>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Product Image Carousel */}
        <ProductImageCarousel images={productData?.image ? [productData.image] : (product?.images || [])} />

        {/* Product Information */}
        <ProductInfo 
          name={productData?.title || product?.name || ""}
          price={productData?.price || product?.price || ""}
          originalPrice={product?.originalPrice || ""}
          rating={product?.rating || 4.9}
          reviewCount={product?.reviewCount || 30}
        />

        {/* Color Selector */}
        <ColorSelector 
          colors={product?.colors || [
            { id: 1, name: 'Light Grey', hex: '#D1D5DB' },
            { id: 2, name: 'Light Brown', hex: '#D97706' },
            { id: 3, name: 'Orange', hex: '#F59E0B' },
            { id: 4, name: 'Red', hex: '#EF4444' },
            { id: 5, name: 'Dark Blue', hex: '#1E40AF' },
          ]}
          selectedColor={selectedColor}
          onColorSelect={selectColor}
        />

        {/* Expandable Sections */}
        <ExpandableSection 
          sections={product?.expandableSections || [
            {
              id: 'materials',
              title: 'Materials',
              content: 'High-quality materials used in manufacturing this product for durability and comfort.'
            },
            {
              id: 'fabric',
              title: 'Fabric',
              content: 'Premium fabric blend ensuring breathability and long-lasting performance.'
            },
            {
              id: 'dimensions',
              title: 'Dimensions',
              content: 'Product dimensions: Length 15cm, Width 8cm, Height 3cm. Weight: 150g.'
            }
          ]}
          expandedSections={expandedSections}
          onToggleSection={toggleSection}
        />

        {/* Action Buttons */}
        <ActionButtons 
          onAddToCart={addToCart}
          onBuyNow={buyNow}
        />

        {/* Coupon Section */}
        <CouponSection 
          coupons={product?.coupons || [
            {
              id: 1,
              discount: 'Rp 100.000',
              title: 'Shoping Day Coupon',
              subtitle: 'For every order over $50.00 USD',
              validity: 'Dec 1, 12:00 AM - Dec 16, 12:00 AM'
            }
          ]}
          onGetCoupon={getCoupon}
        />

        {/* Reviews Section */}
        <ReviewsSection 
          reviews={product?.reviews || {
            overallRating: 4.9,
            totalReviews: 1000,
            ratingBreakdown: [
              { stars: 5, count: 252, percentage: 25.2 },
              { stars: 4, count: 252, percentage: 25.2 },
              { stars: 3, count: 252, percentage: 25.2 },
              { stars: 2, count: 252, percentage: 25.2 },
              { stars: 1, count: 252, percentage: 25.2 },
            ],
            recentReviews: [
              {
                id: 1,
                userName: "Cody Fisher",
                userAvatar: "https://i.pravatar.cc/100?img=1",
                rating: 5,
                comment: "nice and cool stuff",
                date: "2 days ago",
              },
              {
                id: 2,
                userName: "Marvin McKinney",
                userAvatar: "https://i.pravatar.cc/100?img=2",
                rating: 5,
                comment: "nice and cool stuff",
                date: "3 days ago",
              },
              {
                id: 3,
                userName: "Darlene Robertson",
                userAvatar: "https://i.pravatar.cc/100?img=3",
                rating: 5,
                comment: "nice and cool stuff",
                date: "1 week ago",
              },
              {
                id: 4,
                userName: "Jacob Jones",
                userAvatar: "https://i.pravatar.cc/100?img=4",
                rating: 5,
                comment: "nice and cool stuff",
                date: "1 week ago",
              },
            ],
          }}
        />

        {/* Recommended Products */}
        <RecommendedProducts 
          products={product?.recommendedProducts || [
            {
              id: 101,
              name: "Product AAA",
              price: "Rp 500.000",
              rating: 4.9,
              image: "https://picsum.photos/seed/rec1/200/200",
            },
            {
              id: 102,
              name: "Product AAB",
              price: "Rp 500.000",
              rating: 4.9,
              image: "https://picsum.photos/seed/rec2/200/200",
            },
            {
              id: 103,
              name: "Product AAC",
              price: "Rp 500.000",
              rating: 4.9,
              image: "https://picsum.photos/seed/rec3/200/200",
            },
          ]}
          onProductPress={(product) => Alert.alert('Product', `Selected: ${product.name}`)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: hp('2%'),
    fontSize: wp('4%'),
    color: '#6B7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: wp('10%'),
  },
  errorTitle: {
    fontSize: wp('6%'),
    fontWeight: '600',
    color: '#111827',
    marginBottom: hp('2%'),
  },
  errorText: {
    fontSize: wp('4%'),
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: hp('3%'),
  },
  retryText: {
    fontSize: wp('4%'),
    color: '#8A53FF',
    fontWeight: '600',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    paddingTop: hp('4%'),
  },
  backButton: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  cartButton: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: hp('5%'),
  },
  placeholderContainer: {
    padding: wp('4%'),
    backgroundColor: '#F9FAFB',
    margin: wp('4%'),
    borderRadius: 12,
  },
  placeholderTitle: {
    fontSize: wp('5%'),
    fontWeight: '600',
    color: '#111827',
    marginBottom: hp('2%'),
  },
  placeholderText: {
    fontSize: wp('4%'),
    color: '#6B7280',
    marginBottom: hp('1%'),
  },
});

export default ProductDetailScreen;
