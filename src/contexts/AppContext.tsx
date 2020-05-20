import React, {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { ThemeType } from "@ui-kitten/components";
import ligthTheme from "../themes/LightTheme";
import darkTheme from "../themes/DarkTheme";
import { Paciente } from "./PacienteContext";
import useSecStorage from "../hooks/useSecStorage";
import Spinner from "react-native-loading-spinner-overlay";

const defaultTheme: AppTheme = {
  name: "ligth",
  vars: ligthTheme,
};

export type ThemeName = "ligth" | "dark";

export interface AppTheme {
  vars: ThemeType;
  name: ThemeName;
}
export interface AppContextType {
  theme: AppTheme;
  defaultTheme?: AppTheme;
  setTheme?: Dispatch<SetStateAction<AppTheme>>;
  dadosPacientes: Paciente[];
  setDadosPacientes: Dispatch<SetStateAction<Paciente[]>>;
  loadingState?: [boolean, Dispatch<SetStateAction<boolean>>];
  loadingMessage?: [string, Dispatch<SetStateAction<string>>];
  switchTheme?: () => void;
}
const AppContext = createContext<AppContextType>({
  theme: defaultTheme,
  switchTheme: () => {},
  dadosPacientes: [],
  setDadosPacientes: () => {},
});

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState<AppTheme>(defaultTheme);
  const [dadosPacientes, setDadosPacientes] = useSecStorage<Paciente[]>(
    "pacientes",
    []
  );
  const loadingState = useState(false);
  const loadingMessage = useState("");

  useEffect(() => {
    if (!loadingState[0]) {
      loadingMessage[1]("");
    }
  }, [loadingState[0]]);

  function switchTheme() {
    setTheme({
      name: "dark",
      vars: darkTheme,
    });

    // setTheme(old => ({
    //   name: old.name === "dark" ? "ligth" : "dark",
    //   vars: old.name === "dark" ? ligthTheme : darkTheme
    // }));
  }

  return (
    <AppContext.Provider
      value={{
        theme,
        defaultTheme,
        setTheme,
        switchTheme,
        dadosPacientes,
        setDadosPacientes,
        loadingState,
      }}
    >
      <Spinner
        visible={loadingState[0]}
        animation="fade"
        textContent={loadingMessage[0]}
        color={theme.vars["color-primary-500"]}
        overlayColor="#fff9"
      />
      {children}
    </AppContext.Provider>
  );
};

export const useLoading = () => {
  const { loadingState } = useContext(AppContext);
  return loadingState;
};

export const useLoadingMessage = () => {
  const { loadingMessage } = useContext(AppContext);
  return loadingMessage;
};

export function useDadosPacientes(): [
  Paciente[],
  Dispatch<SetStateAction<Paciente[]>>
] {
  const { dadosPacientes, setDadosPacientes } = useContext(AppContext);
  return [dadosPacientes, setDadosPacientes];
}

export const AppConsumer = AppContext.Consumer;

export default AppContext;
