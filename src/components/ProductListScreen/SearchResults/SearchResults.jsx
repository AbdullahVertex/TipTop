import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import ProductCardSmall from '../ProductCardSmall/ProductCardSmall';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function SearchResults({ 
  searchResults, 
  isSearching, 
  searchQuery, 
  onProductPress 
}) {
  const renderProduct = ({ item }) => (
    <ProductCardSmall 
      imageUri={item.image} 
      title={item.title} 
      price={item.price}
      onPress={() => onProductPress?.(item)}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No products found</Text>
      <Text style={styles.emptySubtitle}>
        Try searching with different keywords
      </Text>
    </View>
  );

  const renderSearchHeader = () => (
    <View style={styles.searchHeader}>
      <Text style={styles.searchTitle}>
        Search Results for "{searchQuery}"
      </Text>
      <Text style={styles.resultCount}>
        {searchResults.length} product{searchResults.length !== 1 ? 's' : ''} found
      </Text>
    </View>
  );

  if (isSearching) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8A53FF" />
        <Text style={styles.loadingText}>Searching products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {searchQuery && renderSearchHeader()}
      
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchHeader: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  searchTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: '#111827',
    marginBottom: hp('0.5%'),
  },
  resultCount: {
    fontSize: wp('3.5%'),
    color: '#6B7280',
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
    marginBottom: hp('1%'),
  },
  emptySubtitle: {
    fontSize: wp('4%'),
    color: '#6B7280',
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
  },
  row: {
    justifyContent: 'space-between',
  },
  separator: {
    height: hp('2%'),
  },
});
