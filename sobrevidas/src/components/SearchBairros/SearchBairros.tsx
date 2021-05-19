import {Autocomplete, AutocompleteItem, Text} from '@ui-kitten/components';
import React, {useCallback, useContext, useState} from 'react';
import PinBairro from '../../assets/img/PinBairro';
import CadastroPacienteContext from '../../contexts/CadastroPacienteContext';
import {useGetBairrosByCity} from '../../hooks/networking/bairro';
import {useGetCidades} from '../../hooks/networking/cidade';
import useMountEffect from '../../hooks/utils/useMountEffect';
import {pin, edit} from '../icons';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import {
  DisplayEndereco,
  EnderecoCard,
  LogoPinContainer,
  TextEnderecoContainer,
  ButtonModalContainer,
} from './SearchBairros.styles';

interface Props {
  onSelect: (bairro: Models.Bairro, cidade?: string) => void;
}

const SearchBairros: React.FC<Props> = ({onSelect}) => {
  const {currentEndereco, setCurrentEndereco} = useContext(
    CadastroPacienteContext,
  );
  const getCidades = useGetCidades();
  const getBairrosByCity = useGetBairrosByCity();
  const [resultCidades, setResultCidades] = useState<Models.Cidade[]>([]);
  const [resultBairros, setResultBairros] = useState<Models.Bairro[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingBairros, setLoadingBairros] = useState(false);
  const [cidadeSeleionada, setCidadeSeleionada] = useState<Models.Cidade>();

  const [bairros, setBairros] = useState<Models.Bairro[]>(resultBairros);
  const [cidades, setCidades] = useState<Models.Cidade[]>(resultCidades);
  const [valueSearchCidades, setValueSearchCidades] = useState('');
  const [valueSearchBairros, setValueSearchBairros] = useState('');

  const _getCidades = useCallback(async () => {
    try {
      setLoading(true);
      const {data: citys} = await getCidades();
      setResultCidades(citys);
      setCidades(citys);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }, [getCidades]);

  const _getBairros = useCallback(
    async (cidadeId: number) => {
      try {
        setLoadingBairros(true);
        const {data} = await getBairrosByCity(cidadeId);
        setResultBairros(data);
        setBairros(data);
        setLoadingBairros(false);
      } catch (e) {
        console.error(e);
      }
    },
    [getBairrosByCity],
  );
  useMountEffect(_getCidades);

  const filter = (item: Models.Cidade, query: string) =>
    item.nome.toLowerCase().includes(query.toLowerCase());

  const onChangeTextCidades = (query: string) => {
    setValueSearchCidades(query);
    setCidades(resultCidades.filter(item => filter(item, query)));
  };

  const onChangeTextBairros = (query: string) => {
    setValueSearchBairros(query);
    setBairros(resultBairros.filter(item => filter(item, query)));
  };

  return (
    <>
      {currentEndereco ? (
        <DisplayEndereco level="3">
          <EnderecoCard>
            <LogoPinContainer>
              <PinBairro size={60} />
            </LogoPinContainer>
            <TextEnderecoContainer>
              <Text category="s2">Cidade: {currentEndereco.cidade}</Text>
              <Text category="s1">Bairro: {currentEndereco.bairro?.nome}</Text>
            </TextEnderecoContainer>
          </EnderecoCard>
          <ButtonModalContainer
            onPress={() => setCurrentEndereco(undefined)}
            accessoryRight={edit}
            size="tiny">
            trocar bairro
          </ButtonModalContainer>
        </DisplayEndereco>
      ) : (
        <>
          <Autocomplete
            accessoryRight={loading ? LoadingIndicator : undefined}
            label="Selecionar cidade"
            placeholder="Selecionar cidade"
            value={valueSearchCidades}
            onChangeText={onChangeTextCidades}
            onSelect={value => {
              _getBairros(cidades[value].id);
              setCidadeSeleionada(cidades[value]);
              console.log(cidades[value]);
              setValueSearchCidades(cidades[value].nome);
            }}>
            {cidades.map(({nome}, index) => (
              <AutocompleteItem key={index} title={nome} accessoryLeft={pin} />
            ))}
          </Autocomplete>
          <Autocomplete
            disabled={bairros.length === 0}
            accessoryRight={loadingBairros ? LoadingIndicator : undefined}
            label="Selecionar bairro"
            placeholder={
              bairros.length === 0
                ? 'Nenhum bairro encontrado'
                : 'Selecionar bairro'
            }
            value={valueSearchBairros}
            onChangeText={onChangeTextBairros}
            onSelect={value => {
              onSelect(bairros[value], cidadeSeleionada?.nome);
              setValueSearchBairros(bairros[value].nome);
            }}>
            {bairros &&
              bairros.map(({nome}, index) => (
                <AutocompleteItem
                  key={index}
                  title={nome}
                  accessoryLeft={pin}
                />
              ))}
          </Autocomplete>
        </>
      )}
    </>
  );
};

export default SearchBairros;
