import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ProductCardSmall({ 
  imageUri, 
  title, 
  price, 
  compact = false,
  onPress 
}) {
  const cardStyle = compact ? styles.compactCard : styles.regularCard;
  const imageStyle = compact ? styles.compactImage : styles.regularImage;
  const titleStyle = compact ? styles.compactTitle : styles.regularTitle;
  const priceStyle = compact ? styles.compactPrice : styles.regularPrice;

  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent 
      style={cardStyle} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image source={{ uri: imageUri }} style={imageStyle} />
      <Text numberOfLines={2} style={titleStyle}>{title}</Text>
      <Text style={priceStyle}>{price}</Text>
    </CardComponent>
  );
}

const styles = StyleSheet.create({
  regularCard: {
    width: 140,
    marginRight: 12,
  },
  compactCard: {
    flex: 1,
    marginHorizontal: wp('1%'),
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: wp('2%'),
  },
  regularImage: {
    width: "100%",
    height: 120,
    borderRadius: 12,
  },
  compactImage: {
    width: "100%",
    height: hp('15%'),
    borderRadius: 8,
    marginBottom: hp('1%'),
  },
  regularTitle: {
    marginTop: 6,
    fontWeight: "600",
    fontSize: wp('3.5%'),
    color: '#111827',
  },
  compactTitle: {
    fontWeight: "600",
    fontSize: wp('3.5%'),
    color: '#111827',
    marginBottom: hp('0.5%'),
  },
  regularPrice: {
    marginTop: 2,
    color: "#6B7280",
    fontSize: wp('3.5%'),
  },
  compactPrice: {
    color: "#6B7280",
    fontSize: wp('3.5%'),
    fontWeight: '500',
  },
}); 