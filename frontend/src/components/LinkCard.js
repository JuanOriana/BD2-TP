import { background, Flex, Text } from "@chakra-ui/react";
import React from "react";

const LinkCard = ({ date, title, shortUrl, selected, onClick }) => (
  <Flex
    flexDirection="column"
    w="full"
    bg={selected ? "gray.600" : "gray.700"}
    p={3}
    cursor="pointer"
    onClick={onClick}
    _hover={{ background: "gray.600", transition: "ease-in-out 0.1" }}
    borderBottomWidth={1}
    borderBottomColor={"gray.900"}
  >
    <Text color="gray.300">{date}</Text>
    <Text>{title}</Text>
    <Text color="telegram.500">
      bit.ly/<Text as="b">{shortUrl}</Text>
    </Text>
  </Flex>
);

export default LinkCard;
