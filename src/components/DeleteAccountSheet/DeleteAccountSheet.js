import React, { useCallback, useMemo, useRef } from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Feather'; // or any icon lib you use

const DeleteAccountSheet = ({ onDelete, onClose }) => {
  // snapPoints for the sheet height
  const snapPoints = useMemo(() => ['40%'], []);

  return (
    <BottomSheetView style={styles.sheetContainer}>
      {/* Close Button */}
      <Pressable style={styles.closeButton} onPress={onClose} hitSlop={16}>
        <Icon name="x" size={28} color="#222" />
      </Pressable>

      {/* Title */}
      <Text style={styles.title}>Delete Your Account!</Text>

      {/* Description */}
      <Text style={styles.description}>
        Do you really want to delete your account? All of your data will be
        deleted, and you won’t be able to recover again!
      </Text>
      <Text style={styles.description2}>Do you really want to proceed?</Text>

      {/* Delete Button */}
      <Pressable style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
    </BottomSheetView>
  );
};

export default DeleteAccountSheet;

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  closeButton: {
    position: 'absolute',
    top: 18,
    right: 18,
    zIndex: 10,
    padding: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginBottom: 18,
    alignSelf: 'flex-start',
  },
  description: {
    fontSize: 15,
    color: '#7B7B7B',
    textAlign: 'left',
    marginBottom: 6,
    alignSelf: 'flex-start',
    lineHeight: 22,
  },
  description2: {
    fontSize: 15,
    color: '#7B7B7B',
    textAlign: 'left',
    marginBottom: 32,
    alignSelf: 'flex-start',
    lineHeight: 22,
  },
  deleteButton: {
    width: '100%',
    backgroundColor: '#B10000',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
