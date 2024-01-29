import { ReactNode, createContext, useContext, useState } from 'react';
import { CheckoutResponse, PaymentResponse } from '@/core/services/orders';
import { SearchResult } from '@/core/services/search';

type CheckoutProviderType = {
  order: CheckoutResponse | null;
  payment: PaymentResponse | null;
  premiumResults: SearchResult | null;
  setOrder: (order: CheckoutResponse | null) => void;
  setPayment: (payment: PaymentResponse | null) => void;
  setResults: (results: SearchResult | null) => void;
};

const CheckoutContext = createContext<CheckoutProviderType>({
  order: null,
  payment: null,
  premiumResults: null,
  setOrder: () => {},
  setPayment: () => {},
  setResults: () => {},
});

// TODO: Implement premium results.
export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<CheckoutResponse | null>(null);
  const [payment, setPayment] = useState<PaymentResponse | null>(null);
  const [premiumResults, setResults] = useState<SearchResult | null>(null);

  return (
    <CheckoutContext.Provider
      value={{
        order,
        payment,
        premiumResults,
        setOrder,
        setPayment,
        setResults,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckoutContext(): CheckoutProviderType {
  return useContext<CheckoutProviderType>(CheckoutContext);
}
