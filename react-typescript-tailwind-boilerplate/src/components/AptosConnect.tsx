import { useWallet } from "@manahippo/aptos-wallet-adapter";
import React, { useContext } from "react";
import { ModalContext } from "./ModalContext";
import { WalletModal } from "./WalletModal";

function AptosConnect() {
  const { account } = useWallet();
  const { modalState, setModalState } = useContext(ModalContext);

  return (
    <>
      {account?.address ? (
        <button
          className="btn btn-primary w-48"
          onClick={() => setModalState({ ...modalState, walletModal: true })}
          type="button"
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            display: "inline",
          }}
        >
          {account!.address!.toString()!}
        </button>
      ) : (
        <button
          className="btn"
          type="button"
          onClick={() => setModalState({ ...modalState, walletModal: true })}
        >
          Connect wallet
        </button>
      )}
      <WalletModal />
    </>
  );
}

export { AptosConnect };