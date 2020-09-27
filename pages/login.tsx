import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Link as ChackraLink,
  Text,
} from "@chakra-ui/core";
import Link from "next/link";
import { MdPhotoCamera } from "react-icons/md";

export default function Login() {
  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      flexDir={"column"}
      alignItems={"center"}
    >
      <Flex
        position={"fixed"}
        top={0}
        zIndex={999}
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text display={"flex"} padding={6} fontSize="2xl" textAlign={"center"}>
          <MdPhotoCamera size={32} color={"#4361ee"} />
          <div>
            <Text paddingX={4}>PhotoBook</Text>
          </div>
        </Text>

        <ChackraLink paddingX={8} color={"blue.500"}>
          <div>
            <Link href="/">Back Home</Link>
          </div>
        </ChackraLink>
      </Flex>

      <Flex
        zIndex={0}
        width={"100vw"}
        height={"100vh"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Flex alignItems={"center"} justifyContent={"center"} width={"50%"}>
          <Heading size={"2xl"}>Welcome Back!</Heading>
        </Flex>

        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          flexDir={"column"}
          width={"50%"}
          marginTop={16}
        >
          <Input
            placeholder="Username"
            _placeholder={{ color: "grey" }}
            paddingY={8}
            marginY={4}
            border={"1px"}
            borderColor={"gray.400"}
            width={"60%"}
            borderRadius={"sm"}
          />

          <Input
            placeholder="Password"
            _placeholder={{ color: "grey" }}
            paddingY={8}
            marginY={6}
            border={"1px"}
            borderColor={"gray.400"}
            borderRadius={"sm"}
            width={"60%"}
          />

          <Button
            width={"60%"}
            backgroundColor={"blue.500"}
            padding={8}
            fontSize={"lg"}
            color={"white"}
            marginY={6}
            border={0}
            borderRadius={"sm"}
            _hover={{ backgroundColor: "blue.400" }}
          >
            Login
          </Button>

          <ChackraLink paddingX={2} color={"blue.500"}>
            <div>
              <Link href="/register">Create an account</Link>
            </div>
          </ChackraLink>
        </Flex>
      </Flex>
    </Flex>
  );
}
