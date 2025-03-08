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
      displayProducts: [emptyProduct],
      modalOpen: false,
      toggleModal: () =>
        set((state) => ({ ...state, modalOpen: !state.modalOpen })),
      addDummyProduct: () => {
        const dummyProduct = { ...emptyProduct, id: Date.now() };
        set((state) => ({
          displayProducts: [...state.displayProducts, dummyProduct],
        }));
      },
      addToSelectedProducts: (products) => {
        set((state) => {
          const updatedDisplayProducts = [...state.displayProducts];

          products.forEach((newProduct) => {
            const existingProductIndex = updatedDisplayProducts.findIndex(
              (product) => product.id === newProduct.id
            );

            if (existingProductIndex !== -1) {
              updatedDisplayProducts[existingProductIndex] = newProduct;
            } else {
              updatedDisplayProducts.push(newProduct);
            }
          });

          return {
            ...state,
            displayProducts: updatedDisplayProducts,
          };
        });
      },
    }),
    {
      name: "monk-store",
    }
  )
);

export default useGlobalStore;
