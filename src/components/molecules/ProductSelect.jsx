import React, { useState } from "react";
import IconClose from "../../assets/icons/Icon_Close.svg";
import IconDD from "../../assets/icons/Icon_D&D.svg";
import EditIcon from "../../assets/icons/Icon_Draw.svg";
import Flex from "../atoms/Flex";
import Typography from "../atoms/Typography";
import Button from "../atoms/Button/Button";
import { discountTypes } from "../../utils/constant";
import useGlobalStore from "../../store/useGlobalStore";

const ProductSelect = ({ data }) => {
  const [discountType, setDiscountType] = useState(discountTypes.percentage);
  const [discount, setDiscout] = useState(null);
  const { toggleModal } = useGlobalStore((state) => state);

  return (
    <Flex verticalCenter key={data.id} className="my-4 gap-4 ">
      <img src={IconDD} width="7px" height="14px" alt="d&d icon" />
      1.
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
      {discount != null ? (
        <Flex verticalCenter className="gap-3  ">
          <input
            className="w-1/8 px-2 py-0.5 outline-0 border-secondary border-1 rounded-md"
            type="number"
            value={discount}
            onChange={(e) => {
              if (e.target.value >= 0 && e.target.value < 100)
                setDiscout(e.target.value);
            }}
          />
          <select
            className="px-2 py-1 outline-0 border-secondary border-1 rounded-md"
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value)}
            defaultValue={discountTypes.percentage}
          >
            <option value={discountTypes.percentage}>% off</option>
            <option value={discountTypes.flat}>flat off</option>
          </select>
          <img
            src={IconClose}
            width={"16px"}
            className="text-secondary"
            alt="close icon"
          />
        </Flex>
      ) : (
        <Button
          onClick={() => setDiscout(0)}
          variat="primary"
          className="h-8 flex justify-center items-center"
        >
          <Typography weight="semibold">Add Discount</Typography>
        </Button>
      )}
    </Flex>
  );
};

export default ProductSelect;
