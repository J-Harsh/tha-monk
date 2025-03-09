import React, { useState, useEffect } from "react";
import IconClose from "../../assets/icons/Icon_Close.svg";
import IconDragDrop from "../../assets/icons/Icon_D&D.svg";
import EditIcon from "../../assets/icons/Icon_Draw.svg";
import Container from "../atoms/Container";
import Flex from "../atoms/Flex";
import Typography from "../atoms/Typography";
import Button from "../atoms/Button/Button";
import { discountTypes } from "../../utils/constant";
import useGlobalStore from "../../store/useGlobalStore";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ProductModal from "./ProductModal";

const SortableVariantItem = ({
  item,
  index,
  handleVariantDiscountChange,
  handleVariantDiscountTypeChange,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Container ref={setNodeRef} style={style}>
      <Flex verticalCenter key={item.id} className="m-8 mt-4 mb-2 gap-4">
        <Container
          className="cursor-move"
          data-nodename="drag-handle"
          {...listeners}
          {...attributes}
        >
          <img src={IconDragDrop} width="7px" height="14px" alt="drag handle" />
        </Container>
        {index + 1}.
        <Flex
          verticalCenter
          className="justify-between bg-white px-2 shadow-md w-[215px] h-8 rounded-2xl"
        >
          <Typography
            size="sm"
            className={item.title ? "text-black" : "text-secondary"}
          >
            {item?.title ? item.title?.substring(0, 25) : "Select Product"}
          </Typography>
          <img src={EditIcon} width={"16px"} alt="edit icon" />
        </Flex>
        {item.discount != null ? (
          <Flex verticalCenter className="gap-3">
            <input
              className="w-1/8 px-2 py-0.5 outline-0 border-secondary border-1 rounded-2xl"
              type="number"
              value={item.discount}
              onChange={(e) => {
                if (e.target.value >= 0 && e.target.value < 100)
                  handleVariantDiscountChange(item.id, e.target.value);
              }}
            />
            <select
              className="px-2 py-1 outline-0 border-secondary border-1 rounded-2xl"
              value={item.discountType}
              onChange={(e) => handleVariantDiscountTypeChange(item.id, e)}
            >
              <option value={discountTypes.percentage}>% off</option>
              <option value={discountTypes.flat}>flat off</option>
            </select>
          </Flex>
        ) : (
          <Button
            onClick={() => handleVariantDiscountChange(item.id, 0)}
            variat="primary"
            className="h-8 flex justify-center items-center"
          >
            <Typography weight="semibold">Add Discount</Typography>
          </Button>
        )}
      </Flex>
    </Container>
  );
};

const ProductSelect = ({ data, index }) => {
  const {
    toggleModal,
    updateProductDiscount,
    updateVariantDiscount,
    updateVariant,
    modalOpen,
  } = useGlobalStore((state) => state);
  const [isExpanded, setIsExpanded] = useState(false);
  const variantList = data?.variants || [];
  const dndSensors = useSensors(useSensor(PointerSensor, {}));

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleProductDiscountChange = (newValue) => {
    updateProductDiscount(data.id, newValue, data.discountType);
  };

  const handleProductDiscountTypeChange = (evt) => {
    const newType = evt.target.value;
    updateProductDiscount(data.id, data.discount, newType);
  };

  const handleVariantDiscountChange = (variantId, newValue) => {
    updateVariantDiscount(data.id, variantId, newValue, data.discountType);
  };

  const handleVariantDiscountTypeChange = (variantId, evt) => {
    const newType = evt.target.value;
    updateVariantDiscount(data.id, variantId, data.discount, newType);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    const oldIndex = variantList.findIndex((item) => item.id === active.id);
    const newIndex = variantList.findIndex((item) => item.id === over.id);
    const reordered = arrayMove(variantList, oldIndex, newIndex);
    updateVariant(data.id, reordered);
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: data?.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Container ref={setNodeRef} style={style} className="my-4">
      <Flex verticalCenter key={data.id} className="mt-4 mb-2 gap-4">
        <Container
          className="cursor-move"
          data-nodename="drag-handle"
          {...listeners}
          {...attributes}
        >
          <img src={IconDragDrop} width="7px" height="14px" alt="drag handle" />
        </Container>
        {index + 1}.
        <Flex
          onClick={() => toggleModal()}
          verticalCenter
          className="justify-between bg-white px-2 shadow-md w-[215px] h-8 cursor-pointer"
        >
          <Typography
            size="sm"
            className={data.title ? "text-black" : "text-secondary"}
          >
            {data?.title ? data.title?.substring(0, 25) : "Select Product"}
          </Typography>
          <img src={EditIcon} width={"16px"} alt="edit icon" />
        </Flex>
        {data?.discount != null ? (
          <Flex verticalCenter className="gap-3">
            <input
              className="w-1/8 px-2 py-0.5 outline-0 border-secondary border-1 rounded-md"
              type="number"
              value={data?.discount}
              onChange={(e) => {
                if (e.target.value >= 0 && e.target.value < 100)
                  handleProductDiscountChange(e.target.value);
              }}
            />
            <select
              className="px-2 py-1 outline-0 border-secondary border-1 rounded-md"
              value={data?.discountType}
              onChange={(e) => handleProductDiscountTypeChange(e)}
            >
              <option value={discountTypes.percentage}>% off</option>
              <option value={discountTypes.flat}>flat off</option>
            </select>
          </Flex>
        ) : (
          <Button
            onClick={() => handleProductDiscountChange(0)}
            variat="primary"
            className="h-8 flex justify-center items-center"
          >
            <Typography weight="semibold">Add Discount</Typography>
          </Button>
        )}
      </Flex>
      {variantList?.length > 0 ? (
        <Flex direction="col">
          <Typography
            onClick={() => toggleExpansion()}
            size="sm"
            className="text-blue-400 underline cursor-pointer w-max"
            weight="semibold"
          >
            Variants {isExpanded ? "⬆️" : "⬇️"}
          </Typography>
          {isExpanded && (
            <Container>
              <DndContext
                sensors={dndSensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={variantList?.map((item) => {
                    return item.id;
                  })}
                  strategy={verticalListSortingStrategy}
                >
                  {variantList?.map((variant, idx) => (
                    <SortableVariantItem
                      key={variant.id}
                      index={idx}
                      item={variant}
                      handleVariantDiscountChange={handleVariantDiscountChange}
                      handleVariantDiscountTypeChange={
                        handleVariantDiscountTypeChange
                      }
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </Container>
          )}
        </Flex>
      ) : null}
      <ProductModal id={data.id} isOpen={modalOpen} />
    </Container>
  );
};

export default ProductSelect;
