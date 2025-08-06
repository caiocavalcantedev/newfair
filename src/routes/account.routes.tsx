import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { FormStepOne } from "../screens/formStepOne";
import { FormStepTwo } from "../screens/formStepTwo";
import { FormStepThree } from "../screens/formStepThree";
import { FormStepFour } from "../screens/formStepFour";
import { FormStepFive } from "../screens/formStepFive";

const { Navigator, Screen } = createNativeStackNavigator();

export function AccountRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="formStepOne" component={FormStepOne} />
            <Screen name="formStepTwo" component={FormStepTwo} />
            <Screen name="formStepThree" component={FormStepThree} />
            <Screen name="formStepFour" component={FormStepFour} />
            <Screen name="formStepFive" component={FormStepFive} />
        </Navigator>
    )
}