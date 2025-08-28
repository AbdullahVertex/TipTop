import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import {
  Grayscale,
  Sepia,
  Tint,
  ColorMatrix,
  concatColorMatrices,
  invert,
  contrast,
  saturate,
} from 'react-native-color-matrix-image-filters';
import { hp } from '../../utils/helpers/responsive';

const { width } = Dimensions.get('window');

const EFFECTS = [
  { key: 'none', label: 'None' },
  { key: 'grayscale', label: 'Grayscale' },
  { key: 'sepia', label: 'Sepia' },
  { key: 'tint', label: 'Tint' },
  { key: 'invert', label: 'Invert' },
  { key: 'contrast', label: 'Contrast' },
  { key: 'saturate', label: 'Saturate' },
  { key: 'combo', label: 'Combo' },
];

const EffectsPortion = ({ imageUri, onClose }) => {
  const [selectedEffect, setSelectedEffect] = useState('none');

  const renderImageWithEffect = () => {
    const imageProps = {
      source: { uri: imageUri },
      style: styles.image,
      resizeMode: 'cover',
    };

    switch (selectedEffect) {
      case 'grayscale':
        return (
          <Grayscale>
            <Image {...imageProps} />
          </Grayscale>
        );
      case 'sepia':
        return (
          <Sepia>
            <Image {...imageProps} />
          </Sepia>
        );
      case 'tint':
        return (
          <Tint amount={1.25}>
            <Image {...imageProps} />
          </Tint>
        );
      case 'invert':
        return (
          <ColorMatrix matrix={invert()}>
            <Image {...imageProps} />
          </ColorMatrix>
        );
      case 'contrast':
        return (
          <ColorMatrix matrix={contrast(5.2)}>
            <Image {...imageProps} />
          </ColorMatrix>
        );
      case 'saturate':
        return (
          <ColorMatrix matrix={saturate(2)}>
            <Image {...imageProps} />
          </ColorMatrix>
        );
      case 'combo':
        return (
          <ColorMatrix
            matrix={concatColorMatrices(
              saturate(-0.9),
              contrast(5.2),
              invert(),
            )}
          >
            <Image {...imageProps} />
          </ColorMatrix>
        );
      default:
        return <Image {...imageProps} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.imageContainer}>{renderImageWithEffect()}</View>
      <View style={styles.effectsBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {EFFECTS.map(effect => (
            <TouchableOpacity
              key={effect.key}
              style={[
                styles.effectButton,
                selectedEffect === effect.key && styles.selectedEffectButton,
              ]}
              onPress={() => setSelectedEffect(effect.key)}
            >
              <Text
                style={[
                  styles.effectLabel,
                  selectedEffect === effect.key && styles.selectedEffectLabel,
                ]}
              >
                {effect.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {onClose && (
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  image: {
    width: width * 0.9,
    height: width * 1.2,
    borderRadius: 18,
    backgroundColor: '#222',
  },
  effectsBar: {
    backgroundColor: '#222',
    paddingVertical: 40,
    height: hp(20),
    alignSelf: 'flex-end',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    elevation: 8,
    alignItems: 'center',
  },
  effectButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    height: hp(4),
    marginHorizontal: 6,
    borderRadius: 16,
    backgroundColor: '#333',
  },
  selectedEffectButton: {
    backgroundColor: '#A855F7',
  },
  effectLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  selectedEffectLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 12,
    alignSelf: 'center',
    backgroundColor: '#A855F7',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EffectsPortion;
