import {CheckBox, Divider} from '@ui-kitten/components';
import React, {memo, useState, useContext, useCallback} from 'react';
import {useGetFatoresRisco} from '../../hooks/networking/fatorRisco';
import CadastroAtendimentoContext from '../../contexts/CadastroAtendimentoContext';
import useMountEffect from '../../hooks/utils/useMountEffect';
import {Alert} from 'react-native';
import FadeLoading from '../FadeLoading/FadeLoading';
import {FieldSetItem} from '../../styles/index.styles';
interface Props {
  onChangeLesoes: (possuiLesoes: boolean) => void;
  possuiLesoes: boolean;
}
const FieldSetFatoresDeRisco: React.FC<Props> = ({
  onChangeLesoes,
  possuiLesoes,
}) => {
  const {atendimento, setAtendimento} = useContext(CadastroAtendimentoContext);
  const [loading, setLoading] = useState(false);
  const [fatoresRiscoList, setFatoresRiscoList] = useState<
    Models.FatorRisco[]
  >();
  const getFatoresRisco = useGetFatoresRisco();

  const _getFatoresRisco = useCallback(async () => {
    try {
      setLoading(true);
      const {data} = await getFatoresRisco();
      console.log(data);
      setFatoresRiscoList(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      Alert.alert(
        'Erro ao buscar fatores de risco',
        'Algo deu errado ao buscar fatores de risco',
        [{text: 'Voltar'}],
      );
    }
  }, [getFatoresRisco]);

  useMountEffect(_getFatoresRisco);

  const updateArray = useCallback(
    (value: number) => {
      if (atendimento.fatoresDeRisco?.includes(value)) {
        const index = atendimento.fatoresDeRisco.indexOf(value);
        const oldFatores = [...atendimento.fatoresDeRisco];
        oldFatores.splice(index, 1);
        setAtendimento(old => ({...old, fatoresDeRisco: oldFatores}));
      } else {
        setAtendimento(old => ({
          ...old,
          fatoresDeRisco: [...old.fatoresDeRisco, value],
        }));
      }
    },
    [atendimento, setAtendimento],
  );

  return (
    <>
      <FadeLoading loading={loading} />
      {fatoresRiscoList && fatoresRiscoList.length > 0 && (
        <>
          {fatoresRiscoList.map((fator, i) => (
            <FieldSetItem key={i} level="2">
              <CheckBox
                checked={atendimento.fatoresDeRisco?.includes(fator.id)}
                onChange={() => updateArray(fator.id)}>
                {fator.nome}
              </CheckBox>
            </FieldSetItem>
          ))}
          <Divider />
          <FieldSetItem level="4">
            <CheckBox onChange={onChangeLesoes} checked={possuiLesoes}>
              Possui lesões?
            </CheckBox>
          </FieldSetItem>
        </>
      )}
    </>
  );
};

export default memo(FieldSetFatoresDeRisco);
