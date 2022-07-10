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

const users = [
  { username: "juan", email: "mail@mail.com", isAdmin: false },
  { username: "mati", email: "mail@mail.com", isAdmin: true },
  { username: "pau", email: "mail@mail.com", isAdmin: false },
];
const Users = () => {
  return (
    <Flex direction="column" p={10}>
      <Heading mb={2}>Users</Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>username</Th>
              <Th>email</Th>
              <Th>is admin</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr>
                <Td>{user.username}</Td>
                <Td>{user.email}</Td>
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
