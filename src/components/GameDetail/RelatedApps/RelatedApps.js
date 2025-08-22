import { FlatList, Image, View } from 'react-native';

export const RelatedApps = ({ apps }) => {
  return (
    <View style={{ alignSelf: 'center' }}>
      <FlatList
        data={apps}
        horizontal
        renderItem={({ item }) => (
          <View style={{ marginRight: 10 }}>
            <Image
              source={item.image}
              style={{ width: 100, height: 100, borderRadius: 10 }}
            />
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
