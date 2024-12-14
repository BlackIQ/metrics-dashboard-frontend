import React, { useState, useRef, useEffect } from "react";

const useDisclosure = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const onClose = () => {
    setIsOpen(false);
  };

  const onToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const getDisclosureProps = (props = {}) => {
    return {
      ...props,
      onClick: () => onToggle(),
      "aria-expanded": isOpenRef.current,
      "aria-controls": props.id || undefined,
    };
  };

  return {
    isOpen,
    onClose,
    onToggle,
    getDisclosureProps,
  };
};

export default useDisclosure;
