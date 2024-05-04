// import { getContract } from "viem";
import { ethers, Signer } from "ethers";

import { metadata } from "./metadata";
import { decodeResult, ReturnType } from "./decodeResult";

export const address = "0x297c9368cc8c4a0d3cb24a6bbe30d9edd6850226";
export const subscriptionId = "31"
export const donIdBytes32 = "0x66756e2d626173652d7365706f6c69612d310000000000000000000000000000";

export const getOracle = (address: string, client: any) => {
    // return getContract({
    //     address: address as any,
    //     abi: metadata.abi,
    //     client: client,
    // })

    // const provider = getProvider()
    return new ethers.Contract(address, metadata.abi, client)
}

export const getSigner = async () => {
    const provider = new ethers.JsonRpcProvider("https://sepolia.base.org")
    // await provider.send("eth_requestAccounts", [])
    return await provider.getSigner() as Signer
}

export const getProvider = () => {
    return new ethers.JsonRpcProvider("https://sepolia.base.org") as ethers.Provider
}

export interface EloInfo {
    elo: BigInt;
    timestamp: BigInt;
}

export class OracleContract {
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
        this.contract = await getOracle(address, this.client)
        if (this.client instanceof ethers.Wallet) {
            this.contract = this.contract.connect(this.client);
        }
    }

    async getLatestRating(team: string): Promise<EloInfo> {
        if (!this.contract) {
            await this.loadContract()
        }

        console.log("Getting latest rating for team", this.contract, team)
        const rating = await this.contract.getLatestEloRanking(team)

        return {
            elo: decodeResult(rating.elo.toString(), ReturnType.uint256) as BigInt,
            timestamp: BigInt(rating.timestamp)
        }
    }

    async getTeamEloRankingBetween(team: string, start: number, end: number): Promise<EloInfo[]> {
        if (!this.contract) {
            await this.loadContract()
        }

        console.log("Getting latest rating for team", team, start, end)
        const ratings = await this.contract.getTeamEloRankingBetween(team, start, end)

        let ret: EloInfo[] = []
        ratings.map((rating: any) => {
            ret.push({
                elo: decodeResult(rating.elo.toString(), ReturnType.uint256) as BigInt,
                timestamp: BigInt(rating.timestamp)
            })
        })
        return ret
    }

    async sendRequest(source: string, args: any[]) {
        if (!this.contract) {
            await this.loadContract()
        }

        const callbackGasLimit = 300_000;
        console.log("Sending request to oracle", source, args)
        return await this.contract.sendRequest(
            source, // source
            "0x", // user hosted secrets - encryptedSecretsUrls - empty in this example
            0, // don hosted secrets - slot ID - empty in this example
            0, // don hosted secrets - version - empty in this example
            args,
            [], // bytesArgs - arguments can be encoded off-chain to bytes.
            subscriptionId, // subscriptionId
            callbackGasLimit,
            donIdBytes32 // jobId is bytes32 representation of donId
        );
    }

}