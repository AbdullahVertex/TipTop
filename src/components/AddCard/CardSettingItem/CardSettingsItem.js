import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { hp, wp } from '../../../utils/helpers/responsive';

// Placeholder for mada logo (replace with actual asset if available)
const madaLogo =
  'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1080&auto=format&fit=crop'; // Use your mada logo asset here

const CardSettingsItem = () => {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <View style={styles.row}>
        <Image source={madaLogo} style={styles.logo} resizeMode="contain" />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>mada</Text>
          <Text style={styles.cardNumber}>9432 **** **** ****</Text>
        </View>
        <View style={styles.chevronContainer}>
          <Icon name="chevron-forward" size={wp('5%')} color="#9CA3AF" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginRight: 14,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: hp(2),
    color: '#111',
    marginBottom: 2,
  },
  cardNumber: {
    fontSize: hp(1.5),
    color: '#757575',
    letterSpacing: 2,
    fontWeight: '400',
  },
  chevronContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CardSettingsItem;
