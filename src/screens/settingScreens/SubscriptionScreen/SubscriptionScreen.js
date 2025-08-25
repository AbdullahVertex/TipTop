import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import SubscriptionOption from '../../../components/Subscription/SubscriptionOption/SubscriptionOption';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { icons } from '../../../constants/icons';
import AppSafeAreaView from '../../../components/General/SafeAreaView/SafeAreaView';
import Header from '../../../components/General/Headers/GeneralHeader';

export default function SubscriptionScreen() {
  const [selected, setSelected] = useState('yearly');

  return (
    <AppSafeAreaView>
      <Header title="Subscription" />
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.plus}>PLUS+</Text>
        <Text style={styles.description}>
          Subscribe to Plus and have ad-free experience and verified icon on
          your profile.
        </Text>
        <View style={styles.features}>
          <View style={styles.feature}>
            <Image
              source={icons.redClose}
              style={styles.featureIcon}
              resizeMode="contain"
            />
            <Text style={styles.featureText}>No Ads</Text>
          </View>
          <View style={styles.feature}>
            <Image
              source={icons.checkmark}
              style={styles.featureIcon}
              resizeMode="contain"
            />
            <Text style={styles.featureText}>Get Verified</Text>
          </View>
        </View>
        <ScrollView
          style={{ height: hp(25) }}
          showsVerticalScrollIndicator={false}
        >
          <SubscriptionOption
            title="Yearly"
            subtitle="$8 / Month, Billed Annually"
            price="$96"
            selected={selected === 'yearly'}
            onPress={() => setSelected('yearly')}
          />
          <SubscriptionOption
            title="Monthly"
            subtitle="3 Days Free Trial"
            price="$10"
            selected={selected === 'quaterly'}
            onPress={() => setSelected('quaterly')}
          />
          <SubscriptionOption
            title="Monthly"
            subtitle="3 Days Free Trial"
            price="$10"
            selected={selected === 'monthly'}
            onPress={() => setSelected('monthly')}
          />
        </ScrollView>
        <TouchableOpacity style={styles.subscribeBtn}>
          <Text style={styles.subscribeText}>Subscribe Now</Text>
        </TouchableOpacity>
      </View>
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: hp('5%'),
  },
  plus: {
    fontSize: wp('8%'),
    textAlign: 'center',
    fontWeight: '900',
    color: '#A855F7',
  },
  description: {
    fontSize: wp('4%'),
    paddingHorizontal: wp('5%'),
    color: '#4B5563',
    textAlign: 'center',
    marginVertical: hp('2%'),
    width: wp('85%'),
    lineHeight: hp('2.5%'),
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: hp('1.5%'),
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('2%'),
  },
  featureIcon: {
    width: wp('4.5%'),
    height: wp('4.5%'),
    marginRight: wp('1%'),
  },
  featureText: {
    fontSize: wp('3.8%'),
    color: '#000',
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
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
});
