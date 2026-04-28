import React, { createContext, useContext, useEffect, useState } from 'react';
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
}

const PurchaseContext = createContext<PurchaseContextValue>({
  isPro: false,
  priceString: null,
  paywallVisible: false,
  isLoading: false,
  showPaywall: () => {},
  hidePaywall: () => {},
  purchase: async () => {},
  restore: async () => {},
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

  useEffect(() => {
    async function init() {
      try {
        Purchases.configure({ apiKey: REVENUECAT_API_KEY });
        const customerInfo = await Purchases.getCustomerInfo();
        checkEntitlement(customerInfo);

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

    const onUpdate = (info: CustomerInfo) => checkEntitlement(info);
    Purchases.addCustomerInfoUpdateListener(onUpdate);

    return () => {
      Purchases.removeCustomerInfoUpdateListener(onUpdate);
    };
  }, []);

  function checkEntitlement(info: CustomerInfo) {
    setIsPro(!!info.entitlements.active[ENTITLEMENT_ID]);
  }

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
      checkEntitlement(customerInfo);
      setPaywallVisible(false);
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
      checkEntitlement(customerInfo);
      if (customerInfo.entitlements.active[ENTITLEMENT_ID]) {
        setPaywallVisible(false);
      }
    } catch (e) {
      console.warn('Restore error:', e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PurchaseContext.Provider
      value={{ isPro, priceString, paywallVisible, isLoading, showPaywall, hidePaywall, purchase, restore }}
    >
      {children}
    </PurchaseContext.Provider>
  );
}
