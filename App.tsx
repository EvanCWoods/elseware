import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { MixerScreen } from './src/screens/MixerScreen';
import { PurchaseProvider } from './src/context/PurchaseContext';

export default function App() {
  return (
    <PurchaseProvider>
      <StatusBar style="dark" />
      <MixerScreen />
    </PurchaseProvider>
  );
}
