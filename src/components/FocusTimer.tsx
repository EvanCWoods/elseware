import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../config/theme';
import { TimerStatus, formatRemaining } from '../hooks/useFocusTimer';

interface FocusTimerProps {
  status: TimerStatus;
  remainingSeconds: number;
  totalSeconds: number;
  isPro: boolean;
  onStart: (seconds: number) => void;
  onPause: () => void;
  onResume: () => void;
  onCancel: () => void;
  onDismissCompleted: () => void;
  onLockedPress: () => void;
}

const PRESETS: { label: string; seconds: number }[] = [
  { label: '25', seconds: 25 * 60 },
  { label: '45', seconds: 45 * 60 },
  { label: '90', seconds: 90 * 60 },
];

export function FocusTimer({
  status,
  remainingSeconds,
  totalSeconds,
  isPro,
  onStart,
  onPause,
  onResume,
  onCancel,
  onDismissCompleted,
  onLockedPress,
}: FocusTimerProps) {
  if (!isPro) {
    return (
      <Pressable style={styles.lockedCard} onPress={onLockedPress}>
        <View style={styles.lockedRow}>
          <Text style={styles.lockedIcon}>◆</Text>
          <View style={styles.lockedText}>
            <Text style={styles.lockedTitle}>The 90-Minute Focus Timer</Text>
            <Text style={styles.lockedSub}>part of the Lifetime Unlock</Text>
          </View>
        </View>
      </Pressable>
    );
  }

  if (status === 'completed') {
    return (
      <View style={styles.card}>
        <Text style={styles.eyebrow}>LOCKED IN</Text>
        <Text style={styles.completedTitle}>Time's up.</Text>
        <Text style={styles.completedSub}>
          {Math.round(totalSeconds / 60)} minutes. Keep going or close it out.
        </Text>
        <Pressable style={styles.primaryAction} onPress={onDismissCompleted}>
          <Text style={styles.primaryActionText}>Done</Text>
        </Pressable>
      </View>
    );
  }

  if (status === 'idle') {
    return (
      <View style={styles.card}>
        <Text style={styles.eyebrow}>FOCUS TIMER</Text>
        <Text style={styles.idleTitle}>Lock in for…</Text>
        <View style={styles.presetRow}>
          {PRESETS.map((p) => (
            <Pressable
              key={p.label}
              style={styles.presetButton}
              onPress={() => onStart(p.seconds)}
            >
              <Text style={styles.presetButtonNumber}>{p.label}</Text>
              <Text style={styles.presetButtonUnit}>min</Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.idleHint}>The audio keeps playing. The timer measures the lock.</Text>
      </View>
    );
  }

  // running or paused
  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>{status === 'running' ? 'LOCKED IN' : 'PAUSED'}</Text>
      <Text style={styles.bigTime}>{formatRemaining(remainingSeconds)}</Text>
      <Text style={styles.runningSub}>
        {Math.round(totalSeconds / 60)} minute lock-in
      </Text>
      <View style={styles.controlRow}>
        {status === 'running' ? (
          <Pressable style={styles.secondaryAction} onPress={onPause}>
            <Text style={styles.secondaryActionText}>Pause</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.primaryAction} onPress={onResume}>
            <Text style={styles.primaryActionText}>Resume</Text>
          </Pressable>
        )}
        <Pressable style={styles.tertiaryAction} onPress={onCancel}>
          <Text style={styles.tertiaryActionText}>End</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 22,
    paddingHorizontal: 22,
    backgroundColor: theme.bgWarm,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    alignItems: 'center',
  },
  lockedCard: {
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: theme.bgWarm,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.accentLight,
    borderStyle: 'dashed',
  },
  lockedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  lockedIcon: {
    fontSize: 14,
    color: theme.accent,
  },
  lockedText: {
    flex: 1,
  },
  lockedTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.text,
    marginBottom: 2,
  },
  lockedSub: {
    fontSize: 11,
    color: theme.textDim,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 2.5,
    color: theme.accent,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  idleTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.text,
    marginBottom: 14,
  },
  idleHint: {
    fontSize: 11,
    color: theme.textMuted,
    marginTop: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  presetRow: {
    flexDirection: 'row',
    gap: 10,
  },
  presetButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    backgroundColor: theme.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  presetButtonNumber: {
    fontSize: 22,
    fontWeight: '600',
    color: theme.text,
    fontVariant: ['tabular-nums'],
    lineHeight: 26,
  },
  presetButtonUnit: {
    fontSize: 10,
    color: theme.textMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  bigTime: {
    fontSize: 56,
    fontWeight: '300',
    color: theme.text,
    fontVariant: ['tabular-nums'],
    letterSpacing: -2,
    marginBottom: 4,
  },
  runningSub: {
    fontSize: 12,
    color: theme.textDim,
    marginBottom: 18,
  },
  controlRow: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryAction: {
    backgroundColor: theme.accent,
    paddingHorizontal: 28,
    paddingVertical: 11,
    borderRadius: theme.borderRadius.md,
  },
  primaryActionText: {
    color: theme.white,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  secondaryAction: {
    backgroundColor: theme.white,
    paddingHorizontal: 28,
    paddingVertical: 11,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.cardBorder,
  },
  secondaryActionText: {
    color: theme.text,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  tertiaryAction: {
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  tertiaryActionText: {
    color: theme.textMuted,
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  completedTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: theme.text,
    marginBottom: 6,
  },
  completedSub: {
    fontSize: 13,
    color: theme.textDim,
    marginBottom: 16,
    textAlign: 'center',
  },
});
