import React from "react";
import {
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Input,
  StatLabel,
  Text,
  useColorMode,
} from "@chakra-ui/core";
import Header from "../../components/Header";
import { useForm } from "react-hook-form";
import firebase from "../../appUtils/initFirebase";
import { HiOutlineUpload } from "react-icons/hi";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import { useAuth } from "../../hooks/useAuth";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { setUserCookie } from "../../appUtils/userCookies";

async function fetcher(url: string, params: string) {
  const response = await fetch(url + params);

  return response.json();
}

export default function Album() {
  const { handleSubmit, errors, register } = useForm();
  const { query } = useRouter();
  const { user } = useAuth();
  const { colorMode } = useColorMode();

  const appUser = user !== null && user;

  const { data, error } = useSWR(
    [`/api/albums/get-album-photos?id=${appUser.id}&title=`, query.albumTitle],
    (url, params) => fetcher(url, params)
  );

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

      mutate([
        `/api/albums/get-album-photos?id=${appUser.id}&title=`,
        query.albumTitle,
      ]);
    } catch (error) {
      alert(error.message);
    }
  };

  if (!data) return <LoadingSpinner />;
  if (error) return <h1>Error</h1>;

  return (
    <Flex width={"100vw"} height={"100vh"} flexDir={"column"}>
      <Header />

      <Heading
        size={"lg"}
        zIndex={999}
        padding={8}
        position={"absolute"}
        left={20}
        top={0}
      >
        {data.title}
      </Heading>

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
            fontSize={"md"}
          >
            <Icon as={HiOutlineUpload} size={"22px"} marginRight={4} />
            Choose a file
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

      <Grid
        paddingTop={8}
        gridTemplateColumns={"repeat(auto-fit, minmax(300px, 1fr))"}
        bg="red"
        maxW={"980px"}
        margin={"auto"}
        width={"90%"}
      >
        {data.photos.map((el) => (
          <Flex
            backgroundColor={colorMode === "light" ? "gray.100" : "gray.900"}
            padding={4}
            margin={8}
            alignItems={"center"}
            justifyContent={"center"}
            border={0}
            borderRadius={"sm"}
            key={el}
          >
            <Image src={el} w={"90%"} h={"90%"} />
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
}
