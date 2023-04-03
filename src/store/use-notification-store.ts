import { create } from 'zustand';

interface isLoadingState {
  showSuccessNotiff: (msg: string) => void;
  showErrorNotiff: (msg: string) => void;
  setShowSuccessNotiff: (fn: (msg: string) => void) => void;
  setShowErrorNotiff: (fn: (msg: string) => void) => void;
}

const useNotificationStore = create<isLoadingState>((set) => ({
  showSuccessNotiff: (msg: string) => {},
  showErrorNotiff: (msg: string) => {},
  setShowSuccessNotiff: (fn: (msg: string) => void) =>
    set(() => ({ showSuccessNotiff: fn })),
  setShowErrorNotiff: (fn: (msg: string) => void) =>
    set(() => ({ showErrorNotiff: fn })),
}));

export default useNotificationStore;
