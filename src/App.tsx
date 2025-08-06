import { Routes } from './routes';
import { AccountProvider } from "./contexts/AccountFormContext";

//1 hora e 25 do video -  final do context

export default function App() {
  return (
    <AccountProvider>
      <Routes />
    </AccountProvider>
  )
}
