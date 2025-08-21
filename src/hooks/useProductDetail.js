import { useState, useEffect, useMemo } from 'react';
import { getProductById } from '../utils/productDetailMockData';

// Custom hook for product detail functionality
export const useProductDetail = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const productData = getProductById(productId);
        setProduct(productData);
        
        // Set initial selected color
        const initialColor = productData.colors.find(color => color.selected);
        setSelectedColor(initialColor);
        
        // Initialize expanded sections
        const initialExpanded = {};
        productData.expandableSections.forEach(section => {
          initialExpanded[section.id] = section.expanded;
        });
        setExpandedSections(initialExpanded);
        
      } catch (err) {
        setError('Failed to load product details');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  // Toggle section expansion
  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Select color
  const selectColor = (colorId) => {
    if (product) {
      const updatedColors = product.colors.map(color => ({
        ...color,
        selected: color.id === colorId
      }));
      
      const selectedColorData = updatedColors.find(color => color.id === colorId);
      setSelectedColor(selectedColorData);
      
      setProduct(prev => ({
        ...prev,
        colors: updatedColors
      }));
    }
  };

  // Add to cart
  const addToCart = () => {
    if (product && selectedColor) {
      console.log('Adding to cart:', {
        productId: product.id,
        productName: product.name,
        selectedColor: selectedColor.name,
        price: product.price
      });
      // In a real app, this would dispatch to cart state management
    }
  };

  // Buy now
  const buyNow = () => {
    if (product && selectedColor) {
      console.log('Buying now:', {
        productId: product.id,
        productName: product.name,
        selectedColor: selectedColor.name,
        price: product.price
      });
      // In a real app, this would navigate to checkout
    }
  };

  // Get coupon
  const getCoupon = () => {
    if (product?.coupon?.isActive) {
      console.log('Getting coupon:', product.coupon.title);
      // In a real app, this would apply the coupon
    }
  };

  // Memoized computed values
  const isProductAvailable = useMemo(() => {
    return product && !loading && !error;
  }, [product, loading, error]);

  const hasValidCoupon = useMemo(() => {
    return product?.coupon?.isActive || false;
  }, [product]);

  return {
    // Data
    product,
    selectedColor,
    expandedSections,
    
    // State
    loading,
    error,
    isProductAvailable,
    hasValidCoupon,
    
    // Actions
    selectColor,
    toggleSection,
    addToCart,
    buyNow,
    getCoupon,
  };
};
