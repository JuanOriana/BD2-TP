import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  FormErrorMessage,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userService, tokenService } from "../services";
import { useAuth } from "../contexts/AuthContext";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [invalidCred, setInvalidCred] = useState(false);
  const { signin } = useAuth();
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    setInvalidCred(false);
    userService.newUser(data.username, data.email, data.password).then((r) => {
      if (r.hasFailed()) setInvalidCred(true);
      else {
        tokenService.getToken(data.username, data.password).then((r) => {
          if (r.hasFailed()) {
            setInvalidCred(true);
          } else {
            userService.getCurrentUser().then((user) =>
              signin(user.getData(), () => {
                navigate("/", { replace: true });
              })
            );
          }
        });
      }
    });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} minW={"lg"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="username" isInvalid={errors.username} mb={2}>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  id="username"
                  {...register("username", {
                    required: "This is required",
                    minLength: {
                      value: 6,
                      message: "Minimum length should be 6",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="email" isInvalid={errors.email} my={2}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "This is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="password" isInvalid={errors.password} my={2}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "This is required",
                      minLength: {
                        value: 8,
                        message: "Minimum length should be 8",
                      },
                    })}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              {invalidCred && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Your credentials are invalid</AlertTitle>
                </Alert>
              )}
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  isLoading={isSubmitting}
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Sign up
                </Button>
              </Stack>
            </form>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link color={"blue.400"}>
                  <RouterLink to="/signin">Login</RouterLink>
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
