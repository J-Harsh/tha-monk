import React from "react";
import Container from "../atoms/Container";
import Typography from "../atoms/Typography";
import Flex from "../atoms/Flex";
import useGlobalStore from "../../store/useGlobalStore";
import ProductSelect from "../molecules/ProductSelect";
import Button from "../atoms/Button/Button";
import ProductModal from "../molecules/ProductModal";

const AddProducts = () => {
  const { displayProducts, addDummyProduct, modalOpen } = useGlobalStore(
    (state) => state
  );

  const handleAddProduct = () => {
    addDummyProduct();
  };

  return (
    <>
      <Flex direction="col" center className="w-[100vw] h-[100vh]">
        <Container>
          <Typography className="mb-6" weight="semibold">
            Add Products
          </Typography>

          <Container>
            <Flex className="gap-56">
              <Typography weight="semibold">Product</Typography>
              <Typography weight="semibold">Discount</Typography>
            </Flex>
            {displayProducts?.map((product) => (
              <ProductSelect key={product?.id || new Date()} data={product} />
            ))}
            <Button
              onClick={handleAddProduct}
              variant="secondary"
              className="ml-auto w-40 h-12"
            >
              <Typography weight="semibold">Add Products</Typography>
            </Button>
          </Container>
        </Container>
      </Flex>
      <ProductModal isOpen={modalOpen} />
    </>
  );
};

export default AddProducts;
