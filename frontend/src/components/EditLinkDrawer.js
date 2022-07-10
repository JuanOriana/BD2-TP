import React, { useState } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerContent,
  DrawerFooter,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
  FormLabel,
} from "@chakra-ui/react";

const EditLinkDrawer = ({ isOpen, onClose, btnRef, link }) => {
  const [title, setTitle] = useState(link.title);
  const [longUrl, setLongUrl] = useState(link.longUrl);
  const [shortUrl, setShortUrl] = useState(link.shortUrl);

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Edit link</DrawerHeader>

        <DrawerBody>
          <VStack align="start">
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FormLabel>Long url</FormLabel>
            <Input
              placeholder="Enter long url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
            />
            <FormLabel>Short url</FormLabel>
            <InputGroup>
              <InputLeftAddon children="shaw.ty/" />
              <Input
                placeholder="Enter short url"
                value={shortUrl}
                onChange={(e) => setShortUrl(e.target.value)}
              />
            </InputGroup>
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="telegram" onClick={onClose}>
            Create
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default EditLinkDrawer;
