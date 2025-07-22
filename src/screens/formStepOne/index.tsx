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

import SvgFormStepOne from "../../assets/svg/formStepOne.svg";

export function FormStepOne() {
  const { control, handleSubmit } = useForm();

  function handleNextStep(data: any) {
    console.log(data);
  }

  const lastNameRef = useRef<TextInput>(null);

  return (
    <KeyboardAvoidingView
      style={styles.constainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Identifica se é iOS ou Android
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0} // ajuste se tiver header
    >
      <Text style={styles.title}>Criar sua conta</Text>
      <View>
        <SvgFormStepOne style={styles.stepOne} />
      </View>

      <Input
        icon="user"
        formProps={{
          name: "name",
          control,
        }}
        inputProps={{
          placeholder: "Nome",
          onSubmitEditing: () => lastNameRef.current?.focus(),
          returnKeyType: "next",
        }}
      />

      <Input
        ref={lastNameRef}
        icon="user-check"
        formProps={{
          name: "lastname",
          control,
        }}
        inputProps={{
          placeholder: "Sobrenome",
          onSubmitEditing: handleSubmit(handleNextStep),
        }}
      />
      <Button title="Continuar" onPress={handleSubmit(handleNextStep)} />
    </KeyboardAvoidingView>
  );
}
