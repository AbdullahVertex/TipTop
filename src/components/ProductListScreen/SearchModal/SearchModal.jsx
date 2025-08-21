import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Animated,
  Pressable,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ProductCardSmall from '../ProductCardSmall/ProductCardSmall';

export default function SearchModal({ 
  visible, 
  onClose, 
  searchQuery, 
  setSearchQuery, 
  searchResults, 
  isSearching, 
  searchSuggestions,
  onSuggestionPress,
  onProductPress 
}) {
  const [isVisible, setIsVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
      
      // Focus input after animation
      setTimeout(() => {
        inputRef.current?.focus();
      }, 350);
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsVisible(false);
      });
    }
  }, [visible]);

  const handleClose = () => {
    setSearchQuery('');
    onClose();
  };

  const renderSearchResult = ({ item }) => (
    <TouchableOpacity 
      style={styles.resultItem}
      onPress={() => onProductPress?.(item)}
    >
      <ProductCardSmall 
        imageUri={item.image} 
        title={item.title} 
        price={item.price}
        compact={true}
      />
    </TouchableOpacity>
  );

  const renderSuggestion = ({ item }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => onSuggestionPress?.(item)}
    >
      <Ionicons name="search" size={16} color="#6B7280" style={styles.suggestionIcon} />
      <Text style={styles.suggestionText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="search-outline" size={64} color="#D1D5DB" />
      <Text style={styles.emptyTitle}>No products found</Text>
      <Text style={styles.emptySubtitle}>
        Try searching with different keywords
      </Text>
    </View>
  );

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <Ionicons name="search" size={32} color="#8A53FF" />
      <Text style={styles.loadingText}>Searching products...</Text>
    </View>
  );

  if (!isVisible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
      presentationStyle="overFullScreen"
      statusBarTranslucent={true}
    >
      <Animated.View 
        style={[
          styles.overlay,
          { opacity: fadeAnim }
        ]}
      >
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={0}
          >
            <Animated.View 
              style={[
                styles.content,
                {
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [hp('100%'), 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              {/* Header */}
              <View style={styles.header}>
                <Pressable onPress={handleClose} style={styles.closeButton}>
                  <Ionicons name="arrow-back" size={24} color="#111827" />
                </Pressable>
                <Text style={styles.headerTitle}>Search Products</Text>
                <View style={styles.placeholder} />
              </View>

              {/* Search Input */}
              <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                  <Ionicons 
                    name="search" 
                    size={20} 
                    color="#6B7280" 
                    style={styles.searchIcon} 
                  />
                  
                  <TextInput
                    ref={inputRef}
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={styles.searchInput}
                    returnKeyType="search"
                    placeholderTextColor="#9CA3AF"
                    autoFocus={true}
                  />
                  
                  {searchQuery.length > 0 && (
                    <Pressable 
                      onPress={() => setSearchQuery('')} 
                      style={styles.clearButton}
                    >
                      <Ionicons name="close-circle" size={20} color="#6B7280" />
                    </Pressable>
                  )}
                </View>

                {/* Search Suggestions */}
                {searchSuggestions.length > 0 && searchQuery.length > 0 && (
                  <View style={styles.suggestionsContainer}>
                    <FlatList
                      data={searchSuggestions}
                      keyExtractor={(item, index) => `suggestion-${index}`}
                      renderItem={renderSuggestion}
                      showsVerticalScrollIndicator={false}
                      keyboardShouldPersistTaps="handled"
                    />
                  </View>
                )}
              </View>

              {/* Content */}
              <View style={styles.contentArea}>
                {isSearching ? (
                  renderLoadingState()
                ) : searchQuery.length > 0 ? (
                  <FlatList
                    data={searchResults}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderSearchResult}
                    numColumns={2}
                    columnWrapperStyle={styles.resultRow}
                    contentContainerStyle={styles.resultList}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={renderEmptyState}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                  />
                ) : (
                  <View style={styles.initialState}>
                    <Ionicons name="search-outline" size={48} color="#D1D5DB" />
                    <Text style={styles.initialTitle}>Search Products</Text>
                    <Text style={styles.initialSubtitle}>
                      Find what you're looking for
                    </Text>
                  </View>
                )}
              </View>
            </Animated.View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: '#111827',
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1.5%'),
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: wp('2%'),
  },
  searchInput: {
    flex: 1,
    fontSize: wp('4%'),
    color: '#111827',
    paddingVertical: 0,
  },
  clearButton: {
    padding: wp('1%'),
  },
  suggestionsContainer: {
    marginTop: hp('1%'),
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxHeight: hp('30%'),
  },
  contentArea: {
    flex: 1,
    paddingHorizontal: wp('4%'),
  },
  initialState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('10%'),
  },
  initialTitle: {
    fontSize: wp('5%'),
    fontWeight: '600',
    color: '#111827',
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
  },
  initialSubtitle: {
    fontSize: wp('4%'),
    color: '#6B7280',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: hp('2%'),
    fontSize: wp('4%'),
    color: '#6B7280',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('10%'),
  },
  emptyTitle: {
    fontSize: wp('5%'),
    fontWeight: '600',
    color: '#111827',
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
  },
  emptySubtitle: {
    fontSize: wp('4%'),
    color: '#6B7280',
    textAlign: 'center',
  },
  resultList: {
    paddingVertical: hp('2%'),
  },
  resultRow: {
    justifyContent: 'space-between',
  },
  resultItem: {
    flex: 1,
    marginHorizontal: wp('1%'),
  },
  separator: {
    height: hp('2%'),
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  suggestionIcon: {
    marginRight: wp('2%'),
  },
  suggestionText: {
    fontSize: wp('4%'),
    color: '#374151',
  },
});
