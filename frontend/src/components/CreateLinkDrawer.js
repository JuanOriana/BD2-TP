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
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { linkService } from "../services";

const CreateLinkDrawer = ({ isOpen, onClose, btnRef, onCreate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    linkService.newLink(data.targetUrl, data.title).then((r) => {
      onCreate(r.getData())
      onClose();
    });
  };

  const URLexpression =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const regex = new RegExp(URLexpression);

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

        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerBody>
            <VStack align="start">
              <FormControl id="title" isInvalid={errors.title}>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
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
              <FormControl id="targetUrl" isInvalid={errors.targetUrl}>
                <FormLabel htmlFor="targetUrl">Target url</FormLabel>
                <Input
                  isRequired
                  placeholder="Enter target url"
                  id="targetUrl"
                  {...register("targetUrl", {
                    required: "Target url is required",
                    pattern: {
                      value: regex,
                      message: "Invalid URL (http://www.something.som)",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.targetUrl && errors.targetUrl.message}
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
              Create
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateLinkDrawer;
