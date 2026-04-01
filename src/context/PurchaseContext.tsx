import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import Purchases, { PurchasesPackage, CustomerInfo } from 'react-native-purchases';
import { REVENUECAT_API_KEY, ENTITLEMENT_ID } from '../config/constants';

interface PurchaseContextValue {
  isPro: boolean;
  isLoading: boolean;
  showPaywall: boolean;
  setShowPaywall: (show: boolean) => void;
  purchasePro: () => Promise<void>;
  restorePurchases: () => Promise<void>;
}

const PurchaseContext = createContext<PurchaseContextValue>({
  isPro: false,
  isLoading: false,
  showPaywall: false,
  setShowPaywall: () => {},
  purchasePro: async () => {},
  restorePurchases: async () => {},
});

export function usePurchaseContext() {
  return useContext(PurchaseContext);
}

export function PurchaseProvider({ children }: { children: React.ReactNode }) {
  const [isPro, setIsPro] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const lifetimePackageRef = useRef<PurchasesPackage | null>(null);

  useEffect(() => {
    async function init() {
      try {
        Purchases.configure({ apiKey: REVENUECAT_API_KEY });

        const customerInfo = await Purchases.getCustomerInfo();
        checkEntitlement(customerInfo);

        const offerings = await Purchases.getOfferings();
        const current = offerings.current;
        if (current?.lifetime) {
          lifetimePackageRef.current = current.lifetime;
        } else if (current?.availablePackages?.length) {
          // Fallback: use the first available package if lifetime isn't set
          lifetimePackageRef.current = current.availablePackages[0];
        }

        // TODO: Remove this debug alert once purchases are working
        const entitlementKeys = Object.keys(customerInfo.entitlements.active);
        const pkgType = lifetimePackageRef.current?.packageType ?? 'none';
        Alert.alert(
          'RevenueCat Debug',
          `isPro: ${!!customerInfo.entitlements.active[ENTITLEMENT_ID]}\n` +
          `Active entitlements: ${entitlementKeys.length ? entitlementKeys.join(', ') : 'none'}\n` +
          `Package found: ${!!lifetimePackageRef.current} (type: ${pkgType})\n` +
          `Looking for entitlement: "${ENTITLEMENT_ID}"`
        );
      } catch (e) {
        console.warn('RevenueCat init error:', e);
        Alert.alert('RevenueCat Error', String(e));
      }
    }

    init();

    const onUpdate = (info: CustomerInfo) => checkEntitlement(info);
    Purchases.addCustomerInfoUpdateListener(onUpdate);

    return () => {
      Purchases.removeCustomerInfoUpdateListener(onUpdate);
    };
  }, []);

  function checkEntitlement(info: CustomerInfo) {
    setIsPro(!!info.entitlements.active[ENTITLEMENT_ID]);
  }

  async function purchasePro() {
    if (!lifetimePackageRef.current) {
      console.warn('No lifetime package available');
      return;
    }

    setIsLoading(true);
    try {
      const { customerInfo } = await Purchases.purchasePackage(lifetimePackageRef.current);
      const entitlementKeys = Object.keys(customerInfo.entitlements.active);
      // TODO: Remove this debug alert once purchases are working
      Alert.alert(
        'Purchase Result',
        `Active entitlements: ${entitlementKeys.length ? entitlementKeys.join(', ') : 'none'}\n` +
        `isPro: ${!!customerInfo.entitlements.active[ENTITLEMENT_ID]}`
      );
      checkEntitlement(customerInfo);
      if (customerInfo.entitlements.active[ENTITLEMENT_ID]) {
        setShowPaywall(false);
      }
    } catch (e: any) {
      if (!e.userCancelled) {
        console.warn('Purchase error:', e);
        Alert.alert('Purchase Error', String(e));
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function restorePurchases() {
    setIsLoading(true);
    try {
      const customerInfo = await Purchases.restorePurchases();
      checkEntitlement(customerInfo);
      if (customerInfo.entitlements.active[ENTITLEMENT_ID]) {
        setShowPaywall(false);
      }
    } catch (e) {
      console.warn('Restore error:', e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PurchaseContext.Provider
      value={{ isPro, isLoading, showPaywall, setShowPaywall, purchasePro, restorePurchases }}
    >
      {children}
    </PurchaseContext.Provider>
  );
}
