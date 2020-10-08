import Head from "next/head";
import Link from "next/link";
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/core";
import { MdPhotoCamera } from "react-icons/md";

export default function App() {
  return (
    <Box width={"100vw"} height={"100vh"}>
      <Flex
        width={"100%"}
        p={8}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Flex fontSize={"1.2rem"}>
          <MdPhotoCamera
            size={28}
            color="#4361ee"
            style={{ margin: "0 8px" }}
          />
          PhotoBook
        </Flex>

        <Flex>
          <Link href="/login">
            <Button padding={4} borderRadius={"sm"} border={0}>
              Sign In
            </Button>
          </Link>

          <Link href="/register">
            <Button
              padding={4}
              borderRadius={"sm"}
              backgroundColor={"blue.500"}
              color={"white"}
              _hover={{ backgroundColor: "blue.400" }}
              border={0}
              margin={"0 16px"}
            >
              Sign Up
            </Button>
          </Link>
        </Flex>
      </Flex>

      <Flex width={"100%"} alignItems={"center"} justifyContent={"center"}>
        <Flex marginRight={20} flexDir={"column"} paddingX={6}>
          <Box marginY={20}>
            <Heading size={"2xl"}>
              You take the photos.
              <br /> We help you organize them.
            </Heading>
            <Text fontSize={"md"} paddingY={6}>
              PhotoBook helps you organize your photos efficiently,
              <br /> providing a modern and fast tool for all of your needs.
            </Text>
          </Box>

          <Link href="/register">
            <Button
              padding={8}
              backgroundColor={"blue.500"}
              color={"white"}
              border={0}
              borderRadius={"sm"}
              width={"50%"}
              _hover={{ backgroundColor: "blue.400" }}
              fontSize={"1.2rem"}
            >
              Create an account
            </Button>
          </Link>
        </Flex>

        <Box size="sm">
          <Image
            src="/photographer-colour.svg"
            alt="Photographer"
            width={500}
            height={500}
          />
        </Box>
      </Flex>
    </Box>
  );
}
