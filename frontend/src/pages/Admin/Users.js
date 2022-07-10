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

import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

const users = [
  { username: "juan", email: "mail@mail.com", plan: "simple", isAdmin: false },
  { username: "mati", email: "mail@mail.com", plan: "simple", isAdmin: true },
  { username: "pau", email: "mail@mail.com", plan: "extended", isAdmin: false },
];
const Users = () => {
  return (
    <Flex direction="column" p={10}>
      <Flex alignItems="center">
        <Link to="/admin">
          <ArrowBackIcon mr={2} w={5} h={5} />
        </Link>
        <Heading mb={2}>Users</Heading>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>username</Th>
              <Th>email</Th>
              <Th>plan</Th>
              <Th>is admin</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr>
                <Td>{user.username}</Td>
                <Td>{user.email}</Td>
                <Td>{user.plan}</Td>
                <Td>{user.isAdmin ? "Yes" : "No"}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default Users;
