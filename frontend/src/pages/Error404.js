import React from "react";
import { Center, Heading, Image, VStack } from "@chakra-ui/react";
function Error404() {
  return (
    <>
      <Center mt={20}>
        <VStack spacing={10}>
          <Heading>We cant find the page your looking for :(</Heading>
          <Image
            alt={"404"}
            align={"center"}
            w={"30%"}
            h={"30%"}
            src={"/404.svg"}
          />
        </VStack>
      </Center>
    </>
  );
}
export default Error404;
