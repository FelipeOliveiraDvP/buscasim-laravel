import { ReactNode, createContext, useContext, useState } from 'react';
import { CheckoutResponse, PaymentResponse } from '@/core/services/orders';

type CheckoutProviderType = {
  order: CheckoutResponse | null;
  payment: PaymentResponse | null;
  setOrder: (order: CheckoutResponse) => void;
  setPayment: (payment: PaymentResponse) => void;
};

const CheckoutContext = createContext<CheckoutProviderType>({
  order: null,
  payment: null,
  setOrder: () => {},
  setPayment: () => {},
});

// TODO: Implement premium results.
export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<CheckoutResponse | null>(null);
  const [payment, setPayment] = useState<PaymentResponse | null>(null);

  return (
    <CheckoutContext.Provider
      value={{
        order,
        payment,
        setOrder,
        setPayment,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckoutContext(): CheckoutProviderType {
  return useContext<CheckoutProviderType>(CheckoutContext);
}
