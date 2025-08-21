import React from "react";
import { View, FlatList, Pressable } from "react-native";
import CategoryChip from "../CategoryChip/CategoryChip";
import ProfileSvg from "../../../assets/svgs/Profile.svg";

export default function CategoriesBar({ data, selectedKey, onSelect, onPressProfile = () => {} }) {
  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8 }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(i) => i.key}
        ListHeaderComponent={() => (
          <Pressable onPress={onPressProfile} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: "#F3F4F6", alignItems: "center", justifyContent: "center", marginRight: 8 }}>
            <ProfileSvg width={20} height={20} />
          </Pressable>
        )}
        renderItem={({ item }) => (
          <CategoryChip label={item.label} selected={item.key === selectedKey} onPress={() => onSelect(item.key)} />
        )}
      />
    </View>
  );
} 