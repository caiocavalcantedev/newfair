import { createContext, useState } from 'react'

export type AccountProps = {
    name?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    cep?: string;
    city?: string;
    password?: string;
    rePassword?: string;
}

type AccountFormContextDataProps = {
    AccountFormData: AccountProps;
    UpdateFormData: (value: AccountProps) => void;
}

type AccountFormContextProviderProps = {
    children: React.ReactNode;
}

const AccountFormContext = createContext<AccountFormContextDataProps>({} as AccountFormContextDataProps)

function AccountProvider({ children }: AccountFormContextProviderProps) {

    const [AccountFormData, setAccountFormData] = useState<AccountProps>({} as AccountProps)

    function UpdateFormData(data: AccountProps) {
        setAccountFormData((prevState) => ({
            ...prevState,
            ...data
        }))
    }

    return (
        <AccountFormContext.Provider value={{ AccountFormData, UpdateFormData }}>
            {children}
        </AccountFormContext.Provider>
    )
}

export { AccountFormContext, AccountProvider }