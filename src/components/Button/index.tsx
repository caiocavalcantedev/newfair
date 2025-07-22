import { Pressable, PressableProps, Text } from "react-native";
import { styles } from "./styles";

type Props = PressableProps & {
  title: String;
};

export const Button = ({ title, ...rest }: Props) => {
  return (
    <Pressable
      style={styles.container}
      android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
      {...rest}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};
