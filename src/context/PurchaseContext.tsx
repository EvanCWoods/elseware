import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Purchases, { CustomerInfo, PurchasesPackage } from 'react-native-purchases';
import { REVENUECAT_API_KEY, ENTITLEMENT_ID } from '../config/constants';

interface PurchaseContextValue {
  isPro: boolean;
  priceString: string | null;
  paywallVisible: boolean;
  isLoading: boolean;
  showPaywall: () => void;
  hidePaywall: () => void;
  purchase: () => Promise<void>;
  restore: () => Promise<void>;
  needsEmailCapture: boolean;
  captureEmail: (email: string) => Promise<void>;
  dismissEmailCapture: () => Promise<void>;
}

const EMAIL_CAPTURE_STATE_KEY = '@elseware/email_capture_state';

const PurchaseContext = createContext<PurchaseContextValue>({
  isPro: false,
  priceString: null,
  paywallVisible: false,
  isLoading: false,
  showPaywall: () => {},
  hidePaywall: () => {},
  purchase: async () => {},
  restore: async () => {},
  needsEmailCapture: false,
  captureEmail: async () => {},
  dismissEmailCapture: async () => {},
});

export function usePurchaseContext() {
  return useContext(PurchaseContext);
}

export function PurchaseProvider({ children }: { children: React.ReactNode }) {
  const [isPro, setIsPro] = useState(false);
  const [pkg, setPkg] = useState<PurchasesPackage | null>(null);
  const [priceString, setPriceString] = useState<string | null>(null);
  const [paywallVisible, setPaywallVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [needsEmailCapture, setNeedsEmailCapture] = useState(false);
  const captureStateLoadedRef = useRef(false);

  useEffect(() => {
    async function init() {
      try {
        Purchases.configure({ apiKey: REVENUECAT_API_KEY });
        const customerInfo = await Purchases.getCustomerInfo();
        const wasPro = !!customerInfo.entitlements.active[ENTITLEMENT_ID];
        setIsPro(wasPro);

        // If the user is already pro and we've never asked for / been told no
        // about email, surface the capture card. Catches users who purchased
        // on a previous app version.
        const captureState = await AsyncStorage.getItem(EMAIL_CAPTURE_STATE_KEY);
        captureStateLoadedRef.current = true;
        if (wasPro && !captureState) {
          setNeedsEmailCapture(true);
        }

        const offerings = await Purchases.getOfferings();
        const current = offerings.current;
        if (current && current.availablePackages.length > 0) {
          const p = current.availablePackages[0];
          setPkg(p);
          setPriceString(p.product.priceString);
        }
      } catch (e) {
        console.warn('RevenueCat init error:', e);
      }
    }

    init();

    const onUpdate = (info: CustomerInfo) => {
      setIsPro(!!info.entitlements.active[ENTITLEMENT_ID]);
    };
    Purchases.addCustomerInfoUpdateListener(onUpdate);

    return () => {
      Purchases.removeCustomerInfoUpdateListener(onUpdate);
    };
  }, []);

  function showPaywall() {
    setPaywallVisible(true);
  }

  function hidePaywall() {
    setPaywallVisible(false);
  }

  async function purchase() {
    if (!pkg) return;
    setIsLoading(true);
    try {
      const { customerInfo } = await Purchases.purchasePackage(pkg);
      const becamePro = !!customerInfo.entitlements.active[ENTITLEMENT_ID];
      setIsPro(becamePro);
      setPaywallVisible(false);

      if (becamePro && captureStateLoadedRef.current) {
        const captureState = await AsyncStorage.getItem(EMAIL_CAPTURE_STATE_KEY);
        if (!captureState) {
          setNeedsEmailCapture(true);
        }
      }
    } catch (e: any) {
      if (!e.userCancelled) {
        console.warn('Purchase error:', e);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function restore() {
    setIsLoading(true);
    try {
      const customerInfo = await Purchases.restorePurchases();
      const becamePro = !!customerInfo.entitlements.active[ENTITLEMENT_ID];
      setIsPro(becamePro);
      if (becamePro) {
        setPaywallVisible(false);
        const captureState = await AsyncStorage.getItem(EMAIL_CAPTURE_STATE_KEY);
        if (!captureState) {
          setNeedsEmailCapture(true);
        }
      }
    } catch (e) {
      console.warn('Restore error:', e);
    } finally {
      setIsLoading(false);
    }
  }

  async function captureEmail(email: string) {
    await Purchases.setEmail(email);
    await AsyncStorage.setItem(EMAIL_CAPTURE_STATE_KEY, 'captured');
    setNeedsEmailCapture(false);
  }

  async function dismissEmailCapture() {
    await AsyncStorage.setItem(EMAIL_CAPTURE_STATE_KEY, 'dismissed');
    setNeedsEmailCapture(false);
  }

  return (
    <PurchaseContext.Provider
      value={{
        isPro,
        priceString,
        paywallVisible,
        isLoading,
        showPaywall,
        hidePaywall,
        purchase,
        restore,
        needsEmailCapture,
        captureEmail,
        dismissEmailCapture,
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
}
