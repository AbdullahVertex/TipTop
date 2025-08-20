import React, { useState } from "react";
import { View, Modal, ScrollView } from "react-native";
import TopBar from "../../../components/ProductListScreen/TopBar/TopBar";
import CategoriesBar from "../../../components/ProductListScreen/CategoriesBar/CategoriesBar";
import SectionHeader from "../../../components/ProductListScreen/SectionHeader/SectionHeader";
import HorizontalCarousel from "../../../components/ProductListScreen/HorizontalCarousel/HorizontalCarousel";
import ProductCardSmall from "../../../components/ProductListScreen/ProductCardSmall/ProductCardSmall";
import { todaysPicks, fashionProducts, craftProducts } from "../../../utils/productListMockData";

export default function ProductListScreen({ navigation }) {
  const [location, setLocation] = useState("San Francisco, California");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedChip, setSelectedChip] = useState("sell");

  const chips = [
    { key: "sell", label: "Sell" },
    { key: "local", label: "Local" },
    { key: "vehicles", label: "Vehicles" },
    { key: "stores", label: "Stores" },
    { key: "property", label: "Property" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <TopBar
        locationTitle="Your Location"
        location={location}
        onPressLocation={() => setPickerOpen(true)}
        onPressSearch={() => navigation?.navigate?.("SearchScreen")}
      />

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <CategoriesBar data={chips} selectedKey={selectedChip} onSelect={setSelectedChip} onPressProfile={() => navigation?.navigate?.("ProfileScreen")} />

        <SectionHeader title={"Today's Picks"} onSeeAll={() => {}} />
        <HorizontalCarousel
          data={todaysPicks}
          renderItem={({ item }) => (
            <ProductCardSmall imageUri={item.image} title={item.title} price={item.price} />
          )}
        />

        <SectionHeader title="Fashion Products" onSeeAll={() => {}} />
        <HorizontalCarousel
          data={fashionProducts}
          renderItem={({ item }) => (
            <ProductCardSmall imageUri={item.image} title={item.title} price={item.price} />
          )}
        />

        <SectionHeader title="Craft Products" onSeeAll={() => {}} />
        <HorizontalCarousel
          data={craftProducts}
          renderItem={({ item }) => (
            <ProductCardSmall imageUri={item.image} title={item.title} price={item.price} />
          )}
        />
      </ScrollView>

      <Modal
        visible={pickerOpen}
        transparent
        onRequestClose={() => setPickerOpen(false)}
        animationType="slide"
      >
        {/* location picker UI later */}
      </Modal>
    </View>
  );
}
