import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../config/theme';

interface PresetButtonProps {
  name: string;
  isActive: boolean;
  onPress: () => void;
  onLongPress?: () => void;
  locked?: boolean;
}

export function PresetButton({ name, isActive, onPress, onLongPress, locked }: PresetButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        styles.button,
        isActive && styles.buttonActive,
        locked && styles.buttonLocked,
        pressed && styles.buttonPressed,
      ]}
    >
      <View style={styles.row}>
        {locked && (
          <Text style={[styles.lock, isActive && styles.lockActive]}>◆</Text>
        )}
        <Text
          style={[
            styles.label,
            isActive && styles.labelActive,
            locked && !isActive && styles.labelLocked,
          ]}
        >
          {name}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: theme.border,
    backgroundColor: theme.white,
    marginRight: 10,
  },
  buttonActive: {
    backgroundColor: theme.accent,
    borderColor: theme.accent,
  },
  buttonLocked: {
    backgroundColor: theme.bgWarm,
    borderStyle: 'dashed',
    borderColor: theme.accentLight,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  lock: {
    fontSize: 9,
    color: theme.accent,
    marginRight: 2,
  },
  lockActive: {
    color: theme.white,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.text,
  },
  labelActive: {
    color: theme.white,
  },
  labelLocked: {
    color: theme.textDim,
  },
});
