import React from "react";
import { View, Text, Pressable } from "react-native";

export default function SectionHeader({ title, onSeeAll }) {
  return (
    <View style={{ paddingHorizontal: 16, paddingVertical: 12, flexDirection: "row", alignItems: "center" }}>
      <Text style={{ flex: 1, fontSize: 20, fontWeight: "700" }}>{title}</Text>
      {onSeeAll && (
        <Pressable onPress={onSeeAll} accessibilityRole="button">
          <Text style={{ color: "#6B7280", fontWeight: "600" }}>See all</Text>
        </Pressable>
      )}
    </View>
  );
} 