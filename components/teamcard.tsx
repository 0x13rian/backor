"use client"

import { EloInfo, OracleContract, getProvider } from "@/lib/evm/contract";
import { Card, CardBody, Stack, Heading, CardFooter, ButtonGroup, Button, Image, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface TeamCardProps extends React.HTMLAttributes<HTMLDivElement> {
    team?: string;
    data?: any[];
}

export function TeamCard({
    team = "",
    data = [],
}: TeamCardProps) {
    const [sliderValue, setSliderValue] = useState(1500)
    const [eloInfo, setEloInfo] = useState<EloInfo>({
        elo: BigInt(0),
        timestamp: BigInt(0)
    })

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
        <>
            <Card maxW='sm'>
                <CardBody>
                    <Image
                        src='https://imageio.forbes.com/specials-images/imageserve/6554be696c4245e50902676e/Fulham-FC-v-Manchester-United---Premier-League/960x0.jpg?format=jpg&width=960'
                        borderRadius='lg'
                    />
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
                            Elo: {eloInfo.elo.toString()}
                        </div>
                        <div>
                            Timestamp: {eloInfo.timestamp.toString()}
                        </div>

                        <Slider defaultValue={1500} min={0} max={3000} step={100} className="mt-12" aria-label='slider-ex-6' onChange={(val) => setSliderValue(val)}>
                            <SliderMark value={100} {...labelStyles}>
                                0
                            </SliderMark>
                            <SliderMark value={2750} {...labelStyles}>
                                3000
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
                                {sliderValue}
                            </SliderMark>
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>

                    </Stack>
                </CardBody>
                <CardFooter>
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        width='100%'
                    >
                        <ButtonGroup alignItems="center" spacing='12'>
                            <Button variant='outline' colorScheme='gray' size='lg'>
                                💲
                            </Button>
                            <Button variant='outline' colorScheme='red' size='lg'>
                                💀
                            </Button>
                            <Button variant='outline' colorScheme='green' size='lg'>
                                💚
                            </Button>
                        </ButtonGroup>
                    </Box>
                </CardFooter>
            </Card>
        </>

    );
}
