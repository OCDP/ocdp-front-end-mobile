import {Button, CheckBox, Text} from '@ui-kitten/components';
import React, {memo, useCallback, useContext} from 'react';
import CadastroAtendimentoContext from '../../contexts/CadastroAtendimentoContext';
import {FieldSetItem} from '../../styles/index.styles';
import EmptyContent from '../EmptyContent/EmptyContent';
import {
  EmptySubRegiaoContent,
  ImageRegiaoContainer,
  ListSubregioesContainer,
  RegiaoContent,
} from './FieldSetSuRegioes.styles';

interface Props {}
const FieldSetSubRegioes: React.FC<Props> = () => {
  const {currentRegioes, currentRegioesSub, setCurrentRegioesSub} = useContext(
    CadastroAtendimentoContext,
  );

  const updateArray = useCallback(
    (regiaoId: number, subId: number, subName: string) => {
      if (
        currentRegioesSub &&
        currentRegioesSub.some(regiao => regiao.id === subId)
      ) {
        let selectedRegiao = currentRegioes.find(
          regiao => regiao.id === regiaoId,
        );

        const regioesOld = [...currentRegioesSub];
        const indexRegiao = currentRegioesSub.map(e => e.id).indexOf(regiaoId);

        const indexSubRegiao = selectedRegiao
          ?.subRegioes!.map(e => e.id)
          .indexOf(subId);

        const oldSubRegioes = [...selectedRegiao?.subRegioes!];

        oldSubRegioes.splice(indexSubRegiao!, 1);

        regioesOld[indexRegiao].subRegioes = oldSubRegioes;

        setCurrentRegioesSub(regioesOld);
      } else {
        let selectedRegiao = currentRegioes.find(
          regiao => regiao.id === regiaoId,
        );

        const indexRegiao = currentRegioes
          .map(e => e.id)
          .indexOf(selectedRegiao!.id);

        let regioesOld = [...currentRegioes];
        let subOld = regioesOld[indexRegiao].subRegioes;
        const newSubOld = [
          ...subOld!,
          {
            id: subId,
            nome: subName,
          },
        ];
        setCurrentRegioesSub(newSubOld);
      }
    },
    [currentRegioes, currentRegioesSub, setCurrentRegioesSub],
  );

  return (
    <>
      {currentRegioes && currentRegioes.length > 0 ? (
        currentRegioes.map((regiao, i) => (
          <FieldSetItem key={i} level="2">
            <RegiaoContent>
              <ImageRegiaoContainer source={{uri: regiao.imagemBase64}} />
              <Text category="s1">{regiao.nome}</Text>
              <Button onPress={() => console.log(currentRegioesSub)}>
                o que tem no sub
              </Button>
              <ListSubregioesContainer>
                {regiao.subRegioes && regiao.subRegioes?.length > 0 ? (
                  regiao.subRegioes.map((subregiao, index) => (
                    <FieldSetItem key={index} level="3">
                      <CheckBox
                        onChange={() =>
                          updateArray(regiao.id!, subregiao.id, subregiao.nome!)
                        }
                        checked={false}>
                        {subregiao.nome}
                      </CheckBox>
                    </FieldSetItem>
                  ))
                ) : (
                  <Text>Nenhuma subregião cadastrada</Text>
                )}
              </ListSubregioesContainer>
            </RegiaoContent>
          </FieldSetItem>
        ))
      ) : (
        <EmptySubRegiaoContent>
          <EmptyContent emptyMessage="Nenhuma região selecionada" />
        </EmptySubRegiaoContent>
      )}
    </>
  );
};

export default memo(FieldSetSubRegioes);
