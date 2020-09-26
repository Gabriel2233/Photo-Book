import { Box, Button, Flex, Input, Text } from "@chakra-ui/core";
import { MdPhotoCamera } from "react-icons/md";

export default function Login() {
  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      backgroundColor={"gray.400"}
      justifyContent={"center"}
      alignItems={"center"}
      boxShadow="md"
    >
      <Flex
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        backgroundColor={"white"}
        border={0}
        borderRadius={"sm"}
      >
        <Text display={"flex"} padding={4} fontSize="2xl" textAlign={"center"}>
          <MdPhotoCamera size={36} color={"#4361ee"} />{" "}
          <Text paddingX={4}>PhotoBook</Text>
        </Text>

        <Flex
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          padding={8}
        >
          <Input placeholder="Username" margin={5} paddingY={6} />

          <Input placeholder="Password" margin={5} paddingY={6} />

          <Button
            backgroundColor={"blue.500"}
            _hover={{ backgroundColor: "blue.400" }}
            padding={6}
            marginY={4}
            fontSize="md"
            border={0}
            borderRadius={"sm"}
            width="100%"
            color={"white"}
          >
            Login
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
