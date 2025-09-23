import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { wp, hp } from '../../utils/helpers/responsive';

const { width } = Dimensions.get('window');

const FloatingHeader = ({ navigation, currentTab = 'DISCOVER' }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSelect = tab => {
    setDropdownVisible(false);
    if (tab === 'FEEDS') {
      navigation.navigate('Feed');
    }
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.centerContainer}
          activeOpacity={0.7}
          onPress={() => setDropdownVisible(true)}
        >
          <Text style={styles.headerTitle}>{currentTab}</Text>
          <Icon
            name="chevron-down"
            size={wp(5)}
            color="#fff"
            style={{ marginLeft: wp(1.5) }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoButton} activeOpacity={0.7}>
          <View style={styles.infoCircle}>
            <Icon name="information-outline" size={wp(5)} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Dropdown Modal */}
      <Modal
        visible={dropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={styles.dropdownContainer}>
            <View style={styles.arrowUp} />
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => handleSelect('DISCOVER')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.dropdownText,
                  currentTab === 'DISCOVER' && styles.selectedDropdownText,
                ]}
              >
                DISCOVER
              </Text>
              {currentTab === 'DISCOVER' && (
                <View style={styles.checkCircle}>
                  <Icon name="checkmark" size={wp(4)} color="#fff" />
                </View>
              )}
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => handleSelect('FEEDS')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.dropdownText,
                  currentTab === 'FEEDS' && styles.selectedDropdownText,
                ]}
              >
                FEEDS
              </Text>
              {currentTab === 'FEEDS' && (
                <View style={styles.checkCircle}>
                  <Icon name="checkmark" size={wp(4)} color="#fff" />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: hp(5), // for status bar
    paddingBottom: hp(2),
    backgroundColor: 'rgba(0,0,0,0.0)', // transparent
    zIndex: 100,
  },
  centerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: hp(2.5),
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  infoButton: {
    position: 'absolute',
    right: wp(6),
    top: hp(5),
  },
  infoCircle: {
    width: wp(4),
    height: wp(4),
    borderRadius: wp(5),
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  // Dropdown styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.10)',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dropdownContainer: {
    marginTop: hp(12),
    width: wp(90),
    backgroundColor: '#fff',
    borderRadius: wp(4),
    alignItems: 'flex-start',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    paddingVertical: hp(1),
  },
  arrowUp: {
    position: 'absolute',
    top: -hp(2),
    right: wp(25),
    width: 0,
    height: 0,
    borderLeftWidth: wp(4),
    borderRightWidth: wp(4),
    borderBottomWidth: wp(4),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#fff',
    zIndex: 10,
  },
  dropdownOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(6),
    width: '100%',
  },
  dropdownText: {
    fontSize: hp(1.5),
    fontWeight: 'bold',
    color: '#888',
    flex: 1,
  },
  selectedDropdownText: {
    color: '#222',
  },
  checkCircle: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(3.5),
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp(2),
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    width: '90%',
    alignSelf: 'center',
  },
});

export default FloatingHeader;
