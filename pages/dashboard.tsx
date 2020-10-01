import { Button, Flex, Icon, Input } from "@chakra-ui/core";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { MdPhotoCamera } from "react-icons/md";
import { ProtectRoute } from "../components/ProtectRoute";
import * as yup from "yup";

interface Value {
  title: string;
}

const validationSchema = yup.object({
  title: yup.string().required(),
});

function Dashboard() {
  const handleSubmit = (
    data: Value,
    { setSubmitting }: FormikHelpers<Value>
  ) => {
    alert(JSON.stringify(data, null, 2));
    setSubmitting(false);
  };

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
        <Formik
          initialValues={{ title: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form is={"Flex"}>
            <Flex
              flexDir={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              bg="red"
            >
              <Field
                as={Input}
                name="title"
                type="input"
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
          </Form>
        </Formik>
      </Flex>
    </Flex>
  );
}

export default ProtectRoute(Dashboard);
