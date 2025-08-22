import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Import the Linear Gradient
import { wp, hp } from '../../utils/helpers/responsive';
import Verified from '../../assets/svgs/VerifiedSymbol.svg';
import VS from '../../assets/svgs/VS_Symbol.svg';

const StreamCard = ({
  type,
  avatar,
  avatarLeft,
  avatarRight,
  avatars,
  username,
  viewers,
  cardStyle2,
  description,
  gradientColors,
}) => {
  return (
    <LinearGradient colors={gradientColors} style={[styles.card, cardStyle2]}>
      {/* Avatar(s) */}
      {type === 'solo' && <Image source={avatar} style={styles.avatar} />}
      {type === 'battle' && (
        <View style={styles.battleWrapper}>
          <Image
            source={avatarLeft}
            style={[styles.battleAvatar, styles.battleLeftAvatar]}
          />
          <VS style={styles.vsSymbol} width={wp(20)} height={wp(10)} />
          <Image
            source={avatarRight}
            style={[styles.battleAvatar, styles.battleRightAvatar]}
          />
        </View>
      )}
      {type === 'group' && (
        <View style={styles.groupWrapper}>
          <Image source={avatars[0]} style={styles.avatar} />
          <View style={styles.smallAvatarsWrapper}>
            {avatars.slice(1).map((img, idx) => (
              <Image key={idx} source={img} style={styles.smallAvatar} />
            ))}
          </View>
        </View>
      )}

      {/* Info */}
      <View style={styles.info}>
        <View style={styles.username}>
          <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600' }}>
            {username}{' '}
          </Text>
          <Verified />
        </View>
        <Text style={styles.viewers}>{viewers} Viewers</Text>
        <Text style={styles.desc}>{description}</Text>
      </View>
    </LinearGradient>
  );
};

export default StreamCard;

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: Platform.OS === 'android' ? wp(1) : 0,
    paddingVertical: Platform.OS === 'android' ? hp(5) : 0,
    width: '50%',
    justifyContent: 'center',
    height: Platform.OS === 'ios' ? hp(30) : undefined,
  },
  avatar: {
    width: wp(18), // Responsive width for solo avatar
    height: wp(18),
    borderRadius: wp(9),
    alignSelf: 'center',
    marginBottom: wp(2),
  },
  battleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: wp(2),
  },
  battleLeftAvatar: {
    width: wp(14), // Responsive width for battle avatars
    height: wp(14),
    borderRadius: wp(7),
    marginRight: wp(3), // Adjust left avatar to overlap the right one
    zIndex: 1, // Ensure left avatar stays on top
  },
  battleRightAvatar: {
    width: wp(14), // Responsive width for battle avatars
    height: wp(14),
    borderRadius: wp(7),
  },
  vsSymbol: {
    position: 'absolute',
    //top: wp(1), // Adjust the vertical position of the VS symbol
    alignSelf: 'center',
    fontSize: wp(6),
    zIndex: 2, // Ensure the VS symbol is above the avatars
  },
  groupWrapper: {
    alignItems: 'center',
    marginBottom: wp(2),
  },
  smallAvatarsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: wp(3),
    marginTop: wp(1),
  },
  smallAvatar: {
    width: wp(10), // Smaller avatars for the group type
    height: wp(10),
    borderRadius: wp(5),
  },
  info: {
    alignItems: 'center',
  },
  username: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flexDirection: 'row',
    paddingHorizontal: wp(2),
    paddingVertical: wp(1),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    marginBottom: wp(1),
  },
  viewers: {
    fontSize: hp(1.4),
    color: '#666',
    marginBottom: wp(1.5),
  },
  desc: {
    textAlign: 'center',
    fontSize: hp(1.5),
    paddingHorizontal: wp(3),
    color: '#FFFFFF',
  },
});
