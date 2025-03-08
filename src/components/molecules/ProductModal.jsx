import React, { useState } from "react";
import Modal from "../atoms/Modal";
import Container from "../atoms/Container";
import Button from "../atoms/Button/Button";
import Flex from "../atoms/Flex";
import Typography from "../atoms/Typography";

const ProductModal = ({
  isOpen,
  onClose,
  onAdd,
  initialSelectedProducts = [],
  products = [],
  onSearch,
  isLoading = false,
}) => {
  const [selectedProducts, setSelectedProducts] = useState(
    initialSelectedProducts
  );

  const toggleProductSelection = (productId) => {
    setSelectedProducts((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleAdd = () => {
    onAdd(selectedProducts);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Title>Select Products</Modal.Title>

      <Modal.Search onSearch={onSearch} placeholder="Search products..." />

      <Modal.Body>
        <Container className="divide-y divide-gray-200">
          {isLoading ? (
            <Flex center className="py-4">
              <Typography className="text-gray-500">
                Loading products...
              </Typography>
            </Flex>
          ) : products.length > 0 ? (
            products.map((product) => (
              <Container
                key={product.id}
                className="py-3 px-2 hover:bg-gray-50"
              >
                <Flex>
                  <input
                    type="checkbox"
                    id={`product-${product.id}`}
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleProductSelection(product.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`product-${product.id}`}
                    className="ml-3 block w-full"
                  >
                    <Flex direction="col" className="w-full">
                      <Flex className="w-full justify-between">
                        <Typography weight="medium">{product.name}</Typography>
                        <Typography className="text-gray-500">
                          ${product.price.toFixed(2)}
                        </Typography>
                      </Flex>
                      <Typography size="sm" className="text-gray-500">
                        {product.category}
                      </Typography>
                    </Flex>
                  </label>
                </Flex>
              </Container>
            ))
          ) : (
            <Flex center className="py-4">
              <Typography className="text-gray-500">
                No products found. Try a different search term.
              </Typography>
            </Flex>
          )}
        </Container>
      </Modal.Body>

      <Modal.Footer>
        <Flex className="w-full justify-between items-center">
          <Typography size="sm" weight="medium">
            {selectedProducts.length} products selected
          </Typography>
          <Flex>
            <Button variant="secondary" onClick={onClose} className="mr-2">
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleAdd}
              disabled={selectedProducts.length === 0}
            >
              Add
            </Button>
          </Flex>
        </Flex>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
