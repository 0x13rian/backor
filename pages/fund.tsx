import { Button, Link, VStack } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function FundPage() {
    return (
        <>
            
            <main className="flex min-h-screen min-w-full">
                <div className="flex flex-1 p-6 justify-center items-center">
                <div>
                    <VStack className="mt-6 justify-center text-center">
                        <Button colorScheme='green'>
                            <Link isExternal href="https://onramp-sandbox.gatefi.com/?merchantId=e2903522-6007-4c48-8b34-b03eb8efb077" target="_blank">Buy via Unlimit Crypto</Link>
                        </Button>
                        <Link as={NextLink} color="gray" href="/dashboard" target="_self">continue</Link>
                    </VStack>
                </div>
                </div>
            </main>
        </>
    )
}