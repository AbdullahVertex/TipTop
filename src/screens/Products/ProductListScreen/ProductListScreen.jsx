import React, { useState } from "react";
import { View, Modal, ScrollView, Alert } from "react-native";
import TopBar from "../../../components/ProductListScreen/TopBar/TopBar";
import CategoriesBar from "../../../components/ProductListScreen/CategoriesBar/CategoriesBar";
import SectionHeader from "../../../components/ProductListScreen/SectionHeader/SectionHeader";
import HorizontalCarousel from "../../../components/ProductListScreen/HorizontalCarousel/HorizontalCarousel";
import ProductCardSmall from "../../../components/ProductListScreen/ProductCardSmall/ProductCardSmall";
import SearchModal from "../../../components/ProductListScreen/SearchModal/SearchModal";
import { useProductSearch } from "../../../hooks/useProductSearch";
import AppSafeAreaView from "../../../components/General/SafeAreaView/SafeAreaView";

export default function ProductListScreen({ navigation }) {
  const [location, setLocation] = useState("San Francisco, California");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedChip, setSelectedChip] = useState("sell");
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  // Use our custom search hook
  const {
    searchQuery,
    setSearchQuery,
    isSearching,
    filteredProducts,
    searchSuggestions,
    hasSearchResults
  } = useProductSearch();

  const chips = [
    { key: "sell", label: "Sell" },
    { key: "local", label: "Local" },
    { key: "vehicles", label: "Vehicles" },
    { key: "stores", label: "Stores" },
    { key: "property", label: "Property" },
  ];

  const handleProductPress = (product) => {
    // Navigate to product detail screen with full product data
    navigation?.navigate?.("ProductDetailScreen", { 
      productId: product.id,
      productData: product // Pass the actual product data
    });
  };

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // You can add additional search logic here
  };

  const handleSuggestionPress = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const openSearchModal = () => {
    setSearchModalVisible(true);
  };

  const closeSearchModal = () => {
    setSearchModalVisible(false);
    setSearchQuery('');
  };

  return (
    <AppSafeAreaView>
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <TopBar
        locationTitle="Your Location"
        location={location}
        onPressLocation={() => setPickerOpen(true)}
        onPressSearch={openSearchModal}
      />

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <CategoriesBar 
          data={chips} 
          selectedKey={selectedChip} 
          onSelect={setSelectedChip} 
          onPressProfile={() => navigation?.navigate?.("Home")} 
        />

        <SectionHeader title={"Today's Picks"} onSeeAll={() => {}} />
        <HorizontalCarousel
          data={filteredProducts.todaysPicks}
          renderItem={({ item }) => (
            <ProductCardSmall 
              imageUri={item.image} 
              title={item.title} 
              price={item.price}
              onPress={() => handleProductPress(item)}
            />
          )}
        />

        <SectionHeader title="Fashion Products" onSeeAll={() => {}} />
        <HorizontalCarousel
          data={filteredProducts.fashionProducts}
          renderItem={({ item }) => (
            <ProductCardSmall 
              imageUri={item.image} 
              title={item.title} 
              price={item.price}
              onPress={() => handleProductPress(item)}
            />
          )}
        />

        <SectionHeader title="Craft Products" onSeeAll={() => {}} />
        <HorizontalCarousel
          data={filteredProducts.craftProducts}
          renderItem={({ item }) => (
            <ProductCardSmall 
              imageUri={item.image} 
              title={item.title} 
              price={item.price}
              onPress={() => handleProductPress(item)}
            />
          )}
        />
      </ScrollView>

      {/* Search Modal */}
      <SearchModal
        visible={searchModalVisible}
        onClose={closeSearchModal}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={filteredProducts.searchResults}
        isSearching={isSearching}
        searchSuggestions={searchSuggestions}
        onSuggestionPress={handleSuggestionPress}
        onProductPress={handleProductPress}
      />

      {/* Location Picker Modal */}
      <Modal
        visible={pickerOpen}
        transparent
        onRequestClose={() => setPickerOpen(false)}
        animationType="slide"
      >
        {/* location picker UI later */}
      </Modal>
    </View>
    </AppSafeAreaView>
  );
}
