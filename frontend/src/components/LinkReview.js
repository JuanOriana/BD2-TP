import React from "react";
import {
  Heading,
  Flex,
  Link,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import { EditIcon, LinkIcon } from "@chakra-ui/icons";
import { FiClipboard } from "react-icons/fi";
const LinkReview = ({ link, onOpen, btnRef }) => {
  const toast = useToast();

  return (
    <>
      {" "}
      <>
        <Flex px={3} width="100%" alignItems="center">
          <Heading>{link.title}</Heading>
          <EditIcon
            ml={3}
            mt={1}
            cursor="pointer"
            onClick={onOpen}
            ref={btnRef}
          />
        </Flex>
        <Text mb={1} ml={6} opacity={0.8}>
          {link.date} by{" "}
          <Link color={useColorModeValue("telegram.500", "telegram.300")}>
            Mati Pavan
          </Link>
        </Text>
        <Flex
          bg={useColorModeValue("gray.200", "gray.700")}
          alignItems="center"
          p={3}
          rounded={12}
          mx={"1%"}
          my={5}
          borderWidth={2}
          borderColor={useColorModeValue("telegram.400", "telegram.700")}
          justifyContent="space-between"
        >
          <Flex alignItems="center">
            <LinkIcon mr={3} />
            <Text fontSize="xl" fontWeight={700}>
              bit.ly/{link.shortUrl}
            </Text>
          </Flex>
          <Link
            onClick={() => {
              navigator.clipboard.writeText("bit.ly/" + link.shortUrl);
              toast({
                title: "Copied link to clipboard.",
                status: "info",
                variant: "left-accent",
                duration: 2000,
                position: "bottom-right",
              });
            }}
          >
            <Flex alignItems="center">
              <FiClipboard />
              <Text ml={1.5}>Copy</Text>
            </Flex>
          </Link>
        </Flex>
        <Stat
          alignSelf={"end"}
          mr={30}
          bg={useColorModeValue("gray.200", "gray.700")}
          w={120}
          maxH={120}
          p={3}
          rounded={10}
        >
          <StatLabel fontSize="xl">Clicks</StatLabel>
          <StatNumber fontSize="3xl">{link.clicks}</StatNumber>
          <StatHelpText fontSize="l">
            <StatArrow type="increase" /> 9.06%
          </StatHelpText>
        </Stat>
      </>
    </>
  );
};

export default LinkReview;
