import { useColorModeValue, Flex, Text } from "@chakra-ui/react";
import React from "react";

const LinkCard = ({ date, title, shortUrl, selected, onClick }) => {
  const selectedColor = useColorModeValue("white", "gray.600");
  const unselectedColor = useColorModeValue("gray.200", "gray.700");
  return (
    <Flex
      flexDirection="column"
      w="full"
      bg={selected ? selectedColor : unselectedColor}
      p={3}
      cursor="pointer"
      onClick={onClick}
      _hover={{
        background: useColorModeValue("white", "gray.600"),
        transition: "ease-in-out 0.15s",
      }}
      borderBottomWidth={1}
      borderBottomColor={useColorModeValue("gray.400", "gray.900")}
    >
      <Text color={useColorModeValue("gray.500", "gray.300")}>{date}</Text>
      <Text>{title}</Text>
      <Text color="telegram.500">
        bit.ly/<Text as="b">{shortUrl}</Text>
      </Text>
    </Flex>
  );
};

export default LinkCard;
