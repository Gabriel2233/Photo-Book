import { Form, Field, Formik } from "formik";
import firebase from "../appUtils/initFirebase";
import { useRouter } from "next/router";
import {
  Button,
  Flex,
  Heading,
  Link as ChackraLink,
  Text,
  FormErrorMessage,
  FormControl,
  useToast,
} from "@chakra-ui/core";
import Link from "next/link";
import { MdPhotoCamera } from "react-icons/md";
import * as yup from "yup";
import { InputElement } from "../components/InputElement";
import { useAuth } from "../hooks/useAuth";

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

interface AuthDataProps {
  type: string;
}

export const AuthComponent: React.FC<AuthDataProps> = ({ type }) => {
  const auth = useAuth();
  const router = useRouter();
  const toast = useToast();

  const signIn = async ({ email, password }) => {
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

  const signUp = async ({ email, password }) => {
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

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            // make async call
            {
              type === "signIn" ? signIn(data) : signUp(data);
            }
            setSubmitting(false);
          }}
        >
          {({ values, errors, isSubmitting }) => (
            <Flex width={"50%"}>
              <Form
                is={"div"}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Field
                  type="input"
                  name="email"
                  placeholder="Email"
                  as={InputElement}
                />

                <Field
                  type="input"
                  name="password"
                  placeholder="Password"
                  as={InputElement}
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
                  isDisabled={isSubmitting}
                  type="submit"
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
              </Form>
            </Flex>
          )}
        </Formik>
      </Flex>
    </Flex>
  );
};
