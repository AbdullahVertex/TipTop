import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { View, TextInput, StyleSheet, Pressable, Text, FlatList } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SearchBar = forwardRef(({ 
  value, 
  onChangeText, 
  onSearch, 
  suggestions = [],
  onSuggestionPress,
  placeholder = "Search products...",
  autoFocus = false
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
  }));

  const handleClear = () => {
    onChangeText('');
    inputRef.current?.focus();
  };

  const handleSuggestionPress = (suggestion) => {
    onChangeText(suggestion);
    onSuggestionPress?.(suggestion);
    setIsFocused(false);
  };

  const renderSuggestion = ({ item }) => (
    <Pressable
      style={styles.suggestionItem}
      onPress={() => handleSuggestionPress(item)}
    >
      <Ionicons name="search" size={16} color="#6B7280" style={styles.suggestionIcon} />
      <Text style={styles.suggestionText}>{item}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer, isFocused && styles.focusedContainer]}>
        <Ionicons 
          name="search" 
          size={20} 
          color={isFocused ? "#8A53FF" : "#6B7280"} 
          style={styles.searchIcon} 
        />
        
        <TextInput
          ref={inputRef}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
          returnKeyType="search"
          onSubmitEditing={() => onSearch?.(value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholderTextColor="#9CA3AF"
          autoFocus={autoFocus}
        />
        
        {value.length > 0 && (
          <Pressable onPress={handleClear} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#6B7280" />
          </Pressable>
        )}
      </View>

      {/* Search Suggestions */}
      {isFocused && suggestions.length > 0 && value.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => `suggestion-${index}`}
            renderItem={renderSuggestion}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}
    </View>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1000,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1.5%'),
    marginHorizontal: wp('4%'),
    marginVertical: hp('1%'),
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  focusedContainer: {
    borderColor: '#8A53FF',
    backgroundColor: '#fff',
    shadowColor: '#8A53FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: wp('2%'),
  },
  input: {
    flex: 1,
    fontSize: wp('4%'),
    color: '#111827',
    paddingVertical: 0,
  },
  clearButton: {
    marginLeft: wp('2%'),
    padding: wp('1%'),
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: wp('4%'),
    right: wp('4%'),
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxHeight: hp('30%'),
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  suggestionIcon: {
    marginRight: wp('2%'),
  },
  suggestionText: {
    fontSize: wp('4%'),
    color: '#374151',
  },
});
