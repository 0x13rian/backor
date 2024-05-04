import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, useDisclosure } from "@chakra-ui/react";
import { Link } from '@chakra-ui/next-js'

  
export function Menu() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <IconButton className="w-12" onClick={onOpen} aria-label='menu' icon={<HamburgerIcon />} />
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                <DrawerHeader borderBottomWidth='1px'>menu</DrawerHeader>
                <DrawerBody>
                    <Link className="block" href="/dashboard">home</Link>
                    <Link className="block" href="/profile">profile</Link>
                </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
        
    );
}
  