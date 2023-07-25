import React from "react";
import Link from "next/link";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

const Navbar = () => {
  const address = useAddress(); // Get the current address from the provider

  return (
    <nav className="bg-gray-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-lg font-bold ml-10">
          <Link href="/">NFT Collection</Link>
        </div>
        <div>
          {address && (
            <Link href={`/profile/${address}`}>
              <p className="text-white text-sm">My NFTs</p>
            </Link>
          )}
        </div>

        <div className="space-x-4 mr-10">
          <ConnectWallet />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
