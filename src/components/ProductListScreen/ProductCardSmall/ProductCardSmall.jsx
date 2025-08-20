import React from "react";
import { View, Image, Text } from "react-native";

export default function ProductCardSmall({ imageUri, title, price }) {
  return (
    <View style={{ width: 140, marginRight: 12 }}>
      <Image source={{ uri: imageUri }} style={{ width: "100%", height: 120, borderRadius: 12 }} />
      <Text numberOfLines={2} style={{ marginTop: 6, fontWeight: "600" }}>{title}</Text>
      <Text style={{ marginTop: 2, color: "#6B7280" }}>{price}</Text>
    </View>
  );
} 