import {
  Heading,
  Flex,
  Divider,
  useColorModeValue,
  useDisclosure,
  Text,
  Button,
  Center,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import LinkCard from "../components/LinkCard";
import EditLinkDrawer from "../components/EditLinkDrawer";
import CreateLinkDrawer from "../components/CreateLinkDrawer";
import { handleService } from "../scripts/handleService";
import {  userService } from "../services";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import LinkReview from "../components/LinkReview";

function Home() {
  const [isLoading, setLoading] = useState(false);
  const { user } = useAuth();
  const [links, setLinks] = useState([]);
  const [selected, setSelected] = useState(0);
  const { isOpen:isOpenEdit, onOpen:onOpenEdit, onClose:onCloseEdit } = useDisclosure();
  const { isOpen:isOpenCreate, onOpen:onOpenCreate, onClose:onCloseCreate } = useDisclosure();

  const btnRefEdit = React.useRef();
  const btnRefCreate = React.useRef();

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setSelected(0);
    if (user) {
      handleService(
        userService.getUserLinks(user.username),
        navigate,
        (userLinks) => setLinks(userLinks),
        () => setLoading(false)
      );
    }
  }, [user]);

  const removeLinkFromList = (shortUrl) => {
    let newLinks = [...links];
    newLinks = newLinks.filter((link) => link.short_url !== shortUrl);
    setLinks(newLinks);
  };

  const addLinkFromList = (link) => {
    let newLinks = [...links];
    newLinks.unshift(link);
    setLinks(newLinks);
  };

  const editLinkFromList = (oldShortUrl, link) => {
    let newLinks = [...links];
    const insertIdx = newLinks.findIndex(
      (link) => link.short_url === oldShortUrl
    );
    newLinks[insertIdx] = link;
    setLinks(newLinks);
  };
  return (
    <>
      <Flex height={"100vh"} flexDirection="column">
        <Flex flexDirection="column" flex={1}>
          <Flex
            mt={4}
            mb={2}
            px={8}
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Heading fontSize="3xl" mb={2}>
              Links
            </Heading>
            <Flex alignItems="center">
              <Button mr={8} onClick={onOpenCreate} ref={btnRefCreate} colorScheme={"telegram"}>
                CREATE LINK
              </Button>
              <Text>
                Links used: {links.length}/{user.plan.max_url_count}
              </Text>
            </Flex>
          </Flex>

          <Divider />
          <Flex width="100%" height="100%">
            <Flex
              flexDirection="column"
              width={350}
              maxWidth="40%"
              height="100%"
              bg={useColorModeValue("gray.200", "gray.700")}
            >
              {links.map((link, idx) => (
                <>
                  <LinkCard
                    date={link.date}
                    title={link.title}
                    shortUrl={link.short_url}
                    selected={selected === idx}
                    onClick={() => {
                      setSelected(idx);
                    }}
                  />
                </>
              ))}
              {links.length == 0 && (
                <Text p={2}>You have no links created, yet</Text>
              )}
            </Flex>
            <Flex flexDirection="column" width="100%" p={3}>
              {links.length == 0 && (
                <Center mt={2}>
                  <Heading>
                    Click the button above to create a new shortened link :)
                  </Heading>
                </Center>
              )}
              {links.length > 0 && (
                <LinkReview
                  link={links[selected]}
                  onOpen={onOpenEdit}
                  btnRef={btnRefEdit}
                  onDelete={removeLinkFromList}
                />
              )}
            </Flex>
          </Flex>
        </Flex>
        {/* <footer>lmao</footer> */}
      </Flex>
      {links.length > 0 && (
        <EditLinkDrawer
          isOpen={isOpenEdit}
          onClose={onCloseEdit}
          btnRef={btnRefEdit}
          link={links[selected]}
          onEdit={editLinkFromList}
        />
      )}
      <CreateLinkDrawer isOpen={isOpenCreate} onClose={onCloseCreate} btnRef={btnRefCreate} onCreate={addLinkFromList}/>
    </>
  );
}

export default Home;
