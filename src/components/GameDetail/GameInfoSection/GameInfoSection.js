import { Text, View } from 'react-native';
import { hp, wp } from '../../../utils/helpers/responsive';

export const AppInfo = ({
  appName,
  appSize,
  downloads,
  rating,
  reviewsCount,
}) => {
  return (
    <View
      style={{ marginHorizontal: wp(7), gap: wp(2), marginVertical: hp(2) }}
    >
      <Text style={{ fontSize: hp(3.5), fontWeight: 'bold' }}>{appName}</Text>
      <View style={{ flexDirection: 'row', gap: wp(2) }}>
        <Text>{`⭐ ${rating}  `}</Text>
        <Text>{`${reviewsCount} Reviews`}</Text>
        <Text>{`${appSize} · ${downloads} K+`}</Text>
      </View>
    </View>
  );
};
