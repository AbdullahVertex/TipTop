import { Text, TouchableOpacity, View } from 'react-native';
import { hp, wp } from '../../../utils/helpers/responsive';

export const AppDescription = ({ description }) => {
  return (
    <View
      style={{ marginHorizontal: wp(7), gap: wp(2), marginVertical: hp(2) }}
    >
      <Text style={{ fontSize: hp(1.7), color: 'black', fontWeight: '600' }}>
        Description
      </Text>
      <Text style={{ color: '#7C7C7C' }}>{description}</Text>
      <TouchableOpacity onPress={() => console.log('Read More clicked')}>
        <Text style={{ color: 'blue' }}>Read More</Text>
      </TouchableOpacity>
    </View>
  );
};
