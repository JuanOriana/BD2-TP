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
  Button,
  useDisclosure,
  Modal,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";
import { ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";
import { handleService } from "../../scripts/handleService";
import { userService } from "../../services";

const Users = () => {
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userClicked, setUserClicked] = useState({});

  const deleteUser = (username) => {
    handleService(
      userService.deleteUserById(username),
      navigate,
      () => {
        let newUsers = [...users];
        newUsers = newUsers.filter((user) => user.username !== username);
        setUsers(newUsers);
      },
      () => {}
    );
  };

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
    <>
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
                <Th>delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr>
                  <Td>{user.username}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.plan.name}</Td>
                  <Td>{user.is_admin ? "Yes" : "No"}</Td>
                  <Td>
                    <Button
                      onClick={() => {
                        setUserClicked(user);
                        onOpen();
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Are you sure you want to delete user {userClicked.username}?
          </ModalHeader>
          <ModalCloseButton />

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              No
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                deleteUser(userClicked.username);
                onClose();
              }}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Users;
