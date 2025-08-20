import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function GameCard({ item, onPress }) {
  // Slightly responsive star size with sane min/max
  const starSize = Math.max(14, Math.min(22, wp(4.2)));

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => onPress?.(item)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text numberOfLines={1} style={styles.title}>
        {item.title}
      </Text>
      <View style={styles.ratingRow}>
        <Ionicons name="star" size={starSize} color="#FF9F1C" />
        <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginBottom: hp(2.2), // ~22 on 1k tall device
    marginHorizontal: wp(3), // ~12 on 400dp width
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: wp(4.5), // ~18 on 400dp width
  },
  title: {
    marginTop: hp(1.1), // ~10
    fontSize: wp(5.5), // ~22 on 400dp width
    fontWeight: '700',
    color: '#111',
  },
  ratingRow: {
    marginTop: hp(0.8), // ~6–8
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: wp(1.8), // replaces gap to support older RN
    fontSize: wp(5), // ~20 on 400dp width
    color: '#6B7280',
    fontWeight: '600',
  },
});
