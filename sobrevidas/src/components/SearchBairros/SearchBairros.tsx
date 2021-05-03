import {Autocomplete, AutocompleteItem} from '@ui-kitten/components';
import React, {useCallback, useState} from 'react';
import {useGetBairrosByCity} from '../../hooks/networking/bairro';
import useMountEffect from '../../hooks/utils/useMountEffect';
import {pin} from '../icons';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

interface Props {
  onSelect: (bairro: Models.Bairro) => void;
  cidadeId: number;
}
const SearchBairros: React.FC<Props> = ({onSelect, cidadeId}) => {
  const getBairrosByCity = useGetBairrosByCity();
  const [result, setResult] = useState<Models.Bairro[]>([]);
  const [loading, setLoading] = useState(false);

  const _getBairros = useCallback(async () => {
    try {
      setLoading(true);
      const {data: citys} = await getBairrosByCity(cidadeId);
      setResult(citys);
      setBairros(citys);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }, [cidadeId, getBairrosByCity]);

  const [bairros, setBairros] = useState<Models.Bairro[]>(result);

  const [valueSearch, setValueSearch] = useState('');

  const filter = (item: Models.Bairro, query: string) =>
    item.nome.toLowerCase().includes(query.toLowerCase());

  const onChangeText = (query: string) => {
    setValueSearch(query);
    setBairros(result.filter(item => filter(item, query)));
  };

  useMountEffect(_getBairros);

  return (
    <Autocomplete
      disabled={bairros.length === 0}
      accessoryRight={loading ? LoadingIndicator : undefined}
      label="Selecionar bairro"
      placeholder={
        bairros.length === 0 ? 'Nenhum bairro encontrado' : 'Selecionar bairro'
      }
      value={valueSearch}
      onChangeText={onChangeText}
      onSelect={value => {
        onSelect(bairros[value]);
        setValueSearch(bairros[value].nome);
      }}>
      {bairros &&
        bairros.map(({nome}, index) => (
          <AutocompleteItem key={index} title={nome} accessoryLeft={pin} />
        ))}
    </Autocomplete>
  );
};

export default SearchBairros;
