// import { getContract } from "viem";
import { ethers, Signer } from "ethers";

import { metadata } from "./metadata";
import { decodeResult, ReturnType } from "@/lib/evm/decodeResult";
import { getProvider } from "../evm/contract";

export const address = "0x8E656B0e4bBFa79445d303f6a62dfA98602f64e0";

export const loadContract = (address: string, client: any) => {
    return new ethers.Contract(address, metadata.abi, client)
}

export interface PerpContract {
    id: BigInt;
    longParty: string; // Address of the long party (using string for Ethereum address)
    isBack: boolean;
    quantity: BigInt; // Value of the perpetual contract
    fundingRate: BigInt; // Funding rate for the contract
    isOpen: boolean; // Flag indicating if the contract is open
    team: string;
    initialAmount: BigInt;
    initialElo: BigInt;
}

export class DexContract {
    private client: any;
    private contract: any;

    constructor({
        client = getProvider()
    }: {
        client: ethers.Provider | ethers.Signer | ethers.Wallet,
    }) {
        this.client = client
    }

    async loadContract() {
        this.contract = await loadContract(address, this.client)
        if (this.client instanceof ethers.Wallet) {
            this.contract = this.contract.connect(this.client);
        }
    }

    async openContract(team: string, value: string): Promise<any> {
        if (!this.contract) {
            await this.loadContract()
        }

        console.log("Opening Contract", team, value)
        const rating = await this.contract.openContract(team, {
            value: ethers.parseUnits(value, "ether")
        })
        console.log(rating)
        return null
    }

    async closeContract(id: string): Promise<any> {
        if (!this.contract) {
            await this.loadContract()
        }

        const rating = await this.contract.closeContract(id)
        console.log(rating)
        return null
    }

    async getTeamContracts(team: string): Promise<PerpContract[]> {
        if (!this.contract) {
            await this.loadContract()
        }

        const contracts: any[] = await this.contract.getTeamContracts(team)
        const ret: PerpContract[] = contracts.map((rating: any) => {
            return {
                id: rating[0],
                longParty: rating[1],
                isBack: rating[2],
                quantity: rating[3],
                fundingRate: rating[4],
                isOpen: rating[5],
                team: rating[6],
                initialAmount: rating[7],
                initialElo: rating[8]
            }
        })
        return ret
    }

    async getContracts(): Promise<PerpContract[]> {
        if (!this.contract) {
            await this.loadContract()
        }

        const contracts: any[] = await this.contract.getContracts()
        const ret: PerpContract[] = contracts.map((rating: any) => {
            return {
                id: rating[0],
                longParty: rating[1],
                isBack: rating[2],
                quantity: rating[3],
                fundingRate: rating[4],
                isOpen: rating[5],
                team: rating[6],
                initialAmount: rating[7],
                initialElo: rating[8]
            }
        })
        return ret
    }
}