import { Flex, Heading, Text } from "@chakra-ui/core";

export interface CardProps {
  albumData: {
    title: string;
    id: string;
    photos: Array<string>;
  };
}

export const AlbumCard: React.FC<CardProps> = ({ albumData }) => {
  return (
    <Flex
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      borderColor={"gray.500"}
      borderWidth={1}
      borderRadius={"sm"}
      margin={8}
      boxShadow={"0px 4px 14px gray.500"}
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
