"use client";

import { Modal } from "@/components/ui/Modal";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { useQuoteModal } from "@/components/forms/QuoteModalContext";

export function QuoteModal() {
  const { isOpen, closeQuoteModal, presetSolution } = useQuoteModal();

  return (
    <Modal isOpen={isOpen} onClose={closeQuoteModal} title="Get a Quote">
      <QuoteForm presetSolution={presetSolution} />
    </Modal>
  );
}
