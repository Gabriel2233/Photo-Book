import {
  Form,
  Field,
  ErrorMessage,
  Formik,
  FieldAttributes,
  useField,
} from "formik";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Link as ChackraLink,
  Text,
} from "@chakra-ui/core";
import Link from "next/link";
import { MdPhotoCamera } from "react-icons/md";
import * as yup from "yup";

const validationSchema = yup.object({
  username: yup.string().required().max(12),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const InputElement: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <Input
      placeholder={placeholder}
      {...field}
      _placeholder={{ color: "grey" }}
      paddingY={8}
      width={"60%"}
      marginY={4}
      border={"1px"}
      borderColor={"gray.400"}
      borderRadius={"sm"}
    />
  );
};

const FlexComponent: React.FC = ({ children }) => {
  return (
    <Flex
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
    >
      {children}
    </Flex>
  );
};

export default function Register() {
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
        <Text display={"flex"} padding={6} fontSize="2xl" textAlign={"center"}>
          <MdPhotoCamera size={32} color={"#4361ee"} />{" "}
          <div>
            <Text fontSize={"2xl"} paddingX={2}>
              PhotoBook
            </Text>
          </div>
        </Text>

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
            Create an account and start right now!
          </Heading>
        </Flex>

        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            // make async call
            console.log("submit: ", data);
            setSubmitting(false);
          }}
        >
          {({ values, errors, isSubmitting }) => (
            <Flex width={"50%"}>
              <Form
                is={"form"}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Field
                  type="input"
                  name="username"
                  placeholder="Username"
                  as={InputElement}
                />

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
                  Create Account
                </Button>
                <Link href="/login">
                  <div>
                    <ChackraLink paddingY={6} color={"blue.500"}>
                      Login Here
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
}
