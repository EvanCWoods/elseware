import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { theme } from '../config/theme';

interface PresetButtonProps {
  name: string;
  isActive: boolean;
  onPress: () => void;
  onLongPress?: () => void;
}

export function PresetButton({ name, isActive, onPress, onLongPress }: PresetButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        styles.button,
        isActive && styles.buttonActive,
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={[styles.label, isActive && styles.labelActive]}>
        {name}
      </Text>
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
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.text,
  },
  labelActive: {
    color: theme.white,
  },
});
