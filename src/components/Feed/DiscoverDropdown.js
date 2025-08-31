import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const DiscoverDropdown = ({ isVisible, onOptionSelect, onClose }) => {
  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      <View style={styles.dropdownContainer}>
        <View style={styles.arrow} />
        <TouchableOpacity
          style={styles.option}
          onPress={() => onOptionSelect('DISCOVER')}
        >
          <Text style={styles.selectedText}>DISCOVER</Text>
          <Image 
            source={require('../../assets/icons/DiscoverTick.png')} 
            style={styles.tickIcon}
          />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          style={styles.feedsOption}
          onPress={() => onOptionSelect('FEEDS')}
        >
          <Text style={styles.optionText}>FEEDS</Text>
        </TouchableOpacity>
        <View style={styles.bottomSpace} />
      </View>
    </View>
  );
};

export default DiscoverDropdown;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1001,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    width: 338,
    height: 100,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  arrow: {
    position: 'absolute',
    top: -8,
    alignSelf: 'center',
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: 120,
  },
  feedsOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 25,
    minWidth: 120,
  },
  optionText: {
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    color: '#666',
    width: 67,
    height: 26,
  },
  selectedText: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    color: '#000',
    width: 105,
    height: 26,
  },
  tickIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  bottomSpace: {
    height: 15,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 16,
  },
});
