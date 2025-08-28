import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Location from '../../assets/svgs/LocationHome.svg';
import LinearGradient from 'react-native-linear-gradient'; // Import the linear gradient
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'; // Import responsive screen functions

const ReelFooter = ({ name, caption, location }) => (
  <View style={styles.container}>
    <LinearGradient colors={['rgba(5, 0, 15, 0)', 'rgba(5, 0, 15, 1)']}>
      <View style={{ marginBottom: hp(4) }}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.caption}>{caption}</Text>
        <View style={styles.locationRow}>
          <Location width={wp('5%')} height={hp('2%')} />{' '}
          {/* Make icon size responsive */}
          <Text style={styles.location}>{location}</Text>
        </View>
      </View>
    </LinearGradient>
  </View>
);

export default ReelFooter;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    //bottom: 0,
    //paddingBottom: 10,
    alignSelf: 'center',
    //paddingHorizontal: wp('3%'), // Make padding responsive
    //paddingVertical: hp('2%'), // Make padding responsive
  },
  name: {
    fontWeight: 'bold',
    fontSize: wp('4%'), // Make font size responsive
    color: '#fff',
    paddingHorizontal: wp('3%'),
    marginBottom: hp('1%'), // Make margin responsive
  },
  caption: {
    color: '#fff',
    paddingHorizontal: wp('3%'),
    fontSize: wp('3.5%'), // Make font size responsive
    marginBottom: hp('1.5%'), // Make margin responsive
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    gap: wp('2%'), // Make gap responsive
  },
  location: {
    color: '#ccc',
    fontSize: wp('3%'), // Make font size responsive
  },
});
