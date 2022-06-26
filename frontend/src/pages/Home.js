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
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";
import LinkCard from "../components/LinkCard";
import Nav from "../components/Nav/Nav";

const links = [
  { date: "25 Jun", title: "Hola que tal", shortUrl: "3bsPLCW1", clicks: 19 },
  { date: "13 Jan", title: "Otro", shortUrl: "4206969", clicks: 341 },
  { date: "8 Dec", title: "Yet Another", shortUrl: "xdLmao132", clicks: 9 },
];
function Home() {
  const [selected, setSelected] = useState(0);
  return (
    <>
      <Flex height={"100vh"} flexDirection="column">
        <Nav />
        <Flex flexDirection="column" flex={1}>
          <Heading ml={14} py={2}>
            Links
          </Heading>
          <Divider />
          <Flex width="100%" height="100%">
            <Flex
              flexDirection="column"
              width={350}
              maxWidth="40%"
              height="100%"
              bg="gray.700"
            >
              {links.map((link, idx) => (
                <>
                  <LinkCard
                    date={link.date}
                    title={link.title}
                    shortUrl={link.shortUrl}
                    selected={selected == idx}
                    onClick={() => setSelected(idx)}
                  />
                </>
              ))}
            </Flex>
            <Flex flexDirection="column" width="100%" p={3}>
              <Heading>{links[selected].title}</Heading>
              <Text>
                {links[selected].date} by{" "}
                <Link color="telegram.300">Mati Pavan</Link>
              </Text>
              <Box
                bg="gray.700"
                p={3}
                rounded={12}
                mx={"1%"}
                my={5}
                borderWidth={2}
                borderColor={"telegram.700"}
              >
                <Text fontSize="xl" fontWeight={700}>
                  bit.ly/{links[selected].shortUrl}
                </Text>
              </Box>
              <Stat>
                <StatLabel>Clicks</StatLabel>
                <StatNumber>{links[selected].clicks}</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" /> 9.06%
                </StatHelpText>
              </Stat>
            </Flex>
          </Flex>
        </Flex>
        <footer>lmao</footer>
      </Flex>
    </>
  );
}

export default Home;
