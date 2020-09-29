import { Input } from "@chakra-ui/core";
import { useField, FieldAttributes } from "formik";

export const InputElement: React.FC<FieldAttributes<{}>> = ({
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
