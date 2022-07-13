import React, { useEffect, useState } from "react";
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

import { Link, useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { handleService } from "../../scripts/handleService";
import { userService } from "../../services";

const Users = () => {
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    handleService(
      userService.getUsers(),
      navigate,
      (foundUsers) => setUsers(foundUsers),
      () => setLoading(false)
    );
  }, []);

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
                <Td>{user.plan.name}</Td>
                <Td>{user.is_admin ? "Yes" : "No"}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default Users;
