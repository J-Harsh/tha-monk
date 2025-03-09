import React from "react";
import Container from "../atoms/Container";
import Typography from "../atoms/Typography";
import Flex from "../atoms/Flex";
import useGlobalStore from "../../store/useGlobalStore";
import ProductSelect from "../molecules/ProductSelect";
import Button from "../atoms/Button/Button";
import ProductModal from "../molecules/ProductModal";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const AddProducts = () => {
  const { displayProducts, addDummyProduct, modalOpen, updateProduct } =
    useGlobalStore((state) => state);

  const handleAddProduct = () => {
    addDummyProduct();
  };

  const sensors = useSensors(useSensor(PointerSensor, {}));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    const oldIndex = displayProducts.findIndex((item) => item.id === active.id);
    const newIndex = displayProducts.findIndex((item) => item.id === over.id);
    const newArray = arrayMove(displayProducts, oldIndex, newIndex);
    updateProduct(newArray);
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
            <Container>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={displayProducts?.map((item) => {
                    return item.id;
                  })}
                  strategy={verticalListSortingStrategy}
                >
                  {displayProducts?.map((product, index) => (
                    <ProductSelect
                      key={product?.id || new Date()}
                      index={index}
                      data={product}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </Container>
            <Button
              onClick={handleAddProduct}
              variant="secondary"
              className="self-end w-40 h-12"
            >
              <Typography weight="semibold">Add Products</Typography>
            </Button>
          </Container>
        </Container>
      </Flex>
      
    </>
  );
};

export default AddProducts;
