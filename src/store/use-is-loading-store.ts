import { create } from "zustand";

interface isLoadingState {
  isLoading: boolean;
  setIsloading: (isLoading: boolean) => void;
}

const useIsLoadingStore = create<isLoadingState>((set) => ({
  isLoading: false,
  setIsloading: (loading) => set(() => ({ isLoading: loading })),
}));

export default useIsLoadingStore;
