import { Pokemon } from "@prisma/client";
import { create } from "zustand";

interface PokeManageModalStore {
  isOpen: boolean;
  onOpen: (data?: Pokemon) => void;
  onClose: () => void;
  data?: Pokemon;
}

const usePokeManageModal = create<PokeManageModalStore>((set) => ({
  isOpen: false,
  onOpen: (data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
  data: undefined,
}));

export default usePokeManageModal;
