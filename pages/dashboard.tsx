import { Box, Button, Flex, Grid, Heading, Icon, Input } from "@chakra-ui/core";
import { MdPhotoCamera } from "react-icons/md";
import { ProtectRoute } from "../components/ProtectRoute";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import useSWR from "swr";

const fetcher = async (route: string) => {
  const response = await fetch(route);
  const data = await response.json();

  return data;
};

const validationSchema = yup.object({
  title: yup.string().required().min(2),
});

interface Value {
  title: string;
}

function Dashboard() {
  const { handleSubmit, errors, register } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const createAlbum = async ({ title }: Value) => {
    try {
      const response = await fetch("/api/albums/create", {
        method: "POST",
        body: title,
      });

      if (response.ok) {
        alert("Success!!");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const { data, error } = useSWR("/api/albums/list", fetcher);

  if (!data) return <h1>Loading...</h1>;

  if (error) return <h1>Failed to get data...</h1>;

  console.log(data);

  return (
    <Flex width={"100vw"} height={"100vh"} flexDir={"column"}>
      <Flex width="full" alignItems={"center"} justifyContent={"space-between"}>
        <Flex padding={"6"} alignItems={"center"} justifyContent={"center"}>
          <Icon as={MdPhotoCamera} color={"blue.500"} size={"42px"} />
        </Flex>

        <Flex alignItems={"center"} justifyContent={"center"} bg="red">
          <Button
            padding={"4"}
            border={0}
            color={"white"}
            borderRadius={"sm"}
            backgroundColor={"blue.500"}
            _hover={{ backgroundColor: "blue.400" }}
          >
            Albums
          </Button>
          <Button padding={"4"} marginX={"6"} border={0} borderRadius={"sm"}>
            Logout
          </Button>
        </Flex>
      </Flex>

      <Flex
        width="full"
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Flex
          flexDir={"column"}
          alignItems={"center"}
          onSubmit={handleSubmit(createAlbum)}
          as="form"
          justifyContent={"center"}
        >
          <Input
            name="title"
            type="input"
            ref={register}
            padding={6}
            margin={8}
            borderRadius={"sm"}
            size={"lg"}
            placeholder={"Album Title"}
          />
          <Button
            padding={6}
            border={0}
            borderRadius={"sm"}
            color={"white"}
            backgroundColor={"blue.500"}
            _hover={{ backgroundColor: "blue.400" }}
            width={"100%"}
            type="submit"
          >
            Create new Album
          </Button>
        </Flex>
      </Flex>

      <Box width={"full"} textAlign={"center"} marginY={8} bg="red">
        <Heading paddingY={8}>Your Albums</Heading>
      </Box>

      <Grid
        gridTemplateColumns={"repeat(auto-fit, minmax(250px, 1fr))"}
        bg="red"
        maxW={"980px"}
        margin={"auto"}
        width={"90%"}
      >
        {[1, 2, 3, 4, 5].map((el) => (
          <Flex padding={6} bg="blue">
            Hi
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
}

export default ProtectRoute(Dashboard);
