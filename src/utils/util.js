import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => twMerge(clsx(inputs));

export const addIsSelectedProperty = (products) => {
  return products?.map((product) => ({
    ...product,
    isSelected: product.isSelected ?? false,
    variants: product.variants?.map((variant) => ({
      ...variant,
      isSelected: variant.isSelected ?? false,
    })),
  }));
};
