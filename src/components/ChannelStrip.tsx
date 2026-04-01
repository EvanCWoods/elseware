import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { theme } from '../config/theme';
import { CHANNEL_ICONS } from '../config/icons';
import { PushButton } from './PushButton';

interface ChannelStripProps {
  id: string;
  name: string;
  active: boolean;
  volume: number;
  onToggle: (id: string) => void;
  onVolumeChange: (id: string, volume: number) => void;
}

export const ChannelStrip = React.memo(function ChannelStrip({
  id,
  name,
  active,
  volume,
  onToggle,
  onVolumeChange,
}: ChannelStripProps) {
  const IconComponent = CHANNEL_ICONS[id];

  const handleToggle = useCallback(() => onToggle(id), [id, onToggle]);
  const handleVolume = useCallback(
    (val: number) => onVolumeChange(id, Math.round(val)),
    [id, onVolumeChange],
  );

  return (
    <View style={[styles.container, active && styles.containerActive]}>
      {/* LED indicator */}
      <View style={[styles.led, active && styles.ledActive]} />

      {/* Icon and name */}
      <View style={styles.iconRow}>
        {IconComponent && (
          <IconComponent size={28} color={active ? theme.accent : theme.textDim} />
        )}
      </View>
      <Text style={[styles.name, active && styles.nameActive]} numberOfLines={1}>
        {name}
      </Text>

      {/* ON/OFF button */}
      <PushButton active={active} onPress={handleToggle} />

      {/* Volume slider */}
      <View style={styles.sliderRow}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={volume}
          onValueChange={handleVolume}
          minimumTrackTintColor={active ? theme.accent : theme.border}
          maximumTrackTintColor={theme.border}
          thumbTintColor={active ? theme.accent : '#ccc'}
        />
        <Text style={styles.volumeValue}>{volume}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    padding: 12,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
    position: 'relative',
  },
  containerActive: {
    backgroundColor: theme.accentSoft,
    borderColor: theme.accentLight,
  },
  led: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.border,
  },
  ledActive: {
    backgroundColor: theme.green,
    shadowColor: theme.green,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  iconRow: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    color: theme.textDim,
    textTransform: 'uppercase',
    marginBottom: 8,
    textAlign: 'center',
  },
  nameActive: {
    color: theme.accent,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
  },
  slider: {
    flex: 1,
    height: 28,
  },
  volumeValue: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.textMuted,
    width: 24,
    textAlign: 'right',
  },
});
