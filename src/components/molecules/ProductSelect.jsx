import React from "react";
import IconDD from "../../assets/icons/Icon_D&D.svg";
import EditIcon from "../../assets/icons/Icon_Draw.svg";
import Flex from "../atoms/Flex";
import Typography from "../atoms/Typography";
import Button from "../atoms/Button/Button";

const ProductSelect = ({ data }) => {
  console.log(data);

  return (
    <Flex verticalCenter key={data.id} className="my-4 gap-4 ">
      <img src={IconDD} width="7px" height="14px" alt="d&d icon" />
      1.
      <Flex
        verticalCenter
        className="justify-between bg-white px-2 shadow-md w-[215px] h-8"
      >
        <Typography size="sm" className="text-secondary">
          Select Product
        </Typography>
        <img src={EditIcon} width={"16px"} alt="edit icon" />
      </Flex>
      <Button variat="primary" className="h-8 flex justify-center items-center">
        <Typography weight="semibold">Add Discount</Typography>
      </Button>
    </Flex>
  );
};

export default ProductSelect;
