import React from "react";

import { Flex, Icon, Button } from "@chakra-ui/core";

import { MdPhotoCamera } from "react-icons/md";

export default function Header() {
  return (
    <Flex width="full" alignItems={"center"} justifyContent={"space-between"}>
      <Flex padding={"6"} alignItems={"center"} justifyContent={"center"}>
        <Icon as={MdPhotoCamera} color={"blue.500"} size={"42px"} />
      </Flex>

      <Flex alignItems={"center"} justifyContent={"center"} bg="red">
        <Button
          padding={"4"}
          border={0}
          color={"white"}
          borderRadius={4}
          backgroundColor={"blue.500"}
          _hover={{ backgroundColor: "blue.400" }}
        >
          Albums
        </Button>

        <Button
          padding={"4"}
          marginX={"6"}
          border={0}
          borderRadius={4}
          backgroundColor={"gray"}
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  );
}
