import { forwardRef } from "react";
import { TextInput, TextInputProps, View, Text } from "react-native";

import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { Feather } from "@expo/vector-icons";

import { styles } from "./styles";

import clsx from "clsx";

type Props<T extends FieldValues> = {
  icon: keyof typeof Feather.glyphMap;
  error?: string | undefined;
  formProps: UseControllerProps<T>;
  inputProps?: TextInputProps;
};

function InputInner<T extends FieldValues>(
  { icon, error, formProps, inputProps }: Props<T>,
  ref: React.Ref<TextInput>
) {
  return (
    <Controller
      {...formProps}
      render={({ field }) => (
        <View style={styles.container}>
          <View style={styles.group}>
            <View style={styles.icon}>
              <Feather
                name={icon}
                size={24}
                color={clsx({
                  ["#DC1637"]: !!error,
                  ["#FF7A00"]: !!field.value && !error,
                  ["#999"]: !field.value && !error,
                })}
              />
            </View>

            <TextInput
              ref={ref}
              value={field.value}
              style={styles.control}
              onChangeText={field.onChange}
              {...inputProps}
            />
          </View>
          {!!error && <Text style={styles.error}>{error}</Text>}
        </View>
      )}
    />
  );
}

// 👉 Envolvendo com forwardRef
const Input = forwardRef(InputInner) as <T extends FieldValues>(
  props: Props<T> & { ref?: React.Ref<TextInput> }
) => ReturnType<typeof InputInner>;

export { Input };
