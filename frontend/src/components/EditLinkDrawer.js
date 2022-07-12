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
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { linkService } from "../services";

const EditLinkDrawer = ({ isOpen, onClose, btnRef, link }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    linkService
      .editLink(link.short_url, data.title, data.shortUrl)
      .then(() => onClose());
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerBody>
            <VStack align="start">
              <FormControl id="title" isInvalid={errors.title}>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  defaultValue={link.title}
                  isRequired
                  placeholder="Enter title"
                  id="title"
                  {...register("title", {
                    required: "Title is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>
              <FormLabel>Target url</FormLabel>
              <Input defaultValue={link.target_url} isDisabled={true} />
              <FormControl id="shortUrl" isInvalid={errors.shortUrl}>
                <FormLabel htmlFor="shortUrl">Short url</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="shaw.ty/" />
                  <Input
                    isRequired
                    placeholder="Enter short url"
                    defaultValue={link.short_url}
                    id="shortUrl"
                    {...register("shortUrl", {
                      required: "Short url is required",
                      minLength: {
                        value: 6,
                        message: "Minimum length should be 6",
                      },
                      maxLength: {
                        value: 12,
                        message: "Maximum length should be 12",
                      },
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.shortUrl && errors.shortUrl.message}
                </FormErrorMessage>
              </FormControl>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="telegram"
              isLoading={isSubmitting}
              type="submit"
            >
              Edit
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default EditLinkDrawer;
