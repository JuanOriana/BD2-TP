import React, { useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Heading,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import CreateLinkDrawer from "../CreateLinkDrawer";
export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { signout } = useAuth();
  const navigate = useNavigate();

  const btnRef = React.useRef();
  return (
    <>
      <Box bg={useColorModeValue("gray.300", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Heading pl={3}>shaw.ty</Heading>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={onOpen} ref={btnRef} colorScheme={"telegram"}>
                CREATE LINK
              </Button>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Mati Pavan</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <Link to="/">
                    <MenuItem>Your Servers</MenuItem>
                  </Link>
                  <Link to="/admin">
                    <MenuItem>Administrator Panel</MenuItem>
                  </Link>
                  <Link to="/edit-user">
                    <MenuItem>Settings</MenuItem>
                  </Link>
                  <MenuItem
                    color={"red.700"}
                    fontWeight="bold"
                    onClick={() =>
                      signout(() => {
                        navigate("/", { replace: true });
                      })
                    }
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>

      {/* LINK DRAWER */}
      <CreateLinkDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </>
  );
}
