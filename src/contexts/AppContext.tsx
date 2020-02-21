import React, {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useContext
} from "react";
import { ThemeType } from "@ui-kitten/components";
import ligthTheme from "../themes/LightTheme";
import darkTheme from "../themes/DarkTheme";
import { Paciente } from "./PacienteContext";
import useSecStorage from "../hooks/useSecStorage";

const defaultTheme: AppTheme = {
  name: "ligth",
  vars: ligthTheme
};

export type ThemeName = "ligth" | "dark";

export interface AppTheme {
  vars: ThemeType;
  name: ThemeName;
}
export interface AppContextType {
  theme: AppTheme;
  dadosPacientes: Paciente[];
  setDadosPacientes: Dispatch<SetStateAction<Paciente[]>>;
  switchTheme?: () => void;
}
const AppContext = createContext<AppContextType>({
  theme: defaultTheme,
  switchTheme: () => {},
  dadosPacientes: [],
  setDadosPacientes: () => {}
});

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState<AppTheme>(defaultTheme);
  const [dadosPacientes, setDadosPacientes] = useSecStorage<Paciente[]>(
    "pacientes",
    []
  );

  function switchTheme() {
    setTheme(old => ({
      name: old.name === "dark" ? "ligth" : "dark",
      vars: old.name === "dark" ? ligthTheme : darkTheme
    }));
  }

  return (
    <AppContext.Provider
      value={{ theme, switchTheme, dadosPacientes, setDadosPacientes }}
    >
      {children}
    </AppContext.Provider>
  );
};

//hook de context para pegar apenas dados especificos do contexto geral
export function useDadosPacientes(): [
  Paciente[],
  Dispatch<SetStateAction<Paciente[]>>
] {
  const { dadosPacientes, setDadosPacientes } = useContext(AppContext);
  return [dadosPacientes, setDadosPacientes];
}

export const AppConsumer = AppContext.Consumer;

export default AppContext;
