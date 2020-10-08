import { Flex, Heading, Text, useColorMode } from "@chakra-ui/core";

export interface CardProps {
  albumData: {
    title: string;
    id: string;
    photos: Array<string>;
  };
}

export const AlbumCard: React.FC<CardProps> = ({ albumData }) => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      borderColor={colorMode === "light" ? "gray.500" : "gray.700"}
      borderWidth={1}
      borderRadius={"sm"}
      margin={8}
    >
      <Flex
        width={"full"}
        alignItems={"center"}
        borderBottomWidth={1}
        borderBottom={"1px solid gray.500"}
        justifyContent={"flex-end"}
      >
        <Text fontSize={"sm"} paddingX={4} paddingY={2}>
          {albumData.photos.length} Photos
        </Text>
      </Flex>
      <Flex
        padding={5}
        alignItems={"center"}
        width={"full"}
        justifyContent={"center"}
      >
        <Heading size={"xl"} marginY={5}>
          {albumData.title}
        </Heading>
      </Flex>
    </Flex>
  );
};
