import { useForm } from "react-hook-form";
import { useAccountForm } from '../../hooks/useAccountForm';
import { View, Text } from "react-native";

import { styles } from "./styles";
import { Button } from "../../components/Button";
import SvgSucess from "../../assets/svg/Sucess.svg";


export function FormStepFive() {

  const { AccountFormData } = useAccountForm(); //Pega todos os dados do formulário

  function handleNextStep() {
    // Aqui você pode enviar os dados para o servidor ou fazer qualquer outra ação necessária
    // Por exemplo, você pode usar uma função de API para enviar os dados
    // await api.post('/endpoint', AccountFormData);
    console.log({
      ...AccountFormData,
    });
  }

  return (
    <View style={styles.constainer}>
      <View style={styles.principal}>
        <SvgSucess style={styles.svg} />
        <Text style={styles.title}>Cadastro concluído! </Text>
      </View>

      <Button title="Finalizar" onPress={handleNextStep} />
    </View>
  );
}
function userFormContext() {
  throw new Error("Function not implemented.");
}

