import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function SearchBar({ value, onChangeText }) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search products..."
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        returnKeyType="search"
        // optional: allow keyboard search key to apply later if you want
        // onSubmitEditing={() => onPressSearch?.()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 8,
  },
  input: {
    fontSize: 16,
  },
});
