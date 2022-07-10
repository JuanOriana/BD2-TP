import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const links = [
  { title: "This is google", longUrl: "google.com", key: "2130D0" },
  { title: "This is old", longUrl: "yahoo.com", key: "M1AlD0" },
  { title: "This is scary", longUrl: "facebook.com", key: "DXX922" },
];
const Links = () => {
  return (
    <Flex direction="column" p={10}>
      <Flex alignItems="center">
        <Link to="/admin">
          <ArrowBackIcon mr={2} w={5} h={5} />
        </Link>
        <Heading mb={2}>Links</Heading>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>title</Th>
              <Th>target url</Th>
              <Th>key</Th>
            </Tr>
          </Thead>
          <Tbody>
            {links.map((link) => (
              <Tr>
                <Td>{link.title}</Td>
                <Td>{link.longUrl}</Td>
                <Td>{link.key}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default Links;
