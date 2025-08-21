import React from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ExpandableSection({ 
  sections = [], 
  expandedSections = {}, 
  onToggleSection = () => {} 
}) {
  const renderChevron = (isExpanded) => (
    <Text style={[styles.chevron, isExpanded && styles.chevronExpanded]}>
      {isExpanded ? '▼' : '▶'}
    </Text>
  );

  return (
    <View style={styles.container}>
      {sections.map((section) => {
        const isExpanded = expandedSections[section.id] || false;
        
        return (
          <View key={section.id} style={styles.sectionContainer}>
            <Pressable
              style={styles.sectionHeader}
              onPress={() => onToggleSection(section.id)}
            >
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {renderChevron(isExpanded)}
            </Pressable>
            
            {isExpanded && (
              <View style={styles.sectionContent}>
                <Text style={styles.sectionText}>{section.content}</Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('4%'),
    backgroundColor: '#fff',
  },
  sectionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('2%'),
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Poppins',
    letterSpacing: 0.5,
  },
  chevron: {
    fontSize: wp('4%'),
    color: '#6B7280',
    transform: [{ rotate: '0deg' }],
    fontFamily: 'System',
  },
  chevronExpanded: {
    transform: [{ rotate: '180deg' }],
  },
  sectionContent: {
    paddingHorizontal: wp('2%'),
    paddingBottom: hp('2%'),
  },
  sectionText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    fontFamily: 'Poppins',
  },
});
