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
  HStack,
  Center,
} from "@chakra-ui/react";

import { Previous, Paginator, PageGroup, Next } from "chakra-paginator";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

import { Link, useNavigate } from "react-router-dom";
import { ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";
import { handleService } from "../../scripts/handleService";
import { userService } from "../../services";

const Users = () => {
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [usersDisplayed, setUsersDisplayed] = useState([]);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userClicked, setUserClicked] = useState({});
  const itemLimit = 6;
  const [pagesQuantity, setPagesQuantity] = useState(3);

  const handlePageChange = (page) => {
    setLoading(true);
    handleService(
      userService.getUsers(page+1,itemLimit),
      navigate,
      (foundUsers) => {
        setPagesQuantity(foundUsers.total_pages);
        setUsersDisplayed(foundUsers.users);
      },
      () => setLoading(false)
    );
  };

  const deleteUser = (username) => {
    handleService(
      userService.deleteUserById(username),
      navigate,
      () => {
        let newUsers = [...usersDisplayed];
        newUsers = newUsers.filter((user) => user.username !== username);
        setUsersDisplayed(newUsers);
      },
      () => {}
    );
  };

  useEffect(() => {
    handlePageChange(0)
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
              {usersDisplayed.map((user) => (
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
        <Center>
          <HStack>
            <Paginator
              onPageChange={handlePageChange}
              pagesQuantity={pagesQuantity}
            >
              <Previous>
                <CgChevronLeft />
              </Previous>
              <PageGroup isInline align="center" />
              <Next>
                <CgChevronRight />
              </Next>
            </Paginator>
          </HStack>
        </Center>
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
