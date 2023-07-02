import React, { useState } from 'react';
import { useWallet } from "@manahippo/aptos-wallet-adapter";
import {
  createCollectionPayload,
  createTokenPayload,
  walletClient,
} from "../../utils/aptos";


// NFT mint page component
export default function NFTMintPage() {
  // const [loading, setLoading] = useState(false);
  // const { account, signAndSubmitTransaction } = useWallet();


  const [image, setImage] = useState<File | null>(null);

  // Handle image file changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the selected image file
    const file = e.target.files ? e.target.files[0] : null;

    // Update the state with the selected image file
    setImage(file);
  };

  return (
    <div className="container mx-auto w-1/4">
      <div className="mt-10">
        <h1 className="text-2xl font-bold mb-4">NFT Mint</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="collection-name">
            Collection name:
            <input className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="collection-name" type="text" />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="token-name">
            Token name:
            <input className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="token-name" type="text" />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="token-description">
            Token description:
            <textarea className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="token-description" rows={4} />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file-upload">
            Upload file:
            <input className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="file-upload" type="file"
              onChange={handleChange} />
          </label>
          <div>{image && (
            <img src={URL.createObjectURL(image)} alt="Preview" />
          )
          }
          </div>
        </div>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Mint
      </button>
    </div>

  );
};

