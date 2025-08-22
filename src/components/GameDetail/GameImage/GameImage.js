import { Image } from 'react-native';
import { hp, wp } from '../../../utils/helpers/responsive';

export const AppIcon = ({ imageSource }) => {
  return (
    <Image
      source={imageSource}
      resizeMode="cover"
      style={{
        width: wp(90),
        height: hp(35),
        borderRadius: 10,
        alignSelf: 'center',
      }}
    />
  );
};
