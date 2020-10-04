import { Input, InputProps } from "@chakra-ui/core";
import { useForm } from "react-hook-form";

export const InputElement: React.FC<InputProps> = ({
  placeholder,
  ...props
}) => {
  const { register } = useForm();

  return (
    <Input
      {...props}
      ref={register}
      placeholder={placeholder}
      _placeholder={{ color: "grey" }}
      paddingY={8}
      width={"60%"}
      marginY={4}
      border={"1px"}
      borderColor={"gray.400"}
      borderRadius={"sm"}
      name={props.name}
      type={props.type}
    />
  );
};
