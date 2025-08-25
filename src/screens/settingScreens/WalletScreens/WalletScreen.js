import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CoinWalletHeader } from '../../../components/Wallet/WalletHeader/WalletHeader';

import AppSafeAreaView from '../../../components/General/SafeAreaView/SafeAreaView';
import CoinIcon from '../../../assets/svgs/CoinIcon.svg';
import CoinShopItem from '../../../components/Wallet/WalletItem/WalletItem';

const CoinWalletScreen = () => {
  const [selected, setSelected] = useState(null);
  const coinItems = [
    { id: 1, coins: 500, price: 10 },
    { id: 2, coins: 500, price: 10 },
    { id: 3, coins: 500, price: 10 },
    { id: 4, coins: 500, price: 10 },
    { id: 5, coins: 500, price: 10 },
  ];

  const handlePurchase = coins => {
    alert(`You purchased ${coins} coins.`);
  };

  return (
    <>
      {/* Coin Wallet Header */}
      <AppSafeAreaView style={{ backgroundColor: 'white' }}>
        <ScrollView
          style={{
            backgroundColor: 'rgba(243, 244, 246, 1)',
            marginHorizontal: wp(2),
            borderRadius: 30,
          }}
          showsVerticalScrollIndicator={false}
        >
          <CoinWalletHeader balance={5.69} collected={526} purchased={12.69} />
          <View style={{}}>
            {/* Coin Shop */}
            <View style={{ alignItems: 'center', marginTop: -hp(4) }}>
              <CoinIcon />
              <Text style={styles.coinShopTitle}>Coin Shop</Text>
              <Text style={styles.coinShopDescription}>
                Recharge your wallet. And send gifts to your favorite creators.
              </Text>
            </View>
            {coinItems.map(item => (
              <CoinShopItem
                key={item.id}
                coins={item.coins}
                price={item.price}
                onPurchase={() => handlePurchase(item.coins)}
              />
            ))}
          </View>
        </ScrollView>
      </AppSafeAreaView>
    </>
  );
};

export default CoinWalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
  },
  headerContainer: {
    padding: hp('3%'),
    borderRadius: wp('2%'),
    marginBottom: hp('2%'),
    alignItems: 'center',
  },
  balanceText: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: '#fff',
  },
  walletInfoContainer: {
    flexDirection: 'row',
    marginTop: hp('1%'),
  },
  walletInfoText: {
    color: '#fff',
    marginRight: wp('2%'),
  },
  coinShopTitle: {
    fontSize: wp(5),
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: hp('2%'),
  },
  coinShopDescription: {
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  coinItemContainer: {
    marginVertical: hp('1'),
  },
  coinItemButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: wp('2%'),
    paddingVertical: hp('2%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
  },
  coinItemText: {
    fontSize: wp(2),
    fontWeight: 'bold',
  },
  coinPriceText: {
    fontSize: wp(2),
    color: '#ff4081',
  },
  subscribeBtn: {
    backgroundColor: '#2C0F0F',
    paddingVertical: hp('2.5%'),
    width: wp('85%'),
    borderRadius: wp('2%'),
    marginTop: hp('3%'),
  },
  subscribeText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: wp(3.5),
    fontWeight: 'bold',
  },
});
