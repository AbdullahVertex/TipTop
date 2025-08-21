import React from "react";
import { FlatList, View } from "react-native";

export default function HorizontalCarousel({ data, renderItem, contentInset = 16 }) {
  return (
    <View style={{ paddingLeft: contentInset, paddingBottom: 4 }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(i, idx) => String(i.id ?? idx)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingRight: contentInset }}
      />
    </View>
  );
} 