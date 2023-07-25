import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import {
  useActiveClaimConditionForWallet,
  useAddress,
  useContract,
  useContractMetadata,
  useTotalCirculatingSupply,
} from "@thirdweb-dev/react";
import { CONTRACT_ADDRESSES } from "../const/addresses";
import Welcome from "../components/Welcome";

export default function Home() {
  return (
    <div className="">
      <Welcome />
    </div>
  );
}
