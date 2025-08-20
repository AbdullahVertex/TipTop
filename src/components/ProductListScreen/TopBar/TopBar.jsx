import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function TopBar({
  locationTitle = "Your Location",
  location = "San Francisco, California",
  onPressLocation = () => {},
  onPressSearch = () => {},
}) {
  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <View style={styles.row}>
        <Pressable style={styles.locationWrap} onPress={onPressLocation} accessibilityRole="button" accessibilityLabel="Change location">
          <MaterialCommunityIcons name="map-marker" size={28} color="#8A53FF" style={{ marginRight: 6 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.caption}>{locationTitle}</Text>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.locationText}>
              {location}
            </Text>
          </View>
          
        </Pressable>

        <Pressable onPress={onPressSearch} style={styles.searchBtn} accessibilityRole="button" accessibilityLabel="Search">
          <Ionicons name="search" size={20} color="#111827" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { backgroundColor: '#FFFF' },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 12,
  },
  locationWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: "transparent",
    elevation: 0,
  },
  caption: { fontSize: 12, color: "#6B7280", marginBottom: 2 },
  locationText: { fontSize: 16, fontWeight: "600", color: "#111827" },
  searchBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center", justifyContent: "center",
    shadowColor: "transparent", shadowOpacity: 0, shadowRadius: 0, shadowOffset: { width: 0, height: 0 }, elevation: 0,
  },
});
