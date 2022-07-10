import {
  Heading,
  Flex,
  Link,
  Text,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useToast,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { LinkIcon, EditIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import LinkCard from "../components/LinkCard";
import { FiClipboard } from "react-icons/fi";
import EditLinkDrawer from "../components/EditLinkDrawer";

const static_links = [
  { date: "25 Jun", title: "Hola que tal", shortUrl: "3bsPLCW1", clicks: 19 },
  { date: "13 Jan", title: "Otro", shortUrl: "4206969", clicks: 341 },
  { date: "8 Dec", title: "Yet Another", shortUrl: "xdLmao132", clicks: 9 },
];

function Home() {
  const [links, setLinks] = useState(static_links);
  const [selected, setSelected] = useState(0);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Flex height={"100vh"} flexDirection="column">
        <Flex flexDirection="column" flex={1}>
          <Heading fontSize="3xl" ml={8} mt={4} mb={2}>
            Links
          </Heading>
          <Divider />
          <Flex width="100%" height="100%">
            <Flex
              flexDirection="column"
              width={350}
              maxWidth="40%"
              height="100%"
              bg={useColorModeValue("gray.200", "gray.700")}
            >
              {links.map((link, idx) => (
                <>
                  <LinkCard
                    date={link.date}
                    title={link.title}
                    shortUrl={link.shortUrl}
                    selected={selected === idx}
                    onClick={() => {
                      const links_cpy = [...links];
                      links_cpy[selected].clicks += 1;
                      setSelected(idx);
                    }}
                  />
                </>
              ))}
            </Flex>
            <Flex flexDirection="column" width="100%" p={3}>
              <Flex px={3} width="100%" alignItems="center">
                <Heading>{links[selected].title}</Heading>
                <EditIcon
                  ml={3}
                  mt={1}
                  cursor="pointer"
                  onClick={onOpen}
                  ref={btnRef}
                />
              </Flex>
              <Text mb={1} ml={6} opacity={0.8}>
                {links[selected].date} by{" "}
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
                    bit.ly/{links[selected].shortUrl}
                  </Text>
                </Flex>
                <Link
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "bit.ly/" + links[selected].shortUrl
                    );
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
                <StatNumber fontSize="3xl">{links[selected].clicks}</StatNumber>
                <StatHelpText fontSize="l">
                  <StatArrow type="increase" /> 9.06%
                </StatHelpText>
              </Stat>
            </Flex>
          </Flex>
        </Flex>
        {/* <footer>lmao</footer> */}
      </Flex>

      <EditLinkDrawer
        isOpen={isOpen}
        onClose={onClose}
        btnRef={btnRef}
        link={links[selected]}
      />
    </>
  );
}

export default Home;
