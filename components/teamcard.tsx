import { Card, CardBody, Stack, Heading, Divider, CardFooter, ButtonGroup, Button, Text, Image, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Box } from "@chakra-ui/react";
import { useState } from "react";


  
export function TeamCard() {
    const [sliderValue, setSliderValue] = useState(1500)
    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
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
                    <Heading size='md'>Manchester United</Heading>

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
  