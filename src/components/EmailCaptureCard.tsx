import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { theme } from '../config/theme';

interface EmailCaptureCardProps {
  onSubmit: (email: string) => Promise<void>;
  onDismiss: () => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailCaptureCard({ onSubmit, onDismiss }: EmailCaptureCardProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setError('that doesn’t look like an email');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit(trimmed);
      setSubmitted(true);
    } catch {
      setError('couldn’t save it. try again.');
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <View style={styles.card}>
        <Text style={styles.eyebrow}>YOU&apos;RE IN</Text>
        <Text style={styles.title}>check your inbox.</Text>
        <Text style={styles.body}>
          wallpapers + the lock-in protocol arrive within an hour.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>YOU&apos;RE IN</Text>
      <Text style={styles.title}>one last thing.</Text>
      <Text style={styles.body}>
        want the 12 wallpapers + your spot on the founders wall? drop your
        email. one message. no list.
      </Text>

      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={email}
        onChangeText={(t) => {
          setEmail(t);
          if (error) setError(null);
        }}
        placeholder="your@email.com"
        placeholderTextColor={theme.textMuted}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        editable={!submitting}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Pressable
        style={[styles.primaryButton, submitting && styles.primaryButtonDisabled]}
        onPress={handleSubmit}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator color={theme.white} />
        ) : (
          <Text style={styles.primaryButtonText}>Send Them</Text>
        )}
      </Pressable>

      <Pressable
        style={styles.dismissButton}
        onPress={onDismiss}
        disabled={submitting}
        hitSlop={8}
      >
        <Text style={styles.dismissText}>skip</Text>
      </Pressable>
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
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 2.5,
    color: theme.accent,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    color: theme.text,
    marginBottom: 6,
  },
  body: {
    fontSize: 13,
    color: theme.textDim,
    lineHeight: 19,
    marginBottom: 16,
  },
  input: {
    backgroundColor: theme.white,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: theme.text,
    marginBottom: 6,
  },
  inputError: {
    borderColor: '#c97070',
  },
  errorText: {
    fontSize: 11,
    color: '#c97070',
    marginBottom: 8,
    marginLeft: 4,
  },
  primaryButton: {
    backgroundColor: theme.accent,
    borderRadius: theme.borderRadius.md,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonDisabled: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: theme.white,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  dismissButton: {
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  dismissText: {
    fontSize: 12,
    color: theme.textMuted,
    textDecorationLine: 'underline',
  },
});
