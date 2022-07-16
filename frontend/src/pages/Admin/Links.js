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
  Modal,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { linkService } from "../../services";
import { useNavigate } from "react-router-dom";
import { handleService } from "../../scripts/handleService";

const Links = () => {
  const [isLoading, setLoading] = useState(true);
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [linkClicked, setLinkClicked] = useState({});

  const deleteLink = (short_url) => {
    handleService(
      linkService.deleteLinkByKey(short_url),
      navigate,
      () => {
        let newLinks = [...links];
        newLinks = newLinks.filter((link) => link.short_url !== short_url);
        setLinks(newLinks);
      },
      () => {}
    );
  };

  useEffect(() => {
    setLoading(true);
    handleService(
      linkService.getLinks(),
      navigate,
      (foundLinks) => setLinks(foundLinks),
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
          <Heading mb={2}>Links</Heading>
        </Flex>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>title</Th>
                <Th>target url</Th>
                <Th>key</Th>
                <Th>delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {links.map((link) => (
                <Tr>
                  <Td>{link.title}</Td>
                  <Td>{link.target_url}</Td>
                  <Td>{link.short_url}</Td>
                  <Td>
                    <Button
                      onClick={() => {
                        setLinkClicked(link);
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
            Are you sure you want to delete link by {linkClicked.short_url}?
          </ModalHeader>
          <ModalCloseButton />

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              No
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                deleteLink(linkClicked.short_url);
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

export default Links;
