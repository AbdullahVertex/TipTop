import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AddCardDescription = () => (
  <View style={styles.container}>
    <View style={styles.headerRow}>
      <View style={styles.iconCircle}>
        <Icon name="card-outline" size={28} color="#D16FFF" />
      </View>
      <Text style={styles.headerText}>Add new card</Text>
    </View>
    <Text style={styles.description}>
      Streamline your checkout process by adding a new card for future
      transactions.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 8,
    alignItems: 'flex-start',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#E5D1FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
  },
  description: {
    fontSize: 15,
    color: '#B0B0B0',
    marginTop: 2,
    marginLeft: 4,
    fontWeight: '400',
  },
});

export default AddCardDescription;
