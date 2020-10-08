import React from "react";

import {
  Flex,
  Icon,
  Button,
  Switch,
  IconButton,
  useColorMode,
} from "@chakra-ui/core";

import { MdPhotoCamera } from "react-icons/md";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Header() {
  const { signOut } = useAuth();
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();

  const logout = () => {
    signOut();

    router.push("/");
  };

  return (
    <Flex width="full" alignItems={"center"} justifyContent={"space-between"}>
      <Flex padding={"6"} alignItems={"center"} justifyContent={"center"}>
        <Icon as={MdPhotoCamera} color={"blue.500"} size={"42px"} />
      </Flex>

      <Flex alignItems={"center"} justifyContent={"center"} bg="red">
        <Flex align="center" color="gray.500" marginX={4}>
          <IconButton
            aria-label={`Switch to ${
              colorMode === "light" ? "dark" : "light"
            } mode`}
            variant="ghost"
            color="current"
            ml="2"
            fontSize="20px"
            onClick={toggleColorMode}
            icon={colorMode === "light" ? "moon" : "sun"}
          />
        </Flex>
        <Link href="/dashboard">
          <Button
            padding={4}
            border={0}
            color={"white"}
            borderRadius={4}
            backgroundColor={"blue.500"}
            _hover={{ backgroundColor: "blue.400" }}
          >
            Albums
          </Button>
        </Link>

        <Button
          padding={4}
          marginX={4}
          marginRight={8}
          border={0}
          borderRadius={4}
          backgroundColor={"gray"}
          onClick={logout}
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  );
}
