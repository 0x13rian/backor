import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton, Button, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, useDisclosure } from "@chakra-ui/react";
import { Link } from '@chakra-ui/next-js'
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

  
export function Menu() {
    const router = useRouter()
    const { logout } = usePrivy()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleLogout = async () => {
        await logout();
        router.push("/")
    }

    return (
        <>
            <IconButton className="w-12" onClick={onOpen} aria-label='menu' icon={<HamburgerIcon />} />
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                <DrawerHeader borderBottomWidth='1px'>Dynasty</DrawerHeader>
                <DrawerBody>
                    <Link className="block" href="/dashboard">Home</Link>
                    <Link className="block" href="/profile">Profile</Link>
                    <Button onClick={handleLogout}>Logout</Button>
                </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
        
    );
}
  