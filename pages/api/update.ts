import type { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs'
import path from 'path'
import { Wallet, ethers } from "ethers";
import { OracleContract, getProvider, subscriptionId } from "@/lib/evm/contract";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    if (req.method === 'POST') {
        try {
            const body = req.body;
            const wallet = new Wallet(process.env.PRIVATE_KEY as string);
            const provider = getProvider();
            const connectedWallet = wallet.connect(provider);
            console.log(connectedWallet)
            const contract = new OracleContract({ client: connectedWallet });
            const args = [body.team as string];

            const source = fs
                .readFileSync(`${process.cwd()}/public/source.js`)
                .toString();
            console.log(source)
            const transaction = await contract.sendRequest(
                source, // source
                args
            );

            console.log(transaction)
            return res.status(200).json({ "hello world": "hello" });
        } catch (e: any) {
            return res.status(401).json({ error: e.message });
        }
    } else {
        // Handle other HTTP methods (e.g., GET, PUT, DELETE)
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}

export default handler;
