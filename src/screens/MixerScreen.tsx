import React, { useCallback, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '../config/theme';
import { MUSIC_CHANNELS, SFX_CHANNELS, ALL_CHANNELS } from '../config/channels';
import { PRESETS } from '../config/presets';
import { ChannelState, Preset } from '../types';
import { useAudioEngine } from '../hooks/useAudioEngine';
import { useVUMeter } from '../hooks/useVUMeter';
import { useBackgroundAudioGate } from '../hooks/useBackgroundAudioGate';
import { useSavedMixes } from '../hooks/useSavedMixes';
import { usePurchaseContext } from '../context/PurchaseContext';
import { Header } from '../components/Header';
import { ChannelStrip } from '../components/ChannelStrip';
import { PresetButton } from '../components/PresetButton';
import { BackgroundShapes } from '../components/BackgroundShapes';
import { PaywallModal } from '../components/PaywallModal';

function buildInitialChannels(): Record<string, ChannelState> {
  const channels: Record<string, ChannelState> = {};
  ALL_CHANNELS.forEach((c) => {
    channels[c.id] = { active: false, volume: 50, sound: null };
  });
  return channels;
}

export function MixerScreen() {
  const [masterVolume, setMasterVolume] = useState(70);
  const [channels, setChannels] = useState<Record<string, ChannelState>>(buildInitialChannels);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const { isPro, priceString, paywallVisible, isLoading, showPaywall, hidePaywall, purchase, restore } = usePurchaseContext();

  const { toggleChannel, setChannelVolume, handleMasterVolume, applyPreset, soundsRef } =
    useAudioEngine(channels, masterVolume, setChannels, setMasterVolume, isPro);

  const vuLevel = useVUMeter(channels, masterVolume);
  const { savedMixes, saveMix, deleteMix } = useSavedMixes(isPro);

  useBackgroundAudioGate(isPro, channels, soundsRef);

  const handleToggle = useCallback(
    async (id: string) => {
      setActivePreset(null);
      const result = await toggleChannel(id);
      if (result === 'limit_reached') {
        showPaywall();
      }
    },
    [toggleChannel, showPaywall],
  );

  const handleVolumeChange = useCallback(
    (id: string, volume: number) => {
      setChannelVolume(id, volume);
    },
    [setChannelVolume],
  );

  const handlePreset = useCallback(
    async (preset: Preset) => {
      const result = await applyPreset(preset);
      if (result === 'limit_reached') {
        showPaywall();
        return;
      }
      setActivePreset(preset.name === 'Clear All' ? null : preset.name);
    },
    [applyPreset, showPaywall],
  );

  const handleSaveMix = useCallback(() => {
    Alert.prompt('Save Mix', 'Give your mix a name:', (name) => {
      if (name?.trim()) {
        saveMix(name.trim(), channels, masterVolume);
      }
    });
  }, [saveMix, channels, masterVolume]);

  const handleLoadMix = useCallback(
    async (mix: typeof savedMixes[number]) => {
      // Build a pseudo-preset from the saved mix
      const music: Record<string, number> = {};
      const sfx: Record<string, number> = {};
      const musicIds = new Set(MUSIC_CHANNELS.map((c) => c.id));

      Object.entries(mix.channels).forEach(([id, state]) => {
        if (state.active) {
          if (musicIds.has(id)) {
            music[id] = state.volume;
          } else {
            sfx[id] = state.volume;
          }
        }
      });

      const preset: Preset = { name: mix.name, music, sfx };
      const result = await applyPreset(preset);
      if (result === 'limit_reached') {
        showPaywall();
        return;
      }
      setActivePreset(null);
      if (mix.masterVolume !== masterVolume) {
        handleMasterVolume(mix.masterVolume);
      }
    },
    [applyPreset, showPaywall, masterVolume, handleMasterVolume],
  );

  return (
    <View style={styles.root}>
      <BackgroundShapes />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Header
          masterVolume={masterVolume}
          onMasterVolumeChange={handleMasterVolume}
          vuLevel={vuLevel}
        />

        {!isPro && (
          <View style={styles.proButtonWrapper}>
            <Pressable style={styles.proButton} onPress={showPaywall}>
              <Text style={styles.proButtonText}>UPGRADE TO PRO</Text>
            </Pressable>
          </View>
        )}

        {/* Music Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Music</Text>
          <View style={styles.grid}>
            {MUSIC_CHANNELS.map((ch) => (
              <ChannelStrip
                key={ch.id}
                id={ch.id}
                name={ch.name}
                active={channels[ch.id]?.active ?? false}
                volume={channels[ch.id]?.volume ?? 50}
                onToggle={handleToggle}
                onVolumeChange={handleVolumeChange}
              />
            ))}
          </View>
        </View>

        {/* Soundscapes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Soundscapes</Text>
          <View style={styles.grid}>
            {SFX_CHANNELS.map((ch) => (
              <ChannelStrip
                key={ch.id}
                id={ch.id}
                name={ch.name}
                active={channels[ch.id]?.active ?? false}
                volume={channels[ch.id]?.volume ?? 50}
                onToggle={handleToggle}
                onVolumeChange={handleVolumeChange}
              />
            ))}
          </View>
        </View>

        {/* Places Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Places</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.presetsRow}
          >
            {PRESETS.map((preset) => (
              <PresetButton
                key={preset.name}
                name={preset.name}
                isActive={activePreset === preset.name}
                onPress={() => handlePreset(preset)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Saved Mixes Section */}
        {isPro && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Mixes</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.presetsRow}
            >
              <Pressable style={styles.saveMixButton} onPress={handleSaveMix}>
                <Text style={styles.saveMixText}>+ Save Current</Text>
              </Pressable>
              {savedMixes.map((mix) => (
                <PresetButton
                  key={mix.id}
                  name={mix.name}
                  isActive={false}
                  onPress={() => handleLoadMix(mix)}
                  onLongPress={() => {
                    Alert.alert('Delete Mix', `Delete "${mix.name}"?`, [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Delete', style: 'destructive', onPress: () => deleteMix(mix.id) },
                    ]);
                  }}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            ELSEWARE <Text style={styles.footerDot}>●</Text> put yourself somewhere
          </Text>
        </View>
      </ScrollView>

      <PaywallModal
        visible={paywallVisible}
        onClose={hidePaywall}
        onPurchase={purchase}
        onRestore={restore}
        isLoading={isLoading}
        priceString={priceString}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.bg,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingTop: 60,
    paddingBottom: 40,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: theme.textDim,
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  presetsRow: {
    paddingVertical: 4,
  },
  proButtonWrapper: {
    paddingHorizontal: 20,
    marginTop: 16,
    alignItems: 'center',
  },
  proButton: {
    backgroundColor: theme.accentSoft,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: theme.accentLight,
  },
  proButtonText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2,
    color: theme.accent,
    textTransform: 'uppercase',
  },
  saveMixButton: {
    backgroundColor: theme.accentSoft,
    borderRadius: theme.borderRadius.md,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: theme.accentLight,
  },
  saveMixText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.accent,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 10,
    letterSpacing: 2,
    color: theme.textMuted,
    textTransform: 'uppercase',
  },
  footerDot: {
    color: theme.accent,
    fontSize: 8,
  },
});
