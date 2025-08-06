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

import SvgFormStepThree from "../../assets/svg/formStepThree.svg";
import { useNavigation } from "@react-navigation/native";
import { useAccountForm } from "hooks/useAccountForm";
import { AccountProps } from "contexts/AccountFormContext";

export function FormStepThree() {

  const { UpdateFormData } = useAccountForm();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AccountProps>();

  const { navigate } = useNavigation();

  function handleNextStep(data: AccountProps) {
    UpdateFormData(data);
    navigate("formStepFour")
  }


  async function fetchAddressByCep(cep: string) {
    const cleanedCep = cep.replace(/\D/g, "");

    if (cleanedCep.length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${cleanedCep}/json/`
        );
        const data = await response.json();

        if (!data.erro) {
          setValue("city", `${data.localidade} - ${data.uf}`, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
      } catch (error) {
        console.warn("Erro ao buscar CEP:", error);
      }
    }
  }

  const cityRef = useRef<TextInput>(null);

  return (
    <KeyboardAvoidingView
      style={styles.constainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Identifica se é iOS ou Android
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0} // ajuste se tiver header
    >
      <Text style={styles.title}>Sua localização</Text>
      <View>
        <SvgFormStepThree style={styles.stepThree} />
      </View>

      <Input
        icon="home"
        error={errors.cep?.message}
        formProps={{
          control,
          name: "cep",
          rules: {
            required: "CEP é obrigatório!",
            pattern: {
              value: /^\d{5}-?\d{3}$/,
              message: "CEP inválido.",
            },
          },
        }}
        inputProps={{
          placeholder: "CEP",
          onSubmitEditing: () => cityRef.current?.focus(),
          returnKeyType: "next",
          onChangeText: (text: any) => {
            setValue("cep", text, { shouldValidate: true });
            fetchAddressByCep(text);
          },
        }}
      />

      <Input
        icon="map-pin"
        ref={cityRef}
        error={errors.city?.message}
        formProps={{
          name: "city",
          control,
          rules: {
            required: "Cidade é obrigatório!",
            pattern: {
              value: /^[A-Za-zÀ-ÿ\s'-]{2,}$/,
              message: "Cidade inválida.",
            },
          },
        }}
        inputProps={{
          placeholder: "Sua cidade",
          onSubmitEditing: handleSubmit(handleNextStep),
        }}
      />
      <Button title="Continuar" onPress={handleSubmit(handleNextStep)} />
    </KeyboardAvoidingView>
  );
}
