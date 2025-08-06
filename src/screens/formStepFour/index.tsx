import { useRef } from "react";
import { useForm } from "react-hook-form";

import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { styles } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import SvgFormStepFour from "../../assets/svg/formStepFour.svg";
import { useNavigation } from "@react-navigation/native";
import { useAccountForm } from "hooks/useAccountForm";
import { AccountProps } from "contexts/AccountFormContext";

type FormData = {
  password: string;
  rePassword: string;
};

export function FormStepFour() {

  const { UpdateFormData } = useAccountForm();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AccountProps>();

  const password = watch("password");

  const { navigate } = useNavigation();

  function handleNextStep(data: AccountProps) {
    UpdateFormData(data);
    navigate("formStepFive")
  }

  const rePasswordRef = useRef<TextInput>(null);

  return (
    <KeyboardAvoidingView
      style={styles.constainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Identifica se é iOS ou Android
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0} // ajuste se tiver header
    >
      <Text style={styles.title}>Escolha sua senha</Text>
      <View>
        <SvgFormStepFour style={styles.stepFour} />
      </View>

      <Input<AccountProps>
        icon="key"
        error={errors.password?.message}
        formProps={{
          control,
          name: "password",
          rules: {
            required: "Senha é obrigatória!",
            minLength: {
              value: 6,
              message: "Mínimo de 6 caracteres.",
            },
          },
        }}
        inputProps={{
          placeholder: "Senha",
          onSubmitEditing: () => rePasswordRef.current?.focus(),
          returnKeyType: "next",
          secureTextEntry: true,
        }}
      />

      <Input<AccountProps>
        icon="check-square"
        ref={rePasswordRef}
        error={errors.rePassword?.message}
        formProps={{
          name: "rePassword",
          control,
          rules: {
            required: "Confirme a sua senha!",
            minLength: {
              value: 6,
              message: "Mínimo de 6 caracteres.",
            },
            validate: (value) =>
              value === password || "As senhas não coincidem.",
          },
        }}
        inputProps={{
          placeholder: "Confirme sua senha",
          onSubmitEditing: handleSubmit(handleNextStep),
          secureTextEntry: true,
        }}
      />
      <Button title="Concluir" onPress={handleSubmit(handleNextStep)} />
    </KeyboardAvoidingView>
  );
}
