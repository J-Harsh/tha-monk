import React, { useState, useRef, useEffect } from "react";
import IconSearch from "../../assets/icons/Icon_Search.svg";
import IconClose from "../../assets/icons/Icon_Close.svg";
import Flex from "./Flex";
import useGlobalStore from "../../store/useGlobalStore";
import Container from "./Container";
import Typography from "./Typography";

const Modal = ({ isOpen, children }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialogRef.current?.close();
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-auto p-0 w-full max-w-2xl h-auto max-h-[80vh] bg-white rounded-md shadow-lg border border-tertiary outline-none"
    >
      <div className="flex flex-col h-full">{children}</div>
    </dialog>
  );
};

const Title = ({ children }) => {
  const { toggleModal } = useGlobalStore((state) => state);
  return (
    <Flex center className="justify-between p-4  border-tertiary">
      <Typography weight="semibold">{children}</Typography>
      <img
        onClick={() => {
          toggleModal();
        }}
        className="text-secondary cursor-pointer"
        src={IconClose}
        width={"16px"}
        alt="close icon"
      />
    </Flex>
  );
};

const Search = ({ onSearch, placeholder = "Search..." }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <Container className="p-4 border-y border-tertiary">
      <Flex className="w-full px-6 py-2 border border-tertiary rounded-md">
        <img src={IconSearch} width={"20px"} alt="search icon" />
        <input
          className="w-full outline-none border-none mx-2 py-1 "
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder={placeholder}
        />
      </Flex>
    </Container>
  );
};

const Body = ({ children }) => {
  return <div className="flex-1 overflow-y-auto">{children}</div>;
};

const Footer = ({ children }) => {
  return <div className="p-4 border-t border-tertiary">{children}</div>;
};

Modal.Title = Title;
Modal.Search = Search;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
