import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  HStack,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { ChevronRightIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const Card = ({ title, description, usersAmount, points }) => {
  return (
    <Box
      role={"group"}
      p={6}
      maxW={"500px"}
      minW={"400px"}
      w={"full"}
      h={"full"}
      bg={useColorModeValue("whiteAlpha", "gray.900")}
      boxShadow={"xl"}
      rounded={"lg"}
      pos={"relative"}
      onClick={() => {}}
    >
      <Stack align={"center"}>
        <Heading pt={1} fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
          {title}
        </Heading>
        <Text color={useColorModeValue("gray.600", "gray.400")}>
          {description}
        </Text>
        <VStack py={2}>
          {points.map((data) => (
            <HStack p={2} spacing="24px" w="320px">
              <Flex w="300px" h="30px" justifyContent="space-between">
                <Text>
                  <ChevronRightIcon />
                  {data}
                </Text>
              </Flex>
            </HStack>
          ))}
        </VStack>
        <Text color={useColorModeValue("gray.600", "gray.400")}>
          In total there are {usersAmount} users who own this plan.
        </Text>
      </Stack>
    </Box>
  );
};
const Plans = () => {
  return (
    <Flex direction="column" p={10}>
      <Flex alignItems="center">
        <Link to="/admin">
          <ArrowBackIcon mr={2} w={5} h={5} />
        </Link>
        <Heading mb={2}>Plans</Heading>
      </Flex>
      <Center py={12}>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <Card
            title="Basic Plan"
            description="For regular people."
            usersAmount="2"
            points={[
              "Regular mail needed",
              "Up to 5 links allowed monthly",
              "Disable the links whenever you want",
              "Unlimited amount of shares",
            ]}
          />
          <Card
            title="Student Plan"
            description="Only for ITBA students."
            usersAmount="5"
            points={[
              "Mail of the Instituto Tecnologico de Buenos Aires needed",
              "Unlimited amount of liks to shorten monthly",
              "Edit your shortened URL",
              "Unlimited amount of shares",
            ]}
          />
        </Grid>
      </Center>
    </Flex>
  );
};
export default Plans;
