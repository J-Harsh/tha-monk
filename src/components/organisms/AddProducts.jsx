import React, { use } from "react";
import Container from "../atoms/Container";
import Typography from "../atoms/Typography";
import Flex from "../atoms/Flex";
import useGlobalStore from "../../store/useGlobalStore";
import ProductSelect from "../molecules/ProductSelect";
import Button from "../atoms/Button/Button";

const AddProducts = () => {
  console.log(useGlobalStore());
  const { selectedProducts, addDummyProduct } = useGlobalStore(
    (state) => state
  );

  const handleAddProduct = () => {
    addDummyProduct();
  };
  console.log(selectedProducts);

  return (
    <Flex direction="col" center className="w-[100vw] h-[100vh]">
      <Container>
        <Typography className="mb-6" weight="semibold">
          Add Products
        </Typography>
        <Container className="ml-4">
          <Flex className="justify-between mx-14 ">
            <Typography weight="semibold">Product</Typography>
            <Typography weight="semibold">Discount</Typography>
          </Flex>
          <Container>
            {selectedProducts?.map((product) => (
              <ProductSelect key={product?.id || new Date()} data={product} />
            ))}
          </Container>
          <Button
            onClick={handleAddProduct}
            variant="secondary"
            className="float-right w-1/2 h-12"
          >
            <Typography weight="semibold">Add Products</Typography>
          </Button>
        </Container>
      </Container>
    </Flex>
  );
};

export default AddProducts;
