import React from "react";
import { Button, Flex, Icon, Input, StatLabel, Text } from "@chakra-ui/core";
import Header from "../../components/Header";
import { useForm } from "react-hook-form";
import firebase from "../../appUtils/initFirebase";
import { HiOutlineUpload } from "react-icons/hi";
import { useRouter } from "next/router";

export default function Album() {
  const { handleSubmit, errors, register } = useForm();
  const { query } = useRouter();

  const uploadFile = async (data: { image: File }) => {
    const storageRef = firebase.storage().ref();
    const fieldRef = storageRef.child(data.image[0].name);

    try {
      const upload = await fieldRef.put(data.image[0]);
      const imageUrl = await upload.ref.getDownloadURL();

      const body = JSON.stringify({ imageUrl, title: query.albumTitle });

      if (upload.state === "success") {
        await fetch("/api/albums/update", {
          method: "PUT",
          body,
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Flex width={"100vw"} height={"100vh"} flexDir={"column"}>
      <Header />

      <Flex
        as={"form"}
        width={"full"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        marginY={12}
        onSubmit={handleSubmit(uploadFile)}
      >
        <Flex
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"100%"}
        >
          <StatLabel
            display={"flex"}
            justifyContent={"center"}
            borderWidth={2}
            borderRadius={4}
            borderColor={"gray"}
            width={"50%"}
            padding={3}
          >
            <Icon as={HiOutlineUpload} size={"22px"} marginRight={4} />
            <Text fontSize={"md"}> Choose a file</Text>
          </StatLabel>
          <Input
            name="image"
            ref={register}
            cursor={"pointer"}
            opacity={0}
            position={"absolute"}
            type="file"
            width={"50%"}
          />
        </Flex>
        <Button
          _hover={{ backgroundColor: "blue.400" }}
          backgroundColor={"blue.500"}
          color={"white"}
          width={"50%"}
          marginY={6}
          padding={6}
          type="submit"
        >
          Upload
        </Button>
      </Flex>
    </Flex>
  );
}
