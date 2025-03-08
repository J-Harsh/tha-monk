import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from "react";
import IconClose from "../../assets/icons/Icon_Close.svg";
import Flex from "./Flex";
import Button from "./Button/Button";

const ModalContext = createContext(null);

const Modal = ({ isOpen, onClose, children }) => {
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

  const handleBackdropClick = (e) => {
    const dialogDimensions = dialogRef.current.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      onClose();
    }
  };

  const modalContext = {
    onClose,
  };

  return (
    <ModalContext.Provider value={modalContext}>
      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        className="fixed inset-0 m-auto p-0 w-full max-w-2xl h-auto max-h-[80vh] bg-white rounded-md shadow-lg border border-gray-200 outline-none"
      >
        <div className="flex flex-col h-full">{children}</div>
      </dialog>
    </ModalContext.Provider>
  );
};

const Title = ({ children }) => {
  const { onClose } = useContext(ModalContext);

  return (
    <Flex center className="p-4 border-b border-gray-200">
      <h2 className="text-xl font-semibold">{children}</h2>
      <Button
        variant="secondary"
        onClick={onClose}
        icon={<IconClose />}
      ></Button>
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
    <div className="p-4 border-b border-gray-200">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

const Body = ({ children }) => {
  return <div className="flex-1 p-4 overflow-y-auto">{children}</div>;
};

const Footer = ({ children }) => {
  return <div className="p-4 border-t border-gray-200">{children}</div>;
};

Modal.Title = Title;
Modal.Search = Search;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
