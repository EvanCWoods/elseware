import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { theme } from '../config/theme';
import { VUMeter } from './VUMeter';

interface HeaderProps {
  masterVolume: number;
  onMasterVolumeChange: (value: number) => void;
  vuLevel: Animated.Value;
}

export function Header({ masterVolume, onMasterVolumeChange, vuLevel }: HeaderProps) {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoRow}>
        <View style={styles.ledDot} />
        <Text style={styles.logoText}>
          <Text style={styles.logoAccent}>ELSE</Text>WARE
        </Text>
      </View>
      <Text style={styles.subtitle}>craft your soundscape</Text>

      {/* VU Meter */}
      <View style={styles.vuSection}>
        <Text style={styles.sectionLabel}>LEVEL</Text>
        <VUMeter level={vuLevel} />
      </View>

      {/* Master Volume */}
      <View style={styles.masterSection}>
        <Text style={styles.sectionLabel}>MASTER</Text>
        <View style={styles.masterRow}>
          <Slider
            style={styles.masterSlider}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={masterVolume}
            onValueChange={(val) => onMasterVolumeChange(Math.round(val))}
            minimumTrackTintColor={theme.accent}
            maximumTrackTintColor={theme.border}
            thumbTintColor={theme.accent}
          />
          <Text style={styles.masterValue}>{masterVolume}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ledDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.green,
    shadowColor: theme.green,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '300',
    color: theme.text,
    letterSpacing: 4,
  },
  logoAccent: {
    color: theme.accent,
    fontWeight: '400',
  },
  subtitle: {
    fontSize: 11,
    color: theme.textMuted,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginTop: 2,
    marginLeft: 16,
  },
  vuSection: {
    marginTop: 20,
  },
  sectionLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
    color: theme.textMuted,
    marginBottom: 6,
  },
  masterSection: {
    marginTop: 12,
  },
  masterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  masterSlider: {
    flex: 1,
    height: 32,
  },
  masterValue: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.text,
    width: 30,
    textAlign: 'right',
  },
});
