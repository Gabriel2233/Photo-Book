import { Form, Field, Formik } from "formik";
import { useRouter } from "next/router";
import {
  Button,
  Flex,
  Heading,
  Link as ChackraLink,
  Text,
  FormErrorMessage,
  FormControl,
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

  function authenticate(email: string, password: string) {
    try {
      const response =
        type === "signIn"
          ? auth.signIn(email, password)
          : auth.signUp(email, password);

      alert(response);
      //router.push("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  }

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
            authenticate(data.email, data.password);
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
