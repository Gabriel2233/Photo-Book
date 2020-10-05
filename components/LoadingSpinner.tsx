import { Flex, Spinner } from "@chakra-ui/core";

export const LoadingSpinner = () => {
  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Spinner color={"blue.500"} size={"lg"} />;
    </Flex>
  );
};
