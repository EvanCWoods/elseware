import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { theme } from '../config/theme';

interface PushButtonProps {
  active: boolean;
  onPress: () => void;
}

export function PushButton({ active, onPress }: PushButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        active ? styles.buttonActive : styles.buttonInactive,
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={[styles.label, active && styles.labelActive]}>
        {active ? 'ON' : 'OFF'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  buttonInactive: {
    backgroundColor: '#ece8e2',
    borderColor: '#d4d0ca',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonActive: {
    backgroundColor: theme.accent,
    borderColor: '#9478a5',
    shadowColor: theme.accent,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonPressed: {
    transform: [{ translateY: 1 }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    elevation: 1,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: theme.textDim,
  },
  labelActive: {
    color: theme.white,
  },
});
