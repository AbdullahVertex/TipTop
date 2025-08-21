import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import GameCard from '../GameCard/GameCard';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function SectionGrid({ title, data, onPressItem }) {
  const { width } = useWindowDimensions();
  const numCols = width >= 768 ? 3 : 2; // tablet-friendly

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{title}</Text>

      <FlatList
        data={data}
        key={numCols} // force re-render if column count changes
        keyExtractor={it => it.id}
        renderItem={({ item }) => (
          <GameCard item={item} onPress={onPressItem} />
        )}
        numColumns={numCols}
        columnWrapperStyle={
          numCols > 1 ? { justifyContent: 'space-between' } : undefined
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(4) }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: wp(3.5) }, // ~14–18px depending on device
  heading: {
    fontSize: wp(8.5), // ~34px on 400dp width; scales up/down
    // fontWeight: '800',
    color: '#111',
    marginLeft: wp(3),
    marginTop: hp(1),
    marginBottom: hp(2.2),
  },
});
