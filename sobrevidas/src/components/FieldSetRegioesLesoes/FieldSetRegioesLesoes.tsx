import {CheckBox} from '@ui-kitten/components';
import React, {memo, useCallback, useContext, useState} from 'react';
import {Alert} from 'react-native';
import {useGetRegioesLesoes} from '../../hooks/networking/regiaoLesao';
import CadastroAtendimentoContext from '../../contexts/CadastroAtendimentoContext';
import useMountEffect from '../../hooks/utils/useMountEffect';
import FadeLoading from '../FadeLoading/FadeLoading';
import {FieldSetItem} from '../../styles/index.styles';
import {ImagemRegiao} from './FieldSetRegioesLesoes.styles';

interface Props {}
const FieldSetRegioesLesoes: React.FC<Props> = () => {
  const {atendimento, setAtendimento} = useContext(CadastroAtendimentoContext);
  const [loading, setLoading] = useState(false);
  const [regioesLesoes, setRegioesLesoes] = useState<Models.RegioesLesoes[]>(
    [],
  );
  const getRegioesLesoes = useGetRegioesLesoes();

  const _getRegioesLesoes = useCallback(async () => {
    try {
      setLoading(true);
      const {data} = await getRegioesLesoes();
      console.log(data);
      setRegioesLesoes(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      Alert.alert(
        'Erro ao buscar regiões',
        'Algo deu errado ao buscar as regiões',
        [{text: 'Voltar'}],
      );
    }
  }, [getRegioesLesoes]);

  useMountEffect(_getRegioesLesoes);

  const updateArray = useCallback(
    (value: number) => {
      if (atendimento.regioesLesoes.some(regiao => regiao.id === value)) {
        const index = atendimento.regioesLesoes.map(e => e.id).indexOf(value);
        const oldRegioes = [...atendimento.regioesLesoes];
        oldRegioes.splice(index, 1);
        setAtendimento(old => ({...old, regioesLesoes: oldRegioes}));
      } else {
        const newRegiao = regioesLesoes.find(regiao => regiao.id === value);
        setAtendimento(old => ({
          ...old,
          regioesLesoes: [...old.regioesLesoes, newRegiao!],
        }));
      }
    },
    [atendimento, regioesLesoes, setAtendimento],
  );

  return (
    <>
      <FadeLoading loading={loading} />
      {regioesLesoes && regioesLesoes.length > 0 && (
        <>
          {regioesLesoes.map((regItem, i) => (
            <FieldSetItem key={i} level="2">
              <CheckBox
                checked={atendimento.regioesLesoes.some(
                  regiao => regiao.id === regItem.id,
                )}
                onChange={() => updateArray(regItem.id)}>
                {regItem.nome}
              </CheckBox>
              <ImagemRegiao source={{uri: regItem.imagemBase64}} />
            </FieldSetItem>
          ))}
        </>
      )}
    </>
  );
};

export default memo(FieldSetRegioesLesoes);
