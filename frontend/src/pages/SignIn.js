import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  AlertTitle,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { tokenService } from "../services";

export default function SignIn() {
  const { signin } = useAuth();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  let navigate = useNavigate();
  let location = useLocation();
  // @ts-ignore
  let from = location.state?.from?.pathname || "/home";
  const [invalidCred, setInvalidCred] = useState(false);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>
                  <RouterLink to="/signup">Don't have an account?</RouterLink>
                </Link>
              </Stack>
              {invalidCred && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Your credentials are invalid</AlertTitle>
                </Alert>
              )}
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => {
                  tokenService
                    .getToken(username, password)
                    .then((r) => console.log(r));
                  // signin(
                  //   {
                  //     username,
                  //     password,
                  //     isAdmin: false,
                  //     email: "hola@mail.com",
                  //   },
                  //   () => {
                  //     console.log(from);
                  //     navigate(from, { replace: true });
                  //   }
                  // );
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
