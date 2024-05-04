import { ethers, Signer } from "ethers";

export const getSigner = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum!)
    await provider.send("eth_requestAccounts", [])
    return await provider.getSigner() as Signer
}

export const getProvider = () => {
    return new ethers.JsonRpcProvider("https://sepolia.base.org") as ethers.Provider
}

export interface EloInfo {
    elo: BigInt;
    timestamp: BigInt;
}