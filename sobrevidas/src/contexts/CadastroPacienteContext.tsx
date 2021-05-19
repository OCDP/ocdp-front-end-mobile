import React, {createContext, useState} from 'react';

const CadastroPacienteContext = createContext(
  {} as Contexts.CadastroPacienteContext,
);

export const CadastroPacienteProvider: React.FC = ({children}: any) => {
  const [newPaciente, setNewPaciente] = useState<Models.Paciente>(
    {} as Models.Paciente,
  );
  const [
    currentEndereco,
    setCurrentEndereco,
  ] = useState<Models.CurrentEndereco>();

  return (
    <CadastroPacienteContext.Provider
      value={{
        newPaciente,
        setNewPaciente,
        currentEndereco,
        setCurrentEndereco,
      }}>
      {children}
    </CadastroPacienteContext.Provider>
  );
};

export const CadastroPacienteConsumer = CadastroPacienteContext.Consumer;

export default CadastroPacienteContext;
