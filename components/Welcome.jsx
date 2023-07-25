import React from "react";
import Image from "next/image";
import {
  useActiveClaimConditionForWallet,
  useAddress,
  useTotalCount,
  useContract,
  useContractMetadata,
  useTotalCirculatingSupply,
  MediaRenderer,
  Web3Button,
  useClaimIneligibilityReasons,
} from "@thirdweb-dev/react";
import { CONTRACT_ADDRESSES } from "../const/addresses";
import { ethers } from "ethers";

const Welcome = () => {
  const address = useAddress(); // Get the current address from the provider

  const { contract } = useContract(
    "0xe963eEa1241B26dFb6D9b8a4907dE7DA252397cf"
  ); // Get the contract from the provider
  const { data: contractMetadata, isLoading: isContractMetadataLoading } =
    useContractMetadata(contract);

  const { data: activeClaimPhase, isLoading: isActiveClaimPhaseLoading } =
    useActiveClaimConditionForWallet(contract, address); // Get the active claim phase from the provider

  const { data: totalSupply, isLoading: isTotalSupplyLoading } =
    useTotalCount(contract); // Get the total supply from the provider

  const { data: totalClaimed, isLoading: isTotalClaimedLoading } =
    useTotalCirculatingSupply(contract); // Get the total claimed from the provider

  const maxClaimable = parseInt(activeClaimPhase?.maxClaimablePerWallet || "0"); // Get the max claimable from the provider

  const [claimQuantity, setClaimQuantity] = React.useState(1); // Set the claim quantity to 1 by default
  const increment = () => {
    if (claimQuantity < maxClaimable) {
      setClaimQuantity(claimQuantity + 1);
    }
  };

  const decrement = () => {
    if (claimQuantity > 1) {
      setClaimQuantity(claimQuantity - 1);
    }
  };

  const {
    data: claimInelegibinility,
    isLoading: isClaimInelegibinilityLoading,
  } = useClaimIneligibilityReasons(contract, {
    walletAddress: address || "",
    quantity: claimQuantity,
  });

  return (
    <div className="bg-gray-900 h-[100vh] w-[100vw] flex justify-center items-center">
      <div className="bg-slate-700 py-6 rounded-3xl">
        {!isContractMetadataLoading && (
          <div className="flex justify-center items-center gap-5">
            <div className="rounded-3xl">
              <MediaRenderer
                src={contractMetadata?.image}
                className="rounded-3xl"
              />
            </div>
            <div className="">
              <h1 className="text-white text-3xl mb-5">
                {contractMetadata.name}
              </h1>
              <p className="text-white max-w-md mb-5">
                {contractMetadata.description}
              </p>
              {!isActiveClaimPhaseLoading ? (
                <div className="flex flex-col gap-1">
                  <p className="text-white text-sm">
                    Claim Phase: {activeClaimPhase?.metadata?.name}
                  </p>
                  <p className="text-white text-sm">
                    Price: {ethers.utils.formatUnits(activeClaimPhase?.price)}
                  </p>
                </div>
              ) : (
                <p>Loadding...</p>
              )}
              {!isTotalSupplyLoading && !isTotalClaimedLoading ? (
                <p className="text-white text-sm pt-1">
                  Claimed: {totalClaimed.toNumber()} / {totalSupply?.toNumber()}
                </p>
              ) : (
                <p>Loadding...</p>
              )}
              {address ? (
                !isClaimInelegibinilityLoading ? (
                  claimInelegibinility?.length > 0 ? (
                    claimInelegibinility.map((reason) => (
                      <p className="text-white text-sm py-1">{reason}</p>
                    ))
                  ) : (
                    <div className="py-4">
                      <p className="text-white text-sm py-1">
                        You are eligible to claim.{" "}
                        {`(Max Claimable: ${maxClaimable})`}
                      </p>

                      <div className="flex justify-between mt-2">
                        <div className="flex">
                          <button className="bg-white w-10 mx-2 rounded-lg text-base" onClick={decrement}>
                            -
                          </button>
                          <input
                            type="number"
                            value={claimQuantity}
                            className="w-20 text-xl text-center rounded-lg"
                          />
                          <button  className="bg-white w-10 mx-2 rounded-lg text-base" onClick={increment}>
                            +
                          </button>
                        </div>
                        <div className="mr-10">
                          <Web3Button
                            contractAddress={
                              "0xe963eEa1241B26dFb6D9b8a4907dE7DA252397cf"
                            }
                            action={(contract) => contract.erc721.claim(claimQuantity)}
                          >
                            Claim NFT
                          </Web3Button>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  <p>Loadding...</p>
                )
              ) : (
                <p>Connect Your Wallet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;
