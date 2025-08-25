import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SubscriptionOption = ({ title, subtitle, price, selected, onPress }) => {
  const OptionContent = () => (
    <View style={styles.innerContainer}>
      <View>
        <Text style={[styles.title, selected && styles.whiteText]}>
          {title}
        </Text>
        <Text style={[styles.subtitle, selected && styles.whiteText]}>
          {subtitle}
        </Text>
      </View>
      <Text style={[styles.price, selected && styles.whiteText]}>{price}</Text>
    </View>
  );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        width: wp('85%'),
        marginVertical: hp('1%'),
      }}
    >
      {selected ? (
        <LinearGradient
          colors={['#A855F7', '#F472B6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.container, { borderWidth: 0 }]}
        >
          <OptionContent />
        </LinearGradient>
      ) : (
        <View style={[styles.container, styles.unselected]}>
          <OptionContent />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: wp('3%'),
    alignSelf: 'center',
    paddingVertical: Platform.OS === 'android' ? hp(0.2) : undefined,
    width: Platform.OS === 'ios' ? wp(80) : wp(85),
    height: Platform.OS === 'ios' ? hp(8) : undefined,
  },
  innerContainer: {
    flexDirection: 'row',
    paddingVertical: wp(4),
    paddingHorizontal: wp(4),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unselected: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  title: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: '#000',
  },
  subtitle: {
    fontSize: wp('3.5%'),
    color: '#6b7280',
  },
  price: {
    fontSize: wp('4.5%'),
    fontWeight: '900',
    color: '#000',
  },
  whiteText: {
    color: '#fff',
  },
});

export default SubscriptionOption;
