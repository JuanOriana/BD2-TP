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
  HStack,
  Center,
} from "@chakra-ui/react";
import { ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { linkService } from "../../services";
import { useNavigate } from "react-router-dom";
import { handleService } from "../../scripts/handleService";
import { Previous, Paginator, PageGroup, Next } from "chakra-paginator";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

const Links = () => {
  const [isLoading, setLoading] = useState(true);
  const [links, setLinks] = useState([]);
  const [linksDisplayed, setLinksDisplayed] = useState([]);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [linkClicked, setLinkClicked] = useState({});
  const itemLimit = 6;
  const [pagesQuantity, setPagesQuantity] = useState(3);

  const handlePageChange = (page) => {
    setLoading(true);
    handleService(
      linkService.getLinks(page,itemLimit),
      navigate,
      (foundLinks) => {
        setPagesQuantity(5);
        setLinksDisplayed(foundLinks.urls);
      },
      () => setLoading(false)
    );
  };

  const deleteLink = (short_url) => {
    handleService(
      linkService.deleteLinkByKey(short_url),
      navigate,
      () => {
        let newLinks = [...linksDisplayed];
        newLinks = newLinks.filter((link) => link.short_url !== short_url);
        setLinksDisplayed(newLinks);
      },
      () => {}
    );
  };

  useEffect(() => {
    handlePageChange(1);
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
              {linksDisplayed.map((link) => (
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
