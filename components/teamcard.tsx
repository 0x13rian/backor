"use client"

import { EloInfo, OracleContract, getProvider } from "@/lib/evm/contract";
import { Text, Card, CardBody, Stack, Heading, CardFooter, ButtonGroup, Button, Image, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Box, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from "@chakra-ui/react";
import { LineChart, CartesianGrid, XAxis, YAxis, Line, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import { randomInt } from "crypto";

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

    const [sliderValue, setSliderValue] = useState(1500)
    const [eloInfo, setEloInfo] = useState<EloInfo>({
        elo: BigInt(0),
        timestamp: BigInt(0)
    })

    const [histEloInfo, setHistEloInfo] = useState<any[]>([])

    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
    }

    useEffect(() => {
        (async () => {
            await loadTeamRating();
            await loadTeamRatingHistory();
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
        setHistEloInfo(rating.filter((i)=>{return Number(i.elo) != 0}).map((i)=>{return {"time": i.timestamp, "elo": Number(i.elo)}}))
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
        console.log(data);
    }

    return (
        <div className="mb-12">
            <Card minW='lg'>
                <CardBody>
                    {/* <Image
                        src='https://imageio.forbes.com/specials-images/imageserve/6554be696c4245e50902676e/Fulham-FC-v-Manchester-United---Premier-League/960x0.jpg?format=jpg&width=960'
                        borderRadius='lg'
                    /> */}
                    <Stack mt='6' spacing='3'>
                        <Heading size='md'>{team || "Unknown"}</Heading>

                        <button onClick={loadTeamRating}>
                            Refresh Rating
                        </button>
                        <button onClick={loadTeamRatingHistory}>
                            Refresh Rating History
                        </button>
                        <button onClick={handleUpdateOracle}>
                            Update Team Data on Oracle
                        </button>
                        <div>
                            Rating: {eloInfo.elo.toString()}
                        </div>

                        <LineChart width={400} height={200} data={histEloInfo}
                            margin={{ top: 5, right: 0, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[Math.min(histEloInfo.map(i=>i.elo)) - 100, Math.min(histEloInfo.map(i=>i.elo)) + 100]} />
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
                            
                            <Popover>
                              <PopoverTrigger>
                                <Button variant='outline' colorScheme='gray' size='lg'>
                                  💲
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverBody>
                                  <Text fontSize='4xl'>💸 345</Text>
                                  <Button className="mt-8">sell</Button>
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
                                  <Text fontSize='4xl'>💸 345</Text>
                                  <Slider colorScheme="green" className="mb-12 mt-12" aria-label='slider' onChange={(val) => setSliderValue(val)}>
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
                                      bg='blue.500'
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
                                  <Button colorScheme="green">confirm</Button>
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
