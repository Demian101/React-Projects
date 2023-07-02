/* eslint-disable */
import { createContext } from "react";

export type ModalState = { walletModal: boolean };

const ModalContext = createContext({
  modalState: {
    walletModal: false,
  },
  setModalState: (_: ModalState) => { },
});

export { ModalContext };