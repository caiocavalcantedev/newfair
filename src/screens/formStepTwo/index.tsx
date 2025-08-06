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

import SvgFormStepTwo from "../../assets/svg/formStepTwo.svg";
import { useNavigation } from "@react-navigation/native";
import { useAccountForm } from "hooks/useAccountForm";
import { AccountProps } from "contexts/AccountFormContext";

export function FormStepTwo() {

  const { UpdateFormData } = useAccountForm();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountProps>();

  const { navigate } = useNavigation();

  function handleNextStep(data: AccountProps) {
    UpdateFormData(data);
    navigate("formStepThree")
  }



  const phoneRef = useRef<TextInput>(null);

  return (
    <KeyboardAvoidingView
      style={styles.constainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Identifica se é iOS ou Android
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0} // ajuste se tiver header
    >
      <Text style={styles.title}>Suas informações</Text>
      <View>
        <SvgFormStepTwo style={styles.stepTwo} />
      </View>

      <Input
        icon="mail"
        error={errors.email?.message}
        formProps={{
          control,
          name: "email",
          rules: {
            required: "Email é obrigatório!",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|com\.br)$/,
              message: "Email inválido.",
            },
          },
        }}
        inputProps={{
          placeholder: "Email",
          onSubmitEditing: () => phoneRef.current?.focus(),
          returnKeyType: "next",
        }}
      />

      <Input
        icon="phone"
        ref={phoneRef}
        error={errors.phone?.message}
        formProps={{
          name: "phone",
          control,
          rules: {
            required: "Whatsapp é obrigatório!",
            pattern: {
              value: /^\(?\d{2}\)?[\s-]?9?\d{4}-?\d{4}$/,
              message: "Número inválido.",
            },
          },
        }}
        inputProps={{
          placeholder: "WhatsApp",
          onSubmitEditing: handleSubmit(handleNextStep),
        }}
      />
      <Button title="Continuar" onPress={handleSubmit(handleNextStep)} />
    </KeyboardAvoidingView>
  );
}
