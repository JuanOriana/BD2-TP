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
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { linkService } from "../../services";
import { useNavigate } from "react-router-dom";
import { handleService } from "../../scripts/handleService";

const Links = () => {
  const [isLoading, setLoading] = useState(true);
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();
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
