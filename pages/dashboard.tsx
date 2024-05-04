import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAccessToken, usePrivy } from "@privy-io/react-auth";
import Head from "next/head";
import { Avatar, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, useDisclosure } from "@chakra-ui/react";
import { IconButton } from '@chakra-ui/react'
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { Menu } from "../components/menu";
import { TeamCard } from "../components/teamcard";
import { teams as SPORT_TEAMS } from "@/lib/evm/network";
import { getSigner, getProvider } from "@/lib/evm/contract";
import { ethers } from "ethers";

async function verifyToken() {
  const url = "/api/verify";
  const accessToken = await getAccessToken();
  const result = await fetch(url, {
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined),
    },
  });

  return await result.json();
}

export default function DashboardPage() {
  const [userBalance, setUserBalance] = useState("0");
  const router = useRouter();
  const {
    ready,
    authenticated,
    user
  } = usePrivy();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
    }

    console.log(user)
  }, [ready, authenticated, router]);

  const getBalance = async () => {
    const provider = getProvider();
    const signer = await getSigner()
    const address = signer.getAddress()
    console.log(await address)
    const balance = await provider.getBalance(address);
    return balance
  }

  useEffect(() => {
    (async () => {
      const balance = await getBalance();
      setUserBalance(ethers.formatEther(balance).slice(0, 5));
    })()
  }, [])

  return (
    <>
      <Head>
        <title>Dynasty</title>
      </Head>

      <main className="flex flex-col min-h-screen px-4 sm:px-20 py-6 sm:py-10 bg-privy-light-blue">
        {ready && authenticated ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <Menu />
              <div className="place-self-end flex items-center mb-8">
                <Stat>
                  <StatLabel>Balance</StatLabel>
                  <StatNumber>💸 {userBalance} ETH</StatNumber>
                </Stat>
                <Avatar src={"https://effigy.im/a/"+user?.wallet?.address+".png"} className="ml-8" bg='green.500' />
              </div>
            </div>
            <div className="snap-y snap-mandatory place-self-center overflow-y-scroll">
              <div className="h-screen snap-always snap-center">
              {SPORT_TEAMS.map((team: string, index: number) =>
                <div className="h-screen snap-always snap-center">
                  <TeamCard key={index} team={team} />
                </div>
              )}
            </div>
            </div>
          </>
        ) : null}
      </main>
    </>
  );
}
