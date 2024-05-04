"use client"

import { EloInfo, getProvider, getSigner } from "@/lib/evm/contract";
import { Text, Card, CardBody, Stack, Heading, CardFooter, ButtonGroup, Button, Image, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Box, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stat, StatArrow, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import { LineChart, CartesianGrid, XAxis, YAxis, Line, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import { randomInt } from "crypto";
import { DexContract, PerpContract } from "@/lib/dex/contract";
import { OracleContract } from "@/lib/oracle/contract";
import { ethers } from "ethers";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { getTeamLogo } from "@/lib/evm/network";

interface TeamCardProps extends React.HTMLAttributes<HTMLDivElement> {
    team?: string;
    // data?: any[];
}

export function TeamCard({
    team = "",
    // data = [],
}: TeamCardProps) {
    const data = [
        {
            "name": "t1",
            "elo": 2800,
        },
        {
            "name": "t2",
            "elo": 2900,
        },
        {
            "name": "t3",
            "elo": 2700,
        }
    ]

    const [sliderValue, setSliderValue] = useState(0)
    const [eloInfo, setEloInfo] = useState<EloInfo>({
        elo: BigInt(0),
        timestamp: BigInt(0)
    })

    const [histEloInfo, setHistEloInfo] = useState<any[]>([])
    const [disabledBtns, setDisabledBtns] = useState<boolean>(false)

    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
    }

    useEffect(() => {
        (async () => {
            await getBalance();
            await loadTeamRating();
            await loadTeamRatingHistory();
            await handleSliderChange(0);
        })()
        console.log({ team, data })
    }, [team])

    const loadTeamRating = async () => {
        const contract = new OracleContract({ client: getProvider() });

        const rating: EloInfo = await contract.getLatestRating(team);
        console.log(rating)
        setEloInfo(rating)
    }

    const loadTeamRatingHistory = async () => {
        const contract = new OracleContract({ client: getProvider() });

        const rating: EloInfo[] = await contract.getTeamEloRankingBetween(team, 0, Date.now());
        setHistEloInfo(rating.filter((i) => { return Number(i.elo) != 0 }).map((i) => { return { "time": i.timestamp, "elo": Number(i.elo) } }))
        console.log(rating)
    }

    const handleUpdateOracle = async () => {
        const response = await fetch('/api/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ team }),
        });
        const data = await response.json();
        if (data) {
            console.log(data)
        }
    }

    const handleCloseContract = async (id: string) => {
        const contract = new DexContract({ client: await getSigner() });
        const rating = await contract.closeContract(id);
        console.log(rating)
    }

    // const loadPosition = async () => {
    //     const contract = new DexContract({ client: await getSigner() });

    //     const rating: any[] = await contract.getPositions(team);
    //     console.log(rating)
    // }

    const [userContracts, setUserContracts] = useState<PerpContract[]>([])
    const getUserContracts = async () => {
        const contract = new DexContract({ client: await getSigner() });

        const rating: PerpContract[] = await contract.getContracts();
        setUserContracts(rating)
    }

    const handleOpenContract = async () => {
        const contract = new DexContract({ client: await getSigner() });
        contract.openContract(team, userBalance.toFixed(2));
    }

    const getBalance = async () => {
        const provider = getProvider();
        const signer = await getSigner()
        const address = signer.getAddress()
        const balance = await provider.getBalance(address);
        return balance
    }

    const [userBalance, setUserBalance] = useState(0)
    const handleSliderChange = async (val: any) => {
        setSliderValue(val)
        const balance = await getBalance();
        const amount = ethers.formatEther(balance * BigInt(val) / BigInt(100))
        console.log(Number(amount).toFixed(2))
        setUserBalance(Number(amount))
    }
    return (
        <div className="mb-12">
            <Card minW='md'>
                <CardBody>
                    <Stack mt='6' spacing='3'>
                        <div className="flex items-center">
                            <Image
                                src={getTeamLogo(team)}
                                borderRadius='lg'
                                width="128px"
                                ml="4"
                            />
                            <Heading ml="4" size='lg'>{team || "Unknown"}</Heading>
                            <Stat ml="4">
                              <StatLabel>Rating</StatLabel>
                              <StatNumber>{eloInfo.elo.toString()}</StatNumber>
                              <StatHelpText>
                                <StatArrow type='increase' />
                                23.36%
                              </StatHelpText>
                            </Stat>
                            {/* 
                            Rating: 
                            <div className="flex space-x-3">
                                <Button onClick={loadTeamRating} size="sm">
                                    Refresh Rating
                                </Button>
                                <Button onClick={loadTeamRatingHistory} size="sm">
                                    Refresh Rating History
                                </Button>
                                <Button onClick={handleUpdateOracle} size="sm">
                                    Update Team Data on Oracle
                                </Button>
                            </div> */}
                        </div>

                        <LineChart width={350} height={200} data={histEloInfo}
                            margin={{ top: 5, right: 0, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[Math.min(...histEloInfo.map(i => i.elo)) - 10, Math.min(...histEloInfo.map(i => i.elo)) + 10]} />
                            <Tooltip />
                            <Line type="monotone" dataKey="elo" stroke="#82ca9d" />
                        </LineChart>
                    </Stack >
                </CardBody >
                <CardFooter>
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        width='100%'
                    >
                        <ButtonGroup alignItems="center" spacing='12'>
                            <Popover size="lg">
                                <PopoverTrigger>
                                    <Button onClick={getUserContracts} variant='outline' colorScheme='gray' size='lg'>
                                        💲
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                        <TableContainer>
                                          <Table variant='simple'>
                                              <Thead>
                                                  <Tr>
                                                      <Th>Quantity</Th>
                                                      <Th></Th>
                                                  </Tr>
                                              </Thead>
                                              <Tbody>
                                                  {userContracts.map((contract) =>
                                                      <Tr>
                                                          <Td>{(Math.round(Number(contract.quantity)/100000000000)).toString()} {contract.team} Tokens</Td>
                                                          <Td>
                                                              <Button isDisabled={!contract.isOpen}
                                                                  onClick={() => handleCloseContract(contract.id.toString())} size="sm">{contract.isOpen ? "Close Contract💲" : "Closed"}</Button>
                                                          </Td>
                                                      </Tr>
                                                  )}
                                              </Tbody>
                                          </Table>
                                      </TableContainer>
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>

                            <Popover>
                                <PopoverTrigger>
                                    <Button variant='outline' colorScheme='green' size='lg'>
                                        💚
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader>How much would you like to invest?</PopoverHeader>
                                    <PopoverBody>
                                        <Text fontSize='4xl'>💸 {userBalance.toFixed(2)} ETH</Text>
                                        <Slider colorScheme="green" className="mb-12 mt-12" aria-label='slider'
                                            onChange={handleSliderChange}>
                                            <SliderMark value={25} {...labelStyles}>
                                                25%
                                            </SliderMark>
                                            <SliderMark value={50} {...labelStyles}>
                                                50%
                                            </SliderMark>
                                            <SliderMark value={75} {...labelStyles}>
                                                75%
                                            </SliderMark>
                                            <SliderMark
                                                value={sliderValue}
                                                textAlign='center'
                                                bg='green.500'
                                                color='white'
                                                mt='-10'
                                                ml='-5'
                                                w='12'
                                            >
                                                {sliderValue}%
                                            </SliderMark>
                                            <SliderTrack>
                                                <SliderFilledTrack />
                                            </SliderTrack>
                                            <SliderThumb />
                                        </Slider>
                                        <Button colorScheme="green" onClick={handleOpenContract}>Confirm</Button>
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                        </ButtonGroup>
                    </Box>
                </CardFooter>
            </Card >
        </div>
    );
}
