import React, { useState, useEffect, useRef, useCallback } from "react";
import debounce from "lodash.debounce";
import Modal from "../atoms/Modal";
import Container from "../atoms/Container";
import Button from "../atoms/Button/Button";
import Flex from "../atoms/Flex";
import Typography from "../atoms/Typography";
import usePaginatedSearchQuery from "../../hooks/usePaginatedSearchQuery";
import useGlobalStore from "../../store/useGlobalStore";

const ProductModal = ({ id, isOpen }) => {
  const pageLimit = 10;
  const { toggleModal, addToSelectedProducts, removeProduct } = useGlobalStore(
    (state) => state
  );

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const intersectionObserver = useRef(null);
  const loadMoreRef = useRef(null);

  const debouncedSetSearch = useCallback(
    debounce((searchValue) => {
      setDebouncedSearchTerm(searchValue);
    }, 800),
    []
  );

  const {
    data,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = usePaginatedSearchQuery(
    { limit: pageLimit, search: debouncedSearchTerm, throttleTime: 500 },
    { enabled: isOpen }
  );

  const productList = data?.pages?.flatMap((page) => page.products) || [];

  const handleSearch = (searchValue) => {
    debouncedSetSearch(searchValue);
  };

  const handleAdd = () => {
    removeProduct(id);
    addToSelectedProducts(selectedProducts);
    setSelectedProducts([]);
    setDebouncedSearchTerm("");
    toggleModal();
  };

  const handleCancel = () => {
    setSelectedProducts([]);
    setDebouncedSearchTerm("");
    toggleModal();
  };

  useEffect(() => {
    if (!isOpen) return;

    intersectionObserver.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    const currentObserver = intersectionObserver.current;
    const currentLoadMoreRef = loadMoreRef.current;

    if (currentLoadMoreRef) {
      currentObserver.observe(currentLoadMoreRef);
    }

    return () => {
      if (currentLoadMoreRef && currentObserver) {
        currentObserver.unobserve(currentLoadMoreRef);
      }
    };
  }, [isOpen, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Modal isOpen={isOpen} onClose={handleCancel}>
      <Modal.Title>Add Products</Modal.Title>

      <Modal.Search onSearch={handleSearch} placeholder="Search products..." />

      <Modal.Body>
        <Container className="divide-y divide-secondary">
          {isLoading && !isFetchingNextPage ? (
            <Flex center className="py-4">
              <Typography className="text-gray-500">
                Built a custom api to host it on render , might take some time.
              </Typography>
              <br />
              <center>
                <a
                  href="https://github.com/J-Harsh/tha-monk-sample-be"
                  target="_blank"
                  rel="noreferrer"
                >
                  Link to backend
                </a>
              </center>
            </Flex>
          ) : isError ? (
            <Flex center className="py-4">
              <Typography className="text-red-500">
                Error loading products: {error.message}
              </Typography>
            </Flex>
          ) : productList.length > 0 ? (
            <>
              {productList.map((product) => (
                <ProductSection
                  key={product.id}
                  data={product}
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                />
              ))}
              <Container ref={loadMoreRef} className="py-4">
                {isFetchingNextPage ? (
                  <Flex center>
                    <Typography className="text-secondary">
                      Loading more products...
                    </Typography>
                  </Flex>
                ) : hasNextPage ? (
                  <Container className="h-20 w-full" />
                ) : productList.length > 0 ? (
                  <Flex center>
                    <Typography className="text-secondary">
                      No more products to load
                    </Typography>
                  </Flex>
                ) : null}
              </Container>
            </>
          ) : (
            <Flex center className="py-4">
              <Typography className="text-tertiary">
                No products found. Try a different search term.
              </Typography>
            </Flex>
          )}
        </Container>
      </Modal.Body>

      <Modal.Footer>
        <Flex className="w-full justify-between items-center">
          <Typography weight="normal">
            {selectedProducts.length} products selected
          </Typography>
          <Flex>
            <Button variant="tertiary" onClick={handleCancel} className="mr-2">
              <Typography weight="semibold">Cancel</Typography>
            </Button>
            <Button
              variant="primary"
              onClick={handleAdd}
              disabled={selectedProducts.length === 0}
            >
              <Typography weight="semibold">Add</Typography>
            </Button>
          </Flex>
        </Flex>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;

const ProductSection = ({ data, selectedProducts, setSelectedProducts }) => {
  const isProductSelected = selectedProducts.some(
    (product) => product.id === data.id
  );

  const selectedVariants =
    selectedProducts.find((product) => product.id === data.id)?.variants || [];

  const handleProductSelection = () => {
    if (isProductSelected) {
      setSelectedProducts((prev) =>
        prev.filter((product) => product.id !== data.id)
      );
    } else {
      setSelectedProducts((prev) => {
        return [...prev, { ...data, variants: [...data.variants] }];
      });
    }
  };

  const handleVariantSelection = (variant) => {
    const isVariantSelected = selectedVariants.some(
      (item) => item.id === variant.id
    );

    if (isProductSelected) {
      if (isVariantSelected) {
        setSelectedProducts((prev) => {
          const updatedProducts = prev.map((product) => {
            if (product.id === data.id) {
              const updatedVariants = product.variants.filter(
                (item) => item.id !== variant.id
              );

              if (updatedVariants.length === 0) {
                return null;
              }

              return {
                ...product,
                variants: updatedVariants,
              };
            }
            return product;
          });

          return updatedProducts.filter(Boolean);
        });
      } else {
        setSelectedProducts((prev) =>
          prev.map((product) => {
            if (product.id === data.id) {
              return {
                ...product,
                variants: [...product.variants, variant],
              };
            }
            return product;
          })
        );
      }
    } else {
      setSelectedProducts((prev) => {
        return [...prev, { ...data, variants: [variant] }];
      });
    }
  };

  return (
    <Container>
      <Flex className="gap-6 py-2" verticalCenter>
        <input
          checked={isProductSelected}
          onChange={handleProductSelection}
          className="scale-180 ml-4 cursor-pointer accent-primary"
          type="checkbox"
        />
        <img
          src={data.image.src}
          alt="product"
          className="rounded-md size-12"
        />
        <Typography size="base" weight="normal">
          {data.title}
        </Typography>
      </Flex>
      <Container>
        {data?.variants?.map((variant) => {
          const isVariantSelected = selectedVariants.some(
            (item) => item.id === variant.id
          );

          return (
            <Flex
              verticalCenter
              key={variant.id}
              className="border-t border-tertiary justify-between py-2 px-4"
            >
              <Flex verticalCenter className="ml-10 gap-2">
                <input
                  checked={isVariantSelected}
                  onChange={() => {
                    handleVariantSelection(variant);
                  }}
                  type="checkbox"
                  className="accent-primary size-4 cursor-pointer"
                />
                <Typography>{variant.title}</Typography>
              </Flex>
              <Typography>${variant.price}</Typography>
            </Flex>
          );
        })}
      </Container>
    </Container>
  );
};
