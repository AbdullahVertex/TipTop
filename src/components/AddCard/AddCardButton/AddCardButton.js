import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { hp, wp } from '../../../utils/helpers/responsive';

const AddCardButton = ({ onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && { opacity: 0.7 }]}
      onPress={onPress}
    >
      <MaskedView maskElement={<Text style={styles.text}>Add Card</Text>}>
        <LinearGradient
          colors={['#F61D80', '#8774FF', '#343DFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        />
      </MaskedView>
      <LinearGradient
        colors={['#F61D80', '#8774FF', '#343DFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.iconContainer}
      >
        <Icon name="add" size={20} color="white" />
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
  },
  text: {
    fontSize: hp(2),
  },
  gradient: {
    width: 100, // match text size
    height: 25,
  },
  iconContainer: {
    // marginLeft: 8,
    padding: Platform.OS === 'android' ? wp(0.2) : undefined,
    width: Platform.OS === 'ios' ? wp(5.2) : undefined,
    alignItems: 'center',
    height: Platform.OS === 'ios' ? hp(2.3) : undefined,
    borderRadius: 50,
  },
});

export default AddCardButton;
