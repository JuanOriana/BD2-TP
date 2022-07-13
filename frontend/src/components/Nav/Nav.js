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
export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user } = useAuth();
  const { signout } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <Box bg={useColorModeValue("gray.300", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Link to="/">
            <Heading pl={3}>shaw.ty</Heading>
          </Link>
          {user && (
            <Flex alignItems={"center"}>
              <Stack direction={"row"} spacing={7}>
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
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>{user.username}</p>
                    </Center>
                    <br />
                    <Center mt={-5}>
                      <p>Plan: {user.plan.name}</p>
                    </Center>
                    <MenuDivider />
                    <Link to="/">
                      <MenuItem>Your Links</MenuItem>
                    </Link>
                    {user.is_admin && (
                      <Link to="/admin">
                        <MenuItem>Administrator Panel</MenuItem>
                      </Link>
                    )}
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
          )}

          {!user && (
            <Flex alignItems="center">
              <Button onClick={toggleColorMode} mr={4}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Link to="/signin">
                <Button colorScheme="telegram" mr={4}>
                  Sign in!
                </Button>
              </Link>
            </Flex>
          )}
        </Flex>
      </Box>

    </>
  );
}
