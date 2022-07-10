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
  VStack,
  FormLabel,
} from "@chakra-ui/react";

const CreateLinkDrawer = ({ isOpen, onClose, btnRef }) => {
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
        <DrawerHeader>Create link</DrawerHeader>

        <DrawerBody>
          <VStack align="start">
            <FormLabel>Title</FormLabel>
            <Input placeholder="Enter title" />
            <FormLabel>Long url</FormLabel>
            <Input placeholder="Enter long url" />
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

export default CreateLinkDrawer;
