import { TextInput, TextInputProps, View } from "react-native";
import { forwardRef } from "react";

import { Controller, UseControllerProps } from "react-hook-form";
import { Feather } from "@expo/vector-icons";

import { styles } from "./styles";

type Props = {
  icon: keyof typeof Feather.glyphMap;
  formProps: UseControllerProps;
  inputProps: TextInputProps;
};

const Input = forwardRef<TextInput, Props>(
  ({ icon, formProps, inputProps }, ref) => {
    return (
      <Controller
        render={({ field }) => (
          <View style={styles.group}>
            <View style={styles.icon}>
              <Feather name={icon} size={24} color="#FF7A00" />
            </View>

            <TextInput
              ref={ref}
              value={field.value}
              style={styles.control}
              {...inputProps}
              onChangeText={field.onChange}
            />
          </View>
        )}
        {...formProps}
      />
    );
  }
);

export { Input };
