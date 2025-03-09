// store/useGlobalStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { discountTypes } from "../utils/constant";

const emptyProduct = {
  id: Date.now(),
  title: null,
  variants: [],
  image: {},
  discount: null,
  discountType: discountTypes.percentage,
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
            newProduct.discount = null;
            newProduct.discountType = discountTypes.percentage;
            const existingProductIndex = updatedDisplayProducts.findIndex(
              (product) => product.id === newProduct.id
            );
            if (existingProductIndex !== -1) {
              updatedDisplayProducts[existingProductIndex] = newProduct;
            } else {
              updatedDisplayProducts.push(newProduct);
            }
          });
          return { displayProducts: updatedDisplayProducts };
        });
      },
      updateProductDiscount: (productId, discount, discountType) =>
        set((state) => {
          const updatedDisplayProducts = state.displayProducts.map(
            (product) => {
              if (product.id === productId) {
                return { ...product, discount, discountType };
              }
              return product;
            }
          );
          return { displayProducts: updatedDisplayProducts };
        }),
      updateVariantDiscount: (productId, variantId, discount, discountType) =>
        set((state) => {
          const updatedDisplayProducts = state.displayProducts.map(
            (product) => {
              if (product.id === productId) {
                const updatedVariants = product.variants.map((variant) => {
                  if (variant.id === variantId) {
                    return { ...variant, discount, discountType };
                  }
                  return variant;
                });
                return { ...product, variants: updatedVariants };
              }
              return product;
            }
          );
          return { displayProducts: updatedDisplayProducts };
        }),
      updateVariant: (productId, variants) =>
        set((state) => {
          const updatedDisplayProducts = state.displayProducts.map(
            (product) => {
              if (product.id === productId) {
                return { ...product, variants };
              }
              return product;
            }
          );
          return { displayProducts: updatedDisplayProducts };
        }),
      updateProduct: (products) =>
        set((state) => {
          return { displayProducts: products };
        }),
      removeProduct: (productId) =>
        set((state) => {
          const updatedDisplayProducts = state.displayProducts.filter(
            (product) => product.id !== productId
          );
          return { displayProducts: updatedDisplayProducts };
        }),
      removeVariant: (productId, variantId) =>
        set((state) => {
          const updatedDisplayProducts = state.displayProducts.map(
            (product) => {
              if (product.id === productId) {
                const updatedVariants = product.variants.filter(
                  (variant) => variant.id !== variantId
                );
                if (updatedVariants.length === 0) {
                  return null;
                }
                return { ...product, variants: updatedVariants };
              }
              return product;
            }
          );
          return { displayProducts: updatedDisplayProducts };
        }),
    }),
    {
      name: "monk-store",
    }
  )
);

export default useGlobalStore;
