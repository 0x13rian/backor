import { Card, CardBody, Stack, Heading, Divider, CardFooter, ButtonGroup, Button, Text, Image, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Box } from "@chakra-ui/react";
import { useState } from "react";
import { LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, Tooltip } from "recharts";


  
export function TeamCard() {
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

    return (
        <div className="mb-12">
            <Card maxW='sm'>
                <CardBody>
                    <Image
                    src='https://imageio.forbes.com/specials-images/imageserve/6554be696c4245e50902676e/Fulham-FC-v-Manchester-United---Premier-League/960x0.jpg?format=jpg&width=960'
                    borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                    <Heading mb="4" size='md'>Manchester United</Heading>

                    <LineChart width={340} height={200} data={data}
                        margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="elo" stroke="#82ca9d" />
                    </LineChart>
                    
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
        </div>
        
    );
}
  