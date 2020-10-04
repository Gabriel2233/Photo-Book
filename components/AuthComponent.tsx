import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  Button,
  Flex,
  Heading,
  Input,
  Link as ChackraLink,
  Text,
  useToast,
} from "@chakra-ui/core";
import Link from "next/link";
import { MdPhotoCamera } from "react-icons/md";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import { useAuth } from "../hooks/useAuth";

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

interface AuthDataProps {
  type: string;
}

interface FunctionArgs {
  email: string;
  password: string;
}

export const AuthComponent: React.FC<AuthDataProps> = ({ type }) => {
  const auth = useAuth();
  const router = useRouter();
  const toast = useToast();

  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const signIn = async ({ email, password }: FunctionArgs) => {
    try {
      const response = await auth.signIn(email, password);

      const data = response.id;

      if (data) {
        toast({
          title: "Success! 📸",
          description: "Login was successfull",
          status: "success",
          duration: 3000,
        });
        router.push("/dashboard");
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 9000,
      });
    }
  };

  const signUp = async ({ email, password }: FunctionArgs) => {
    try {
      const response = await auth.signUp(email, password);
      const data = response.id;
      if (data) {
        toast({
          title: "Success! 📸",
          description: "Your account has been created.",
          status: "success",
          duration: 3000,
        });
        router.push("/dashboard");
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 9000,
      });
    }
  };

  const submitArgument = type === "signIn" ? signIn : signUp;

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
        <Flex padding={6} fontSize="2xl" textAlign={"center"}>
          <MdPhotoCamera size={32} color={"#4361ee"} />{" "}
          <div>
            <Text fontSize={"2xl"} paddingX={2}>
              PhotoBook
            </Text>
          </div>
        </Flex>

        <Link href="/">
          <div>
            <ChackraLink paddingX={8} color={"blue.500"}>
              Back Home
            </ChackraLink>
          </div>
        </Link>
      </Flex>

      <Flex
        zIndex={0}
        width={"100vw"}
        height={"100vh"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Flex alignItems={"center"} justifyContent={"center"} width={"50%"}>
          <Heading paddingLeft={12} size={"2xl"}>
            {type === "signIn"
              ? "Welcome Back!"
              : "Create an account and start now!"}
          </Heading>
        </Flex>

        <Flex
          width={"50%"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Input
            type="input"
            ref={register}
            name="email"
            placeholder={"Email"}
            _placeholder={{ color: "grey" }}
            paddingY={8}
            width={"60%"}
            marginY={4}
            border={"1px"}
            borderColor={"gray.400"}
            borderRadius={"sm"}
          />

          <Input
            type="input"
            ref={register}
            name="password"
            placeholder={"Password"}
            _placeholder={{ color: "grey" }}
            paddingY={8}
            width={"60%"}
            marginY={4}
            border={"1px"}
            borderColor={"gray.400"}
            borderRadius={"sm"}
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
            type="submit"
            onClick={handleSubmit(signIn)}
          >
            {type === "signIn" ? "Login" : "Create an account"}
          </Button>
          <Link href={type === "signIn" ? "/register" : "/login"}>
            <div>
              <ChackraLink paddingY={6} color={"blue.500"}>
                {type === "signIn" ? "Create an account" : "Login"}
              </ChackraLink>
            </div>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};
