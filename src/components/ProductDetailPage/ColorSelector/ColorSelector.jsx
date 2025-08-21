import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ColorSelector({ 
  colors = [], 
  selectedColor = null, 
  onColorSelect = () => {} 
}) {
  if (!colors.length) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>COLOR</Text>
      <View style={styles.colorsContainer}>
        {colors.map((color) => (
          <Pressable
            key={color.id}
            style={[
              styles.colorSwatch,
              { backgroundColor: color.hex },
              selectedColor?.id === color.id && styles.selectedColor,
            ]}
            onPress={() => onColorSelect(color.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    backgroundColor: '#fff',
  },
  title: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: '#111827',
    marginBottom: hp('2%'),
    fontFamily: 'System',
    letterSpacing: 0.5,
  },
  colorsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('3%'),
  },
  colorSwatch: {
    width: wp('11%'),
    height: wp('11%'),
    borderRadius: wp('5.5%'),
    borderWidth: 2,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  selectedColor: {
    borderColor: '#111827', // Dark border for selected color (like reference)
    borderWidth: 3,
    transform: [{ scale: 1.05 }], // Slightly larger when selected
  },
});
