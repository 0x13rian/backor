import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getAccessToken, usePrivy } from "@privy-io/react-auth";
import Head from "next/head";
import { Avatar, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, useDisclosure } from "@chakra-ui/react";
import { IconButton } from '@chakra-ui/react'
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { Menu } from "../components/menu";
import { TeamCard } from "../components/teamcard";

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
  const [verifyResult, setVerifyResult] = useState();
  const router = useRouter();
  const {
    ready,
    authenticated,
    user,
    logout,
    linkEmail,
    linkWallet,
    unlinkEmail,
    linkPhone,
    unlinkPhone,
    unlinkWallet,
    linkGoogle,
    unlinkGoogle,
    linkTwitter,
    unlinkTwitter,
    linkDiscord,
    unlinkDiscord,
  } = usePrivy();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
    }
  }, [ready, authenticated, router]);

  const numAccounts = user?.linkedAccounts?.length || 0;
  const canRemoveAccount = numAccounts > 1;

  const email = user?.email;
  const phone = user?.phone;
  const wallet = user?.wallet;

  const googleSubject = user?.google?.subject || null;
  const twitterSubject = user?.twitter?.subject || null;
  const discordSubject = user?.discord?.subject || null;

  return (
    <>
      <Head>
        <title>backor</title>
      </Head>

      <main className="flex flex-col min-h-screen px-4 sm:px-20 py-6 sm:py-10 bg-privy-light-blue">
        {ready && authenticated ? (
          <>
            <Menu />
            <div className="place-self-end flex items-center">
              <Stat>
                <StatLabel>Balance</StatLabel>
                <StatNumber>💸 345</StatNumber>
                <StatHelpText>
                  <StatArrow type='increase' />
                  23.36%
                </StatHelpText>
              </Stat>
              <Avatar className="ml-8" bg='teal.500' />
            </div>

            <div className="snap-y snap-mandatory place-self-center overflow-y-scroll">
              <div className="h-screen snap-always snap-center">
                <TeamCard />
              </div>
              <div className="h-screen snap-always snap-center">
                <TeamCard />
              </div>
              <div className="h-screen snap-always snap-center">
                <TeamCard />
              </div>
              <div className="h-screen snap-always snap-center">
                <TeamCard />
              </div>
              <div className="h-screen snap-always snap-center">
                <TeamCard />
              </div>
              <div className="h-screen snap-always snap-center">
                <TeamCard />
              </div>
              <div className="h-screen snap-always snap-center">
                <TeamCard />
              </div>
              <div className="h-screen snap-always snap-center">
                <TeamCard />
              </div>

            </div>
          </>
        ) : null}
      </main>
    </>
  );
}
