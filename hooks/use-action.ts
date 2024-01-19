import { create } from "zustand";

interface ActionStore {
  delRow: boolean;
  toggleDelRow: () => void;
}

const useAction = create<ActionStore>((set) => ({
  delRow: false,
  toggleDelRow: () =>
    set((state) => ({
      delRow: !state.delRow,
    })),
}));

export default useAction;
