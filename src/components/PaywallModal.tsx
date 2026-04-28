import React from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
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

function BenefitRow({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <View style={styles.benefitRow}>
      <Text style={styles.benefitIcon}>{icon}</Text>
      <View style={styles.benefitText}>
        <Text style={styles.benefitTitle}>{title}</Text>
        <Text style={styles.benefitDesc}>{description}</Text>
      </View>
    </View>
  );
}

export function PaywallModal({ visible, onClose, onPurchase, onRestore, isLoading, priceString }: PaywallModalProps) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Pressable style={styles.closeButton} onPress={onClose} hitSlop={12}>
            <Text style={styles.closeText}>x</Text>
          </Pressable>

          <Text style={styles.title}>UNLOCK ELSEWARE</Text>
          <Text style={styles.subtitle}>One purchase. Yours forever.</Text>

          <View style={styles.benefits}>
            <BenefitRow
              icon="~"
              title="Unlimited sounds"
              description="Mix all 18 channels at once"
            />
            <BenefitRow
              icon=">"
              title="Save your mixes"
              description="Load them instantly next time"
            />
            <BenefitRow
              icon="*"
              title="Background playback"
              description="Keep listening when you switch apps"
            />
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

          <Pressable style={styles.restoreButton} onPress={onRestore} disabled={isLoading}>
            <Text style={styles.restoreText}>Restore Purchase</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(46, 42, 36, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: theme.bgWarm,
    borderRadius: theme.borderRadius.xl,
    paddingVertical: 36,
    paddingHorizontal: 28,
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.cardBorder,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 20,
  },
  closeText: {
    fontSize: 18,
    color: theme.textMuted,
    fontWeight: '300',
  },
  title: {
    fontSize: 18,
    fontWeight: '300',
    letterSpacing: 3,
    color: theme.text,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '300',
    color: theme.textDim,
    marginBottom: 28,
  },
  benefits: {
    width: '100%',
    marginBottom: 28,
    gap: 18,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  benefitIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.accentSoft,
    color: theme.accent,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 36,
    overflow: 'hidden',
  },
  benefitText: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.text,
    marginBottom: 2,
  },
  benefitDesc: {
    fontSize: 12,
    color: theme.textDim,
    fontWeight: '300',
  },
  purchaseButton: {
    backgroundColor: theme.accent,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
    marginBottom: 14,
  },
  purchaseButtonDisabled: {
    opacity: 0.6,
  },
  purchaseButtonText: {
    color: theme.white,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
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
