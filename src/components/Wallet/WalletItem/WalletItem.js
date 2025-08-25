import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CoinIcon from '../../../assets/svgs/CoinIcon.svg'; // Ensure this is correctly handled
import { hp, wp } from '../../../utils/helpers/responsive';

const CoinShopItem = ({ coins = 500, price = 10.0, onPurchase }) => {
  return (
    <View style={styles.container}>
      <View style={styles.coinContainer}>
        <CoinIcon width={wp(10)} height={wp(10)} style={styles.icon} />{' '}
        {/* Adjusted CoinIcon usage */}
        <View style={styles.priceContainer}>
          <Text style={styles.coinText}>{coins} Coins</Text>
          <Text style={styles.priceText}>${price} Only</Text>
        </View>
      </View>

      <TouchableOpacity onPress={onPurchase} style={styles.buttonContainer}>
        <LinearGradient
          colors={[
            'rgba(246, 29, 128, 1)',
            'rgba(135, 116, 255, 1)',
            'rgba(52, 61, 255, 1)',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Purchase</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: hp(2),
    borderRadius: wp(2),
    marginHorizontal: hp(1),
    marginBottom: hp(1),
    elevation: 2,
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  coinText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  priceContainer: {},
  priceText: {
    fontSize: 14,
    color: '#777',
  },
  buttonContainer: {
    borderRadius: 25,
  },
  button: {
    height: hp(4),
    width: wp(25),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default CoinShopItem;
