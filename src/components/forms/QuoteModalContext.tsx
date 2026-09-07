"use client";

import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";

type QuoteModalContextValue = {
  isOpen: boolean;
  presetSolution?: string;
  openQuoteModal: (presetSolution?: string) => void;
  closeQuoteModal: () => void;
};

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [presetSolution, setPresetSolution] = useState<string | undefined>(undefined);

  const openQuoteModal = useCallback((solution?: string) => {
    setPresetSolution(solution);
    setIsOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({ isOpen, presetSolution, openQuoteModal, closeQuoteModal }),
    [isOpen, presetSolution, openQuoteModal, closeQuoteModal]
  );

  return <QuoteModalContext.Provider value={value}>{children}</QuoteModalContext.Provider>;
}

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) throw new Error("useQuoteModal must be used within QuoteModalProvider");
  return ctx;
}
