import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export default function CategoryChip({ label, selected, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.base, selected && styles.selected]} accessibilityRole="button">
      <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16, backgroundColor: "#F3F4F6", marginRight: 8 },
  selected: { backgroundColor: "#111827" },
  text: { color: "#111827", fontWeight: "600" },
  textSelected: { color: "#FFFFFF" },
}); 