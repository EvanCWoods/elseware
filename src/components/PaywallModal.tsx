import React from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { theme } from '../config/theme';

interface PaywallModalProps {
  visible: boolean;
  onClose: () => void;
  onPurchase: () => Promise<void>;
  onRestore: () => Promise<void>;
  isLoading: boolean;
  priceString: string | null;
}

function StackRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stackRow}>
      <Text style={styles.stackLabel}>{label}</Text>
      <Text style={styles.stackValue}>{value}</Text>
    </View>
  );
}

export function PaywallModal({ visible, onClose, onPurchase, onRestore, isLoading, priceString }: PaywallModalProps) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Pressable style={styles.closeButton} onPress={onClose} hitSlop={12}>
            <Text style={styles.closeText}>×</Text>
          </Pressable>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.eyebrow}>ELSEWARE LIFETIME UNLOCK</Text>
            <Text style={styles.title}>One purchase.{'\n'}Yours forever.</Text>
            <Text style={styles.subtitle}>No subscription. Ever.</Text>

            <View style={styles.divider} />

            <Text style={styles.includesLabel}>WHAT'S INCLUDED</Text>

            <View style={styles.stack}>
              <StackRow label="Mix all 18 channels at once" value="∞" />
              <StackRow label="Save unlimited mixes" value="∞" />
              <StackRow label="Background playback" value="✓" />
              <StackRow label="The Locked-In Preset Pack — 4 secret places" value="$19" />
              <StackRow label="The Lock-In Wallpapers — 12 phone wallpapers" value="$12" />
              <StackRow label="The 90-Minute Focus Timer" value="$19" />
              <StackRow label="Future places, free forever" value="$48" />
            </View>

            <View style={styles.valueAnchor}>
              <Text style={styles.valueAnchorTop}>Worth more than $147.</Text>
              <Text style={styles.valueAnchorBottom}>
                Yours for {priceString ?? '$9.99'}. Once.
              </Text>
            </View>

            <Pressable
              style={[styles.purchaseButton, isLoading && styles.purchaseButtonDisabled]}
              onPress={onPurchase}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={theme.white} />
              ) : (
                <Text style={styles.purchaseButtonText}>
                  {priceString ? `Unlock Forever — ${priceString}` : 'Unlock Forever'}
                </Text>
              )}
            </Pressable>

            <View style={styles.guarantee}>
              <Text style={styles.guaranteeTitle}>The Lock-In Guarantee</Text>
              <Text style={styles.guaranteeBody}>
                60 days. Lock in deeper, longer, or more often — or your money back.
                Keep the bonuses regardless. We only want regulars.
              </Text>
            </View>

            <Pressable style={styles.restoreButton} onPress={onRestore} disabled={isLoading}>
              <Text style={styles.restoreText}>Restore Purchase</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(46, 42, 36, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  card: {
    backgroundColor: theme.bgWarm,
    borderRadius: theme.borderRadius.xl,
    width: '100%',
    maxWidth: 400,
    maxHeight: '92%',
    borderWidth: 1,
    borderColor: theme.cardBorder,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingTop: 40,
    paddingBottom: 28,
    paddingHorizontal: 26,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 14,
    right: 18,
    zIndex: 10,
  },
  closeText: {
    fontSize: 22,
    color: theme.textMuted,
    fontWeight: '300',
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 3,
    color: theme.accent,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: '300',
    color: theme.text,
    textAlign: 'center',
    lineHeight: 34,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: theme.textDim,
    marginTop: 10,
  },
  divider: {
    width: 28,
    height: 1,
    backgroundColor: theme.cardBorder,
    marginVertical: 22,
  },
  includesLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 2.5,
    color: theme.textMuted,
    textTransform: 'uppercase',
    marginBottom: 14,
    alignSelf: 'flex-start',
  },
  stack: {
    width: '100%',
    gap: 10,
    marginBottom: 22,
  },
  stackRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  stackLabel: {
    flex: 1,
    fontSize: 13,
    color: theme.text,
    fontWeight: '400',
    paddingRight: 12,
  },
  stackValue: {
    fontSize: 12,
    color: theme.textDim,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  valueAnchor: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: theme.accentSoft,
    borderRadius: theme.borderRadius.md,
    marginBottom: 18,
    alignItems: 'center',
  },
  valueAnchorTop: {
    fontSize: 13,
    color: theme.textDim,
    fontWeight: '500',
    marginBottom: 4,
  },
  valueAnchorBottom: {
    fontSize: 16,
    color: theme.text,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  purchaseButton: {
    backgroundColor: theme.accent,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  purchaseButtonDisabled: {
    opacity: 0.6,
  },
  purchaseButtonText: {
    color: theme.white,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  guarantee: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    borderRadius: theme.borderRadius.md,
    marginBottom: 14,
  },
  guaranteeTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    color: theme.text,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  guaranteeBody: {
    fontSize: 12,
    color: theme.textDim,
    fontWeight: '400',
    lineHeight: 17,
  },
  restoreButton: {
    paddingVertical: 8,
  },
  restoreText: {
    fontSize: 12,
    color: theme.textMuted,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
});
