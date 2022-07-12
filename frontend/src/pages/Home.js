import {
  Heading,
  Flex,
  Divider,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import LinkCard from "../components/LinkCard";
import EditLinkDrawer from "../components/EditLinkDrawer";
import { handleService } from "../scripts/handleService";
import { linkService, userService } from "../services";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import LinkReview from "../components/LinkReview";

function Home() {
  const [isLoading, setLoading] = useState(false);
  const { user } = useAuth();
  const [links, setLinks] = useState([]);
  const [selected, setSelected] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (user) {
      console.log(user);
      handleService(
        userService.getUserLinks(user.user_id),
        navigate,
        (userLinks) => setLinks(userLinks),
        () => setLoading(false)
      );
    }
  }, [user]);

  return (
    <>
      <Flex height={"100vh"} flexDirection="column">
        <Flex flexDirection="column" flex={1}>
          <Heading fontSize="3xl" ml={8} mt={4} mb={2}>
            Links
          </Heading>
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
                    shortUrl={link.shortUrl}
                    selected={selected === idx}
                    onClick={() => {
                      const links_cpy = [...links];
                      links_cpy[selected].clicks += 1;
                      setSelected(idx);
                    }}
                  />
                </>
              ))}
            </Flex>
            <Flex flexDirection="column" width="100%" p={3}>
              {links.length > 0 && (
                <LinkReview
                  link={links[selected]}
                  onOpen={onOpen}
                  btnRef={btnRef}
                />
              )}
            </Flex>
          </Flex>
        </Flex>
        {/* <footer>lmao</footer> */}
      </Flex>
      {links.length > 0 && (
        <EditLinkDrawer
          isOpen={isOpen}
          onClose={onClose}
          btnRef={btnRef}
          link={links[selected]}
        />
      )}
    </>
  );
}

export default Home;
