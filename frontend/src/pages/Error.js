import React, { useMemo } from "react";
import { Center, Heading, VStack } from "@chakra-ui/react";
import Error404 from "./Error404";
import { useLocation } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Error() {
  let query = useQuery();
  const code = query.get("code") || 404;
  if (code == 404) return <Error404 />;
  return (
    <>
      <Center mt={20}>
        <VStack spacing={10}>
          <Heading>Error {code} :(</Heading>
        </VStack>
      </Center>
    </>
  );
}
export default Error;
