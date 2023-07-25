import React from "react";
import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";

const Profile = () => {
  const address = useAddress(); // Get the current address from the provider

  const { contract } = useContract(
    "0xe963eEa1241B26dFb6D9b8a4907dE7DA252397cf"
  );

  const truncateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const { data: ownedNFTs, isLoading: isOwnedNFTsLoading } = useOwnedNFTs(
    contract,
    address
  ); // Get the owned NFTs from the provider

  return (
    <div className="bg-gray-900 h-[100vh] w-[100vw] flex justify-center items-center">
      {address ? (
        <div className="text-white">
          <div>
            <h1 className="text-lg">Profile</h1>
            <p>Wallet Address: {truncateAddress(address || "")}</p>
          </div>
          <hr />
          <div className="flex p-5">
            <h3>My NFTs:</h3>
            <div className="grid grid-cols-3">
              {!isOwnedNFTsLoading ? (
                ownedNFTs?.length > 0 ? (
                  ownedNFTs?.map((nft) => (
                    <div key={nft.metadata.id} className="flex flex-col justify-center items-center gap-5">
                      <ThirdwebNftMedia metadata={nft.metadata} />
                      <h3>{nft.metadata.name}</h3>
                    </div>
                  ))
                ) : (
                  <p>No NFTs owned</p>
                )
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>Please connect your wallet</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
