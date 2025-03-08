import { create } from "zustand";
import { persist } from "zustand/middleware";

const emptyProduct = {
  id: null,
  title: null,
  variants: [],
  image: {},
};

const useGlobalStore = create(
  persist(
    (set, get) => ({
      selectedProducts: [],
      addDummyProduct: () => {
        const dummyProduct = { ...emptyProduct, id: Date.now() };
        set((state) => ({
          selectedProducts: [...state.selectedProducts, dummyProduct],
        }));
      },
    }),
    {
      name: "monk-store",
    }
  )
);

export default useGlobalStore;
