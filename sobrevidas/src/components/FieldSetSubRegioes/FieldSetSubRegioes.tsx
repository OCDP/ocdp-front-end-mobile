import { Button, CheckBox, Text } from '@ui-kitten/components';
import React, { memo, useCallback, useContext, useEffect, useState } from 'react';
import CadastroAtendimentoContext from '../../contexts/CadastroAtendimentoContext';
import { FieldSetItem } from '../../styles/index.styles';
import EmptyContent from '../EmptyContent/EmptyContent';
import {
  EmptySubRegiaoContent,
  ImageRegiaoContainer,
  ListSubregioesContainer,
  RegiaoContent,
} from './FieldSetSuRegioes.styles';

interface Props { }
const FieldSetSubRegioes: React.FC<Props> = () => {
  const { currentRegioes, currentRegioesSub, setCurrentRegioesSub } = useContext(
    CadastroAtendimentoContext,
  );
  const [auxRegioes, setAuxRegioes] = useState<number[]>([]);

  const updateArray = (idSubregiao: number) => {
    let newAuxRegioes = auxRegioes;
    const idEstaNoVetor = verificarSeIdEstaNoVetor(idSubregiao);
    idEstaNoVetor.isTrue ? newAuxRegioes.splice(idEstaNoVetor.index, 1) : newAuxRegioes.push(idSubregiao);
    // console.log("newAuxRegioes", newAuxRegioes);
    setAuxRegioes(newAuxRegioes);
  }

  const verificarSeIdEstaNoVetor = (idSubregiao: number) => {
    const isTrue = auxRegioes.indexOf(idSubregiao) == -1 ? false : true;
    return { isTrue, index: auxRegioes.indexOf(idSubregiao) };
  }

  // useEffect(() => {
  //   console.log("currentRegioes", currentRegioes);
  //   console.log("currentRegioesSub", currentRegioesSub);

  // }, [])

  return (
    <>
      {currentRegioes && currentRegioes.length > 0 ? (
        currentRegioes.map((regiao, i) => (
          <FieldSetItem key={i} level="2">
            <RegiaoContent>
              <ImageRegiaoContainer source={{ uri: regiao.imagemBase64 }} />
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
                          updateArray(subregiao.id)
                        }
                        checked={verificarSeIdEstaNoVetor(subregiao.id).isTrue}>
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
